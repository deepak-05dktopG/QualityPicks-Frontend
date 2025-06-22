import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return isLoggedIn ? children : <Navigate to="/register" />;
};

const ProtectedRouteforAdmin = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAdminLoggedIn ? children : <Navigate to="/adminLogin" />;
};

export { ProtectedRoute, ProtectedRouteforAdmin };