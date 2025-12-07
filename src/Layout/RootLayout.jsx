import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navber></Navber>
      <div className="">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
