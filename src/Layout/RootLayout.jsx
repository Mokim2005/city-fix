import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div className="w-full">
      <Navber />

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
