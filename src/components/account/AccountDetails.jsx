import { useFirebaseAuth } from "../../context/AuthContext";
import { useState } from "react";
import Modal from "../dialogs/Modal";
import Surface from "../layout/Surface";
import ConfirmAuth from "./ConfirmAuth";
import AccountEdit from "./AccountEdit";

function AccountDetails({authVerified, setAuthVerified, handleToast}) {
  const { user } = useFirebaseAuth();
  const [editAccount, setEditAccount] = useState(false);

  const toggleEditAccount = () => {
    setEditAccount(!editAccount);
  }

  const handleCloseModal = () => {
    setAuthVerified(false);
    setEditAccount(false);
  }

  return (
    <Surface elevation="elevation-1">
      <div className="row">
        <h2>Account</h2>
        <button className="button" onClick={toggleEditAccount}>
          {editAccount ? "Back" : "Edit"}
        </button>
      </div>
      <hr />
      {editAccount
        ? (
          authVerified
            ? (
              <AccountEdit 
                closeEditForm={toggleEditAccount}
                handleToast={handleToast}
              />
            )
            : (
              <Modal
                title="Sign-in to Edit"
                closeModal={handleCloseModal}
              >
                <ConfirmAuth 
                  setAuthVerified={setAuthVerified}
                />
              </Modal>
            )
        )
        : (
          <>
            <div className="account-details-row">
              <p>Username:</p>
              <p>{user?.displayName}</p>
            </div>
            <div className="account-details-row">
              <p>Email:</p>
              <p>{user?.email}</p>
            </div>
            <div className="account-details-row">
              <p>Password:</p>
              <p>********</p>
            </div>
          </>
        )
      }
    </Surface>
  )
}

export default AccountDetails;