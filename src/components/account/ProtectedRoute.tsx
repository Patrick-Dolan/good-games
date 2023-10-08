import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../context/AuthContext';

interface Props {
  children: ReactNode;
  handleUnauthorizedAccess: () => void
}

function ProtectedRoute({ children, handleUnauthorizedAccess }: Props) {
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