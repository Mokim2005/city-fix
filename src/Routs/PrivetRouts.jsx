import React from "react";
import UseAuth from "../Hooks/UseAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";

const PrivetRout = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  console.log(location);
  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivetRout;
