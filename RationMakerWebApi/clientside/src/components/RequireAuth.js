import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../service/useAuth";
import React from "react";

const RequireAuth = () => {
  const { auth } = useAuth();

  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
