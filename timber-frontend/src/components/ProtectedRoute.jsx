import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ roles, children }) {
  const { user, loading } = useContext(AuthContext);

  // Show loading state while checking authentication
  if (loading) {
    return <p>Loading...</p>;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to unauthorized page if user lacks the required role
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized
  return children;
}

export default ProtectedRoute;
