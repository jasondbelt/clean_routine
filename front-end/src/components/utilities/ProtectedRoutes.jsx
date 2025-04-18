import { Outlet, Navigate } from 'react-router-dom'

// prevents inauthenticated user from accessing routes that require authentication
const ProtectedRoutes = () => {
  // retreive user object from localStorage and parse from JSON
  const user = JSON.parse(localStorage.getItem("user"))
  // if user is authenticated, render those child routes, otherwise, redirect to login
  return user ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes