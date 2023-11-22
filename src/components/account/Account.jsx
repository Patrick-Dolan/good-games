import AccountEdit from "./AccountEdit";
import ConfirmAuth from "./ConfirmAuth";
import DefaultPFP from "./../../assets/DefaultPFP.png";
import Modal from "../dialogs/Modal";
import Surface from "../layout/Surface";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../../context/AuthContext";

function Account() {
  const { user } = useFirebaseAuth();
  const [editAccount, setEditAccount] = useState(false);
  const [authVerified, setAuthVerified] = useState(false);

  useEffect(() => {
    if (authVerified) {
      // Timer for auth set to one hour from when it was verified.
      setTimeout(() => {
        setAuthVerified(false);
      }, 1000 * 60 * 60)
    }
  }, [authVerified])
  
  const toggleEditAccount = () => {
    setEditAccount(!editAccount);
  }

  const handleCloseModal = () => {
    setAuthVerified(false);
    setEditAccount(false);
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Account</h1>
        <button className="button" onClick={toggleEditAccount}>
          {editAccount ? "Back" : "Edit"}
        </button>
      </div>
      <hr />
      {editAccount
        ? (
          authVerified
            ? (
              <AccountEdit />
            )
            : (
              <Modal
                title="Sign-in to Edit Account"
                closeModal={handleCloseModal}
              >
                <ConfirmAuth 
                  setAuthVerified={setAuthVerified}
                />
              </Modal>
            )
        )
        : (
          <Surface elevation="elevation-1">
            <img
              src={user?.photoURL ? user.photoURL : DefaultPFP}
              alt="A user profile picture or default if it hasn't been assigned"
              className="profile-picture"
            />
            <p>Username: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
          </Surface>
        )
      }
    </div>
  );
}

export default Account;
