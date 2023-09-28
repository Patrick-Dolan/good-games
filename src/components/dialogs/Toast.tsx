import { useEffect, useState } from "react";

interface Props {
  show: boolean;
  onCloseToast: () => void;
  message: string;
  type: string;
}
// IMPORTANT
//  - When using this Toast component the following code needs to go in the parent 
// ==========================================================================================
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("Message that component needs shown.")

//   const handleCloseToast = (): void => {
//     setShowToast(false);
//   }
// ==========================================================================================

function Toast({ show, onCloseToast, message, type }: Props) {
  const [toastTypeClasses, setToastTypeClasses] = useState("");
  const [toastButtonTypeClasses, setToastButtonTypeClasses] = useState("");

  useEffect(() => {
    if (show) {
      setTimeout(onCloseToast, 6000)
      switch (type) {
        case "error":
          setToastTypeClasses("toast-container toast toast-error shadow");
          setToastButtonTypeClasses("toast__button toast__button-error");
          break;
        case "success":
          setToastTypeClasses("toast-container toast toast-success shadow");
          setToastButtonTypeClasses("toast__button toast__button-success");
          break;
        default:
          setToastTypeClasses("toast-container toast toast-info shadow");
          setToastButtonTypeClasses("toast__button toast__button-info");
          break;
      }
    }
  }, [show])

  return (
    <div className={show ? toastTypeClasses : 'hidden'}>
      <div className="toast-container">
        <div className="row">
          <p className="toast-title">{type}:</p>
          <button className={toastButtonTypeClasses} onClick={() => onCloseToast()}>X</button>
        </div>
        <p className="toast-message">{message}</p>
      </div>
    </div>
  )
}

export default Toast;