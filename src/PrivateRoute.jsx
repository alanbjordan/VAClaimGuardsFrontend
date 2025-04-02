// PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // If we're still checking authentication status, show a spinner or loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is NOT authenticated, redirect them to sign in
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, render the children (protected route)
  return children;
}
