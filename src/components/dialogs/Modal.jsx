import CloseIcon from "../../assets/CloseIcon";
import Surface from "../layout/Surface"

// IMPORTANT
//  - When using this Modal component the following code needs to go in the parent 
// ==========================================================================================
//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   }

//   Pass handleCloseModal as closeModal prop to component for closing functionality.
//   Use showModal to conditionally render modal.
// ==========================================================================================

function Modal({children, title, closeModal}) {
  return (
    <>
      <div className="modal">
        <Surface elevation="elevation-1">
          <div className="row">
            <h3>{title.toUpperCase()}</h3>
            <CloseIcon onClick={closeModal} />
          </div>
          <hr />
          {children}
        </Surface>
      </div>
      <div className="modal-shader" onClick={closeModal}></div>
    </>
  )
}

export default Modal;