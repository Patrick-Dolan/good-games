import { useFirebaseAuth } from "../../context/AuthContext";
import { useState } from "react";
import Surface from "../layout/Surface";
import ProfileEdit from "./ProfileEdit";
import Modal from "../dialogs/Modal";
import ConfirmAuth from "./ConfirmAuth";

function ProfileDetails({authVerified, setAuthVerified, handleToast}) {
  const { user } = useFirebaseAuth();
  const [editProfile, setEditProfile] = useState(false);

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
  }

  const handleCloseModal = () => {
    setAuthVerified(false);
    setEditProfile(false);
  }

  return (
    <Surface elevation="elevation-1">
      <div className="row">
        <h2>Profile</h2>
        <button className="button" onClick={toggleEditProfile}>
          {editProfile ? "Back" : "Edit"}
        </button>
      </div>
      <hr />
      {editProfile
        ? (
          authVerified
            ? (
              <ProfileEdit 
                closeEditForm={toggleEditProfile}
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
              <p>First Name:</p>
              <p>{user?.firstName}</p>
            </div>
            <div className="account-details-row">
              <p>Last Name:</p>
              <p>{user?.lastName}</p>
            </div>
            <div className="account-details-row">
              <p>Favorite Game:</p>
              <p>{user?.favoriteGame}</p>
            </div>
            <div className="account-details-row">
              <p>Bio:</p>
              <p>{user?.bio}</p>
            </div>
          </>
        )
      }
    </Surface>
  )
}

export default ProfileDetails;