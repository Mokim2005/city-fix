import React from "react";

import UseRole from "../../../Hooks/UseRole";
import Loading from "../../../Components/Loading";
import AdminDashboardHome from "./AdminDashboardHome";
import StafDashboardHome from "./StafDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashbordHome = () => {
  const { role, roleLoading } = UseRole();

  if (roleLoading) {
    return <Loading></Loading>;
  } else if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "rider") {
    return <StafDashboardHome></StafDashboardHome>;
  } else {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashbordHome;
