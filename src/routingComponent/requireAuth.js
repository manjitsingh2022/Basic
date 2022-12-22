import React from "react";
import { Navigate } from "react-router-dom";
export const RequireAuth = ({ children }) => {
  const user = localStorage.getItem("rolekey");
  console.log(user,"useruser")
  if (!user) return <Navigate to="/login" />;
  return children;
};