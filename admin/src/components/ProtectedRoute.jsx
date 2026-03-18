import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken, selectIsAdmin } from '../store/authSlice';

export default function ProtectedRoute({ children }) {
  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
