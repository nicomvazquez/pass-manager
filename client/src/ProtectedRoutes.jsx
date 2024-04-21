import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { user, isAutenticated } = useAuth();

 // if (!isAutenticated) return <Navigate to={"/login"} replace />;
  return <Outlet />;
}

export default ProtectedRoutes;
