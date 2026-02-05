import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

/**
 * ProtectedRoute component to restrict access based on authentication and roles.
 * @param {Array<string>} allowedRoles - Array of roles allowed to access the route.
 * If not provided, any authenticated user is allowed.
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // While loading user data, render nothing or a loading indicator
    return null; // or you can return a spinner component here
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User role not authorized, redirect to login or unauthorized page
    return <Navigate to="/" replace />;
  }

  // Authorized, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
