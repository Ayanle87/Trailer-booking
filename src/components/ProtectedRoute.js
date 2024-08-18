import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth();
  console.log("ProtectedRoute user:", user);

  if (!user) {
    console.log("User is not logged in. Redirecting to /login...");
    return <Navigate to="/Login" />;
  }
  return children;
};

export default ProtectedRoute;
