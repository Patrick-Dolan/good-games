import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, handleUnauthorizedAccess }) {
  const { user } = useFirebaseAuth();

  useEffect(() => {
    if (!user) {
      handleUnauthorizedAccess();
    }
  }, [user, handleUnauthorizedAccess])

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;