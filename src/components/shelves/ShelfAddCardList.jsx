import { updateUserDBEntry } from "../../../firebaseFunctions";
import AddIcon from "../../assets/AddIcon";
import { useFirebaseAuth } from "../../context/AuthContext";

// This component is built to be used in a modal.
function ShelfAddCardList({ shelves, game, handleUpdateCurrentUserState, handleOpenToast }) {
  const { user } = useFirebaseAuth();

  const handleAddToShelfClick = async (shelfToUpdate) => {
    try {
      // Check if game is already in shelf
      if (shelfToUpdate.games.find(gameInShelf => gameInShelf.name === game.name)) {
        throw new Error("Game is already in shelf.");
      }
      const filteredShelves = shelves.filter(shelf => shelf.name !== shelfToUpdate.name);
      const updatedShelf = {...shelfToUpdate, games: [...shelfToUpdate.games, game]};
      const updatedShelves = [...filteredShelves, updatedShelf];

      const payload = {
        shelves: updatedShelves
      }

      await updateUserDBEntry(user, payload);
      handleUpdateCurrentUserState(updatedShelves);
      handleOpenToast("success", "Successfully added to shelf.");
    } catch (e) {
      handleOpenToast("error", e.message);
    }
  }

  return (
    <div>
      {shelves.map((shelf, index) => (
        <div key={index} className="shelf__card">
          <div className="shelf__card--main-row">
            <div>
              <p className="shelf__card--main-text">{shelf.name} ({shelf.games.length})</p>
              {shelf.games.find(gameInShelf => gameInShelf.name === game.name) && (<p className="shelf__card--subtext">(Game is already in shelf)</p>)}
            </div>
            <button onClick={() => handleAddToShelfClick(shelf)}>
              <AddIcon height="28" width="28" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShelfAddCardList;