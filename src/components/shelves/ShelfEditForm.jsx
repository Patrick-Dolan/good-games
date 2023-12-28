import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import { updateUserDBEntry } from "../../../firebaseFunctions";
import GameListItem from "../Games/GameListItem";
import CloseIcon from "../../assets/CloseIcon";

function ShelfEditForm({ handleCloseModal, shelf, handleToast, shelfOwner, handleUpdateShelvesState }) {
  const { user } = useFirebaseAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [editForm, setEditForm] = useState({...shelf});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleRemoveGame = async (gameId) => {
    setErrorMessage("");
    console.log("remove game", gameId)
    try {
      if (shelf.protected) {
        throw new Error("Cannot edit protected shelf.");
      }
      if (shelfOwner?.uid !== user?.uid) {
        throw new Error("User does not have permission to edit shelf.");
      }
      const updatedShelf = {...shelf, games: shelf.games.filter(game => game.id !== gameId)};
      const filteredShelves = user.shelves.filter(shelf => shelf.id !== updatedShelf.id);
      const updatedShelves = {shelves: [...filteredShelves, updatedShelf]};
      await updateUserDBEntry(user, updatedShelves);
      handleUpdateShelvesState(updatedShelves, updatedShelf);
      handleToast("success", "Shelf updated.");
      handleCloseModal();
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  const handleEditShelf = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      if (shelf.protected) {
        throw new Error("Cannot edit protected shelf.");
      }
      if (shelfOwner?.uid !== user?.uid) {
        throw new Error("User does not have permission to edit shelf.");
      }
      if (editForm.name.trim() === shelf.name.trim() && editForm.description.trim() === shelf.description.trim()) {
        throw new Error("No changes detected.");
      }
      const updatedShelves = {shelves: user.shelves.map(shelf => shelf.id === editForm.id ? editForm : shelf)};
      await updateUserDBEntry(user, updatedShelves);
      handleUpdateShelvesState(updatedShelves, editForm);
      handleToast("success", "Shelf updated.");
      handleCloseModal();
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <form onSubmit={handleEditShelf}>
      {!shelf.protected && (<>
        <h4>Shelf Details</h4>
        <div className="form__group">
          <label htmlFor="name">Name*</label>
          <input
            required
            type="text"
            placeholder="My Shelf"
            id="name"
            name="name"
            defaultValue={shelf.name.trim()}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="A shelf for my games"
            id="description"
            name="description"
            defaultValue={shelf?.description ? shelf.description.trim() : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <button type="button" onClick={handleCloseModal}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </>)}
      {errorMessage.length > 0 && 
        <div className="form__error">
          <p>{errorMessage}</p>
        </div>
      }
      <h4>Shelf games</h4>
      {shelf.games.length > 0 
      ? (
        <>
          {shelf.games.map(game => (
            <div key={game.id} className="row" style={{gap: ".5em"}}>
              <GameListItem game={game} />
              <button type="button" className="error-button shelf__edit-delete--button" onClick={() => handleRemoveGame(game.id)}><CloseIcon /></button>
            </div>
          ))}
        </>
      )
      : <p>This shelf is empty.</p>
      }
    </form>
  )
}

export default ShelfEditForm;