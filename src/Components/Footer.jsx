import React from "react";
import Logo from "../assets/logo.png";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a132f] text-white shadow-inner mt-10">
      <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Logo & Info */}
        <div className="flex flex-col items-center lg:items-start gap-2">
          <img src={Logo} alt="City Fix Logo" className="w-[50px] rounded-xl" />
          <p className="font-bold text-lg">City Fix</p>
          <p className="text-sm text-gray-300 text-center lg:text-left">
            Improving your city's infrastructure, one report at a time.
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} City Fix. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center lg:items-start gap-2">
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="flex flex-col gap-1 text-gray-300">
            <li>
              <a href="/" className="hover:text-purple-400 transition">Home</a>
            </li>
            <li>
              <a href="/all-issues" className="hover:text-purple-400 transition">All Issues</a>
            </li>
            <li>
              <a href="/about" className="hover:text-purple-400 transition">About Us</a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-purple-400 transition">Dashboard</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex gap-4 text-white text-xl">
            <a href="#" className="hover:text-purple-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-purple-400 transition"><FaYoutube /></a>
            <a href="#" className="hover:text-purple-400 transition"><FaFacebook /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
