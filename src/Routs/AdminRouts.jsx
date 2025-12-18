import React from "react";
import UserAuth from "../Hooks/UserAuth";

import Loading from "../Components/Loading";
import UseRole from "../Hooks/UseRole";
import Error from "../Pages/Error";

const AdminRouts = ({ children }) => {
  const {  loading } = UserAuth();
  const { role, roleLoading } = UseRole();


  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <Error></Error>;
  }
  return children;
};

export default AdminRouts;
