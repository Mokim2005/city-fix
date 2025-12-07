import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const user = {
    loggedIn: true,
    name: "Abdul Mokim",
    photo: "https://i.pravatar.cc/300",
  };

  const link = (
    <>
      <NavLink to='/' className="hover:text-blue-600 transition" href="#">
        Home
      </NavLink>
      <NavLink to='/all-issus' className="hover:text-blue-600 transition" href="#">
        All Issues
      </NavLink>
      <a className="hover:text-blue-600 transition" href="#">
        Extra Page 1
      </a>
      <a className="hover:text-blue-600 transition" href="#">
        Extra Page 2
      </a>
    </>
  );

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <img className="w-[50px]" src={logo} alt="" />
          <h1 className="text-xl font-bold">Project Name</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {link}
          {/* User Profile */}
          {user.loggedIn && (
            <div className="relative">
              <img
                src={user.photo}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => setDropdown(!dropdown)}
              />

              {/* Dropdown */}
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-3 border">
                  <p className="px-4 py-2 font-semibold text-gray-800 border-b">
                    {user.name}
                  </p>
                  <a className="block px-4 py-2 hover:bg-gray-100" href="#">
                    Dashboard
                  </a>
                  <a className="block px-4 py-2 hover:bg-gray-100" href="#">
                    Logout
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-inner px-4 py-4 space-y-3 border-t">
          {link}

          {/* Mobile User Profile */}
          {user.loggedIn && (
            <div className="pt-3 border-t">
              <div className="flex items-center gap-3">
                <img
                  src={user.photo}
                  className="w-10 h-10 rounded-full border"
                />
                <p className="font-semibold">{user.name}</p>
              </div>

              <div className="mt-3 space-y-2">
                <a className="block hover:text-blue-600" href="#">
                  Dashboard
                </a>
                <a className="block hover:text-blue-600" href="#">
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
