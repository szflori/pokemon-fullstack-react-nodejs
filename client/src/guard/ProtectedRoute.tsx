import React from "react";
import { Navigate, Outlet } from "react-router";
import { useMeQuery } from "../hooks/auth";
import Loading from "../components/Loading";

function ProtectedRoute() {
  const { data, isLoading, isError } = useMeQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
