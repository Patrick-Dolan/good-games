import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUserDataByShelfId, updateUserDBEntry } from "../../../firebaseFunctions";
import { useFirebaseAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../assets/LoadingAnimation";
import Surface from "../layout/Surface";
import GameListItem from "../Games/GameListItem";
import Image from "../image-manipulation/Image";
import Modal from "../dialogs/Modal";

function ShelfPage({ handleToast }) {
  const { shelfId } = useParams();
  const { user, setUser } = useFirebaseAuth();
  const navigate = useNavigate();
  const [shelfOwner, setShelfOwner] = useState(null);
  const [shelf, setShelf] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserDataByShelfId(shelfId);
      const shelfExists = user.shelves.some(shelf => shelf.id === shelfId);
      if (shelfExists) {
        setShelfOwner(user);
        setShelf(user.shelves.find(shelf => shelf.id === shelfId));
        setLoaded(true);
      }
    };

    fetchUser();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  }

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
      setUser(prev => ({
        ...prev,
        ...updatedShelves
      }));
      handleToast("success", "Shelf deleted.");
      navigate("/my-games");
    } catch (e) {
      handleToast("error", e.message);
    }
    setShowModal(false);
  }

  return (
    <div className="container">
      {loaded 
        ? (
          <Surface>
            <h1 className="mb-1r">{shelf.name}</h1>
            <p className="profile-card--label">Shelf created by:</p>
            <Link to={`/user/${shelfOwner.uid}`} className="profile-card--link">
              <div className="profile-card mb-1r">
                <Image
                  url={shelfOwner.photoURL}
                  classes="profile-picture--small-round"
                  loadClasses="loading-image--small profile-picture--loading"
                />
                <p>@{shelfOwner.displayName}</p>
              </div>
            </Link>
            <p className="profile-card--label">Description:</p>
            <p className="profile-card--description">{shelf?.description ? shelf.description : "No description available."}</p>
            <hr />
            {user?.uid === shelfOwner?.uid 
              && (
                <>
                  <button className="margin-center" onClick={() => setShowModal(true)}>Delete shelf</button>
                  <hr />
                </>
              )
            }
            {shelf?.games.length 
              ? (
                shelf.games.map((game) => (
                  <GameListItem game={game} key={game.id} />
                ))
              ) 
              : (
                <p>No games in shelf.</p>
              )
            }
          </Surface>
        ) 
        : (
          <Surface>
            <LoadingAnimation />
            <h3 className="text-center">Shelf Loading...</h3>
          </Surface>
        )
      }
      {showModal && 
        <Modal
          title="Delete shelf..."
          closeModal={handleCloseModal}
        >
          <p>Are you sure you want to delete this shelf?</p>
          <p>Once the shelf has been deleted it cannot be recovered.</p>
          <div className="row">
            <button onClick={handleCloseModal}>Cancel</button>
            <button className="error-button" onClick={handleDeleteShelf}>Delete</button>
          </div>
        </Modal>
      }
    </div>
  )
}

export default ShelfPage;