import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const { user } = UserAuth();
  
  if (!user) {
    return <Navigate to="/account/sign-in" />;
  }
  return children;
}

export default ProtectedRoute;