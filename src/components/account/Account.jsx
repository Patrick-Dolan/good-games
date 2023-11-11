import { useFirebaseAuth } from "../../context/AuthContext";

function Account() {
  const { user } = useFirebaseAuth();

  return (
    <div className="container">
      <h3>Email: {user?.email}</h3>
    </div>
  );
}

export default Account;
