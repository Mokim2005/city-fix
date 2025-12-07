import React from "react";
import { Link, Outlet } from "react-router";
import logo from "../assets/logo.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Link to='/'>
        <img className="w-[50px]" src={logo} alt="" />
      </Link>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
