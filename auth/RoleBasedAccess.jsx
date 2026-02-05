import React from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";

/**
 * RoleBasedAccess component to conditionally render children based on user role.
 * Redirects to login page if unauthorized.
 * @param {Array<string>} allowedRoles - Array of roles allowed to see the children.
 * @param {React.ReactNode} children - The components to render if authorized.
 */
const RoleBasedAccess = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User role not authorized, redirect to login page
    return <Navigate to="/" replace />;
  }

  // Authorized, render children
  return <>{children}</>;
};

export default RoleBasedAccess;
