import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import UserAuth from "../Hooks/UserAuth";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogOut = () => {
    logOut().catch((err) => console.log(err));
  };

  const links = (
    <>
      <li className="text-lg font-medium">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-lg font-medium">
        <NavLink to="/all-issues">All Issues</NavLink>
      </li>
      <li className="text-lg font-medium">
        <NavLink to="/extra1">Extra Page 1</NavLink>
      </li>
      <li className="text-lg font-medium">
        <NavLink to="/extra2">Extra Page 2</NavLink>
      </li>

      {user && (
        <li className="text-lg font-medium">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}

      <li className="text-lg font-medium">
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#1a132f] text-white shadow-lg px-4 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* MOBILE MENU */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 bg-[#221a3f] text-white rounded-box w-60 shadow-xl p-3"
          >
            {links}
          </ul>
        </div>

        <NavLink to="/" className="flex items-center gap-3 text-xl font-bold">
          <img src={logo} className="w-[45px] rounded-xl" />

          <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent drop-shadow-md tracking-wide">
            City Fix
          </span>
        </NavLink>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium gap-3">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer bg-[#2b2250] py-1 px-2 rounded-full border border-purple-500 shadow-md hover:bg-[#352a66] transition"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full border-2 border-purple-400 shadow-md"
              />
              <ChevronDown size={20} />
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-3 bg-[#2b2250] text-white shadow-xl rounded-xl w-52 p-3 border border-purple-500">
                <p className="px-3 py-2 font-semibold border-b border-purple-700">
                  {user.displayName}
                </p>
                <NavLink
                  to="/dashboard"
                  className="block px-3 py-2 hover:bg-[#3a2d75] rounded-lg transition"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-3 py-2 hover:bg-[#3a2d75] rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/login"
            className="btn bg-purple-600 border-none hover:bg-purple-700 text-white px-6 text-lg shadow-md"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
