import React from "react";


import Loading from "../../../Components/Loading";
import AdminDashboardHome from "./AdminDashboardHome";
import StafDashboardHome from "./StafDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import UseRole from "../../../Hooks/UseRole";

const DashbordHome = () => {
  const { role, roleLoading } = UseRole();
  console.log('this is user role',role)

  if (roleLoading) {
    return <Loading></Loading>;
  } else if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "staff") {
    return <StafDashboardHome></StafDashboardHome>;
  } else {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashbordHome;
