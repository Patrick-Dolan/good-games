import { useFirebaseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { updateUserDBEntry } from "../../../firebaseFunctions";

function ShelfDeleteForm({ handleCloseModal, handleToast, shelf, shelfOwner, handleUpdateShelvesState }) {
  const { user } = useFirebaseAuth();
  const { shelfId } = useParams();
  const navigate = useNavigate();

  const handleDeleteShelf = async () => {
    try {
      if (user?.uid !== shelfOwner?.uid) {
        throw new Error("User does not have permission to delete shelf.");
      }
      if (shelf?.protected) {
        throw new Error("Cannot delete protected shelf.");
      }
      const updatedShelves = {shelves: user.shelves.filter(shelf => shelf.id !== shelfId)};
      await updateUserDBEntry(user, updatedShelves);
      handleUpdateShelvesState(updatedShelves);
      handleToast("success", "Shelf deleted.");
      navigate("/my-games");
    } catch (e) {
      handleToast("error", e.message);
    }
    handleCloseModal();
  }

  return (
    <>
      <p>Are you sure you want to delete this shelf?</p>
      <p>Once the shelf has been deleted it cannot be recovered.</p>
      <div className="row">
        <button onClick={handleCloseModal}>Cancel</button>
        <button className="error-button" onClick={handleDeleteShelf}>Delete</button>
      </div>
    </>
  )
}

export default ShelfDeleteForm;