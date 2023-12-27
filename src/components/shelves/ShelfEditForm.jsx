import { useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import { updateUserDBEntry } from "../../../firebaseFunctions";

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
      if (editForm.name === shelf.name && editForm.description === shelf.description) {
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
      <div className="form__group">
        <label htmlFor="name">Name*</label>
        <input
          required
          type="text"
          placeholder="My Shelf"
          id="name"
          name="name"
          defaultValue={shelf.name}
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
          defaultValue={shelf?.description ? shelf.description : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <button type="button" onClick={handleCloseModal}>Cancel</button>
        <button type="submit">Submit</button>
      </div>
      {errorMessage.length > 0 && 
        <div className="form__error">
          <p>{errorMessage}</p>
        </div>
      }
    </form>
  )
}

export default ShelfEditForm;