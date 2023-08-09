import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthRoute: React.FC = () => {
  const { session } = useAuth();
  return session ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;
