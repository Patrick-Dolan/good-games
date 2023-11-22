import { useFirebaseAuth } from "../../context/AuthContext";
import Surface from "../layout/Surface";

function ProfileDetails() {
  const { user } = useFirebaseAuth();

  return (
    <Surface elevation="elevation-1">
      <h3>Profile</h3>
      <hr />
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
    </Surface>
  )
}

export default ProfileDetails;