import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";
import Toast from "../dialogs/Toast";
import Modal from "../dialogs/Modal";
import ShelfDetailsCard from "./ShelfDetailsCard";
import ShelfCreationForm from "./ShelfCreationForm";

function ShelvesTab() {
  const { user, setUser } = useFirebaseAuth();
  const [showModal, setShowModal] = useState(false);
  const [orderedShelves, setOrderedShelves] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Unknown error on shelf creation.");
  const [toastType, setToastType] = useState("error");

  // Order shelves so that protected shelves are first then sort alphabetically
  useEffect(() => {
    if (user?.shelves === undefined) return;
    const protectedShelves = user?.shelves.filter(shelf => shelf.protected);
    const unprotectedShelves = user?.shelves.filter(shelf => !shelf.protected);
    unprotectedShelves.sort((a, b) => a.name.localeCompare(b.name));
    setOrderedShelves([...protectedShelves, ...unprotectedShelves]);
  }, [user]);

  const handleUpdateShelvesState = (updatedShelves) => {
    setUser(prev => ({
      ...prev,
      ...updatedShelves
    }));
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleCloseToast = () => {
    setShowToast(false);
  }

  const handleToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  }

  return (
    <div>
      {user?.shelves 
        ? (
          orderedShelves.map((shelf) => 
            <ShelfDetailsCard shelf={shelf} key={shelf.id} />
          )
        )
        : (
          <p>No shelves.</p>
        )
      }
      <button 
        className="margin-center"
        onClick={() => setShowModal(true)}
      >
        Create new Shelf
      </button>
      {showModal && 
        <Modal 
          title="Create new shelf"
          closeModal={handleCloseModal}
        >
          <ShelfCreationForm 
            handleToast={handleToast} 
            handleCloseModal={handleCloseModal} 
            refreshShelves={handleUpdateShelvesState} 
          />
        </Modal>
      }
      <Toast 
        onCloseToast={handleCloseToast}
        show={showToast}
        message={toastMessage}
        type={toastType}
      />
    </div>
  )
}

export default ShelvesTab;