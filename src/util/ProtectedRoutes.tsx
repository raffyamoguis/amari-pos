import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import AppLayout from "../components/AppLayout";

const ProtectedRoutes: React.FC = () => {
  const { session } = useAuth();
  return session ? <AppLayout /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
