import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber";
import Footer from "../Components/Footer";
import AnimatedBackground from "../Components/AnimatedBackground";

const RootLayout = () => {
  return (
    <div className="w-full">
      <AnimatedBackground />
      <Navber />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
