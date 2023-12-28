import { useEffect, useState } from "react";
import CloseIcon from "../../assets/CloseIcon";

// IMPORTANT
//  - When using this Toast component the following code needs to go in the parent 
// ==========================================================================================
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("Message that component needs shown.")

//   const handleCloseToast = () => {
//     setShowToast(false);
//   }
// ==========================================================================================

// TODO refactor to be a bit more low profile on the UI
// TODO make it so toast is using a flex with the close icon on one side in the center and the message on the other side in the center

function Toast({ show, onCloseToast, message, type }) {
  const [toastTypeClasses, setToastTypeClasses] = useState("");

  useEffect(() => {
    if (show) {
      setTimeout(onCloseToast, 6000)
      switch (type) {
        case "error":
          setToastTypeClasses("toast-container toast toast-error shadow");
          break;
        case "success":
          setToastTypeClasses("toast-container toast toast-success shadow");
          break;
        default:
          setToastTypeClasses("toast-container toast toast-info shadow");
          break;
      }
    }
  }, [show])

  return (
    <div className={show ? toastTypeClasses : 'hidden'}>
      <div className="toast-container">
        <div className="row">
          <p className="toast-title">{type}:</p>
          <CloseIcon onClick={() => onCloseToast()} />
        </div>
        <p className="toast-message">{message}</p>
      </div>
    </div>
  )
}

export default Toast;