import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../context/AuthContext';
import LoadingPage from '../pages/LoadingPage';

function ProtectedRoute({ children, handleUnauthorizedAccess }) {
  const { user } = useFirebaseAuth();

  useEffect(() => {
    if (!user && user !== undefined) {
      handleUnauthorizedAccess();
    }
  }, [user, handleUnauthorizedAccess])

  if (user === undefined) {
    return <LoadingPage />;
  } else if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;