import { useFirebaseAuth } from "../../context/AuthContext";
import DefaultPFP from "./../../assets/DefaultPFP.png";

function Account() {
  const { user } = useFirebaseAuth();

  return (
    <div className="container">
      <h1>Account</h1>
      <hr />
      <img 
        src={user?.photoURL ? user.photoURL : DefaultPFP} 
        alt="A user profile picture or default if it hasn't been assigned" 
        className="profile-picture"
      />
      <p>Username: {user?.displayName}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

export default Account;
