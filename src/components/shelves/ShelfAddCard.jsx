import { updateShelvesDBEntry } from "../../../firebaseFunctions";
import AddIcon from "../../assets/AddIcon";
import { useFirebaseAuth } from "../../context/AuthContext";

function ShelfAddCard({ shelves, game }) {
  const { user } = useFirebaseAuth();

  const handleAddToShelfClick = async (shelfId) => {
    const shelf = shelves.find(shelf => shelf.id === shelfId);
    const updatedShelf = {
      ...shelf,
      games: [
        ...shelf.games,
        game
      ]
    }

    // TODO add toast notification and close modal

    try {
      await updateShelvesDBEntry(user, updatedShelf);
      console.log("Successfully added to shelf.");
    } catch (e) {
      console.log(e.message); 
    }
  }

  return (
    <div>
      {shelves.map((shelf, index) => (
        <div key={index} className="shelf__card">
          <p>{shelf.name} ({shelf.games.length})</p>
          <button onClick={() => handleAddToShelfClick(shelf.id)}>
            <AddIcon height="28" width="28" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ShelfAddCard;