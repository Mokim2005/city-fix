import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber";

const RootLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
