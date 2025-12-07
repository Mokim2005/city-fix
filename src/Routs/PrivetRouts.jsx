import React from "react";

import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";
import UserAuth from "../Hooks/UserAuth";

const PrivetRout = ({ children }) => {
  const { user, loading } = UserAuth();
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
