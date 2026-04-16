import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FaCircleUser } from "react-icons/fa6";
import { TbMessageReportFilled, TbReportSearch } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import UseRole from "../Hooks/UseRole";
import logo from "../assets/logo.png";
import { FaHome, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import {
  MdManageAccounts,
  MdOutlineAppBlocking,
  MdOutlineAssignmentTurnedIn,
  MdOutlineViewCarousel,
} from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";

const DashboardLayout = () => {
  const { role } = UseRole();
  const sidebarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotate: -180, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }

    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1389713219/photo/%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%97%E0%B8%B1%E0%B8%A8%E0%B8%99%E0%B9%8C%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%A7%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%8D%E0%B8%88%E0%B8%81%E0%B8%B4%E0%B8%95%E0%B8%B4%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%E0%B9%80%E0%B8%A2%E0%B9%87%E0%B8%99.jpg?s=612x612&w=0&k=20&c=qU8DjzGALzq9wNvEx0-jU3iXfLUAaO_ud_SG4iDVnCc=')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>

      {/* Background Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      <div className="drawer lg:drawer-open max-w-7xl mx-auto relative z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* CONTENT */}
        <div className="drawer-content flex flex-col min-h-screen">
          <motion.nav className="navbar backdrop-blur-xl bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-b border-white/20 shadow-xl sticky top-0 z-20">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden backdrop-blur-xl bg-white/20 border border-white/30 text-white"
            >
              ☰
            </label>
            <div className="px-4 text-xl font-black text-white">
              City Fix Dashboard
            </div>
          </motion.nav>

          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side z-30">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          {/* ✅ FIX 1: overflow-visible added */}
          <motion.div
            ref={sidebarRef}
            className="flex min-h-full flex-col backdrop-blur-2xl bg-gradient-to-b from-purple-900/90 to-pink-900/90 border-r border-white/20 shadow-2xl is-drawer-close:w-20 is-drawer-open:w-72 overflow-visible"
          >
            <ul className="menu w-full grow p-4 space-y-2 overflow-visible">
              
              {/* Logo */}
              <li>
                <Link
                  to="/"
                  className="relative z-10 backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl mb-4 tooltip tooltip-right"
                  data-tip="Homepage"
                >
                  <motion.img
                    ref={logoRef}
                    className="w-12 h-12"
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </li>

              {/* Dashboard */}
              <li>
                <NavLink
                  to="/dashboard"
                  className="relative z-10 backdrop-blur-xl border border-white/30 rounded-xl tooltip tooltip-right bg-white/10 text-white"
                  data-tip="Dashboard Home"
                >
                  <FaHome />
                </NavLink>
              </li>

              {/* Admin */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-issus-table"
                      className="relative z-10 backdrop-blur-xl border border-white/30 rounded-xl tooltip tooltip-right bg-white/10 text-white"
                      data-tip="View All Issues"
                    >
                      <MdOutlineViewCarousel />
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-staff"
                      className="relative z-10 backdrop-blur-xl border border-white/30 rounded-xl tooltip tooltip-right bg-white/10 text-white"
                      data-tip="Manage Staff"
                    >
                      <MdManageAccounts />
                    </NavLink>
                  </li>
                </>
              )}

              {/* User */}
              {role === "user" && (
                <li>
                  <NavLink
                    to="/dashboard/my-issus"
                    className="relative z-10 backdrop-blur-xl border border-white/30 rounded-xl tooltip tooltip-right bg-white/10 text-white"
                    data-tip="My Issues"
                  >
                    <TbReportSearch />
                  </NavLink>
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;