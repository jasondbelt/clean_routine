import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { is_authenticated } from '../../endpoints/auth_api';

// protects routes from unauthenticated access
const ProtectedRoutes = () => {
  // `auth` holds authentication status:
  const [auth, setAuth] = useState(null);

  // useEffect runs once on mount to check user authentication
  // utilizes backend call and updates auth state based on response
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await is_authenticated();
      setAuth(isAuth);
    };

    checkAuth();
  }, []);

  // gives backend a chance to respond
  if (auth === null) {
    return <div>Loading...</div>;
  }
  // If authenticated, render protected routes
  // If not, redirect user to the login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;