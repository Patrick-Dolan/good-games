import { useState } from "react";
import { useLocation } from "react-router";
import GameDetails from "../Games/GameDetails";
import Modal from "../dialogs/Modal";
import Surface from "../layout/Surface";

function GamesPage() {
  const { state: game } = useLocation();
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
          <p>ADD STUFF HERE DUDE</p>
        </Modal>
      )}
    </div>
  )
}

export default GamesPage;