import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUserDataByShelfId } from "../../../firebaseFunctions";
import { useFirebaseAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../assets/LoadingAnimation";
import Surface from "../layout/Surface";
import GameListItem from "../Games/GameListItem";
import Image from "../image-manipulation/Image";
import Modal from "../dialogs/Modal";
import ShelfEditForm from "../shelves/ShelfEditForm";
import ShelfDeleteForm from "../shelves/ShelfDeleteForm";

function ShelfPage({ handleToast }) {
  const { shelfId } = useParams();
  const { user, setUser } = useFirebaseAuth();
  const [shelfOwner, setShelfOwner] = useState(null);
  const [shelf, setShelf] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);

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

  const handleUpdateShelvesState = (updatedShelves, currentShelf) => {
    setUser(prev => ({
      ...prev,
      ...updatedShelves
    }));
    setShelf(currentShelf);
  }

  const handleEditShelfModal = () => {
    setEdit(true);
    setShowModal(true);
  }

  const handleDeleteShelfModal = async () => {
    setEdit(false);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div className="container">
      {loaded 
        ? (
          <Surface>
            <h1 className="mb-1r">{shelf.name}</h1>
            <p className="profile-card--label">{!shelf.protected ? "Shelf created by:" : "Shelf owner:"}</p>
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
            {!shelf.protected && (
              <>
                <p className="profile-card--label">Description:</p>
                <p className="profile-card--description">{shelf?.description ? shelf.description : "No description available."}</p>
              </>
            )}
            <hr />
            {user?.uid === shelfOwner?.uid
              && (
                <>
                  <div className="row">
                    <button className="margin-center" onClick={handleEditShelfModal}>Edit shelf</button>
                    {!shelf.protected && <button className="margin-center error-button" onClick={handleDeleteShelfModal}>Delete shelf</button>}
                  </div>
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
          title={edit ? "Edit shelf..." : "Delete shelf..."}
          closeModal={handleCloseModal}
        >
          {edit
            ? (
              <ShelfEditForm 
                handleCloseModal={handleCloseModal} 
                handleToast={handleToast}
                shelf={shelf}
                shelfOwner={shelfOwner}
                handleUpdateShelvesState={handleUpdateShelvesState}
              />
            )
            : (
              <ShelfDeleteForm 
                handleCloseModal={handleCloseModal} 
                handleToast={handleToast} 
                shelf={shelf} 
                shelfOwner={shelfOwner} 
                handleUpdateShelvesState={handleUpdateShelvesState}
              />
            )
          }
        </Modal>
      }
    </div>
  )
}

export default ShelfPage;