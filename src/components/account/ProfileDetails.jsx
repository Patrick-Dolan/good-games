import { useFirebaseAuth } from "../../context/AuthContext";
import { useState } from "react";
import Surface from "../layout/Surface";
import ProfileEdit from "./ProfileEdit";

function ProfileDetails({handleToast}) {
  const { user } = useFirebaseAuth();
  const [editProfile, setEditProfile] = useState(false);

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
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
          <ProfileEdit 
            closeEditForm={toggleEditProfile}
            handleToast={handleToast}
          />
        )
        : (
          <>
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