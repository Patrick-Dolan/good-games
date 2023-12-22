import { useState } from "react";
import { useLocation } from "react-router";
import { useFirebaseAuth } from "../../context/AuthContext";
import GameDetails from "../Games/GameDetails";
import Modal from "../dialogs/Modal";
import Surface from "../layout/Surface";
import ShelfAddCardList from "../shelves/ShelfAddCardList";
import Toast from "../dialogs/Toast";

function GamesPage() {
  const { state: game } = useLocation();
  const { user, setUser } = useFirebaseAuth();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Message that component needs shown.");
  const [toastType, setToastType] = useState("error");

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleCloseToast = () => {
    setShowToast(false);
  }

  const handleOpenToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  }

  const handleUpdateCurrentUserState = (updatedShelves) => {
    setUser(prev => ({
      ...prev,
      shelves: updatedShelves
    }));
  }

  return (
    <div className="container">
      <Surface elevation="elevation-1" >
        <GameDetails 
          game={game} 
          openModal={handleOpenModal}
        />
      </Surface>
      {showModal && (
        <Modal 
          title="Add to shelf..."
          closeModal={handleCloseModal}
        >
          {user?.shelves
            ? (
              <ShelfAddCardList 
                shelves={user.shelves.sort((a, b) => b.name.localeCompare(a.name))} 
                game={game} 
                handleUpdateCurrentUserState={handleUpdateCurrentUserState} 
                handleOpenToast={handleOpenToast}
              />
            ) 
            : (
              <p>You have no shelves. Create one to add this game.</p>
            )
          }
        </Modal>
      )}
      <Toast 
        onCloseToast={handleCloseToast}
        show={showToast}
        message={toastMessage}
        type={toastType}
      />
    </div>
  )
}

export default GamesPage;