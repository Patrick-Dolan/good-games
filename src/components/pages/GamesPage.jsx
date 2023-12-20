import { useState } from "react";
import { useLocation } from "react-router";
import { useFirebaseAuth } from "../../context/AuthContext";
import GameDetails from "../Games/GameDetails";
import Modal from "../dialogs/Modal";
import Surface from "../layout/Surface";
import ShelfAddCard from "../shelves/ShelfAddCard";

function GamesPage() {
  const { state: game } = useLocation();
  const { user } = useFirebaseAuth();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
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
              <ShelfAddCard shelves={testShelves} game={game} />
            ) 
            : (
              <p>You have no shelves. Create one to add this game.</p>
            )
          }
        </Modal>
      )}
    </div>
  )
}

export default GamesPage;