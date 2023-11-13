import { useFirebaseAuth } from "../../context/AuthContext";

function Account() {
  const { user } = useFirebaseAuth();

  return (
    <div className="container">
      <h3>Account</h3>
      <hr />
      <p>Username: {user?.displayName}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

export default Account;
