import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { TbReportSearch } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import UseRole from "../Hooks/UseRole";
import logo from "../assets/logo.png";
import { FaHome, FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import {
  MdManageAccounts,
  MdOutlineAppBlocking,
  MdOutlineAssignmentTurnedIn,
  MdOutlineViewCarousel,
} from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import AnimatedBackground from "../Components/AnimatedBackground";

const navLinkClass = ({ isActive }) =>
  `relative z-10 flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 w-full
  ${isActive
    ? "bg-white/30 border-white/50 text-white font-semibold shadow-md shadow-green-500/20"
    : "bg-white/10 border-white/20 text-white/75 hover:bg-white/20 hover:text-white hover:border-white/40"
  }`;

const navLinkClassCollapsed = ({ isActive }) =>
  `relative z-10 flex items-center justify-center w-10 h-10 mx-auto rounded-xl border transition-all duration-200 tooltip tooltip-right
  ${isActive
    ? "bg-white/30 border-white/50 text-white shadow-md shadow-green-500/20"
    : "bg-white/10 border-white/20 text-white/75 hover:bg-white/20 hover:text-white hover:border-white/40"
  }`;

const DashboardLayout = () => {
  const { role } = UseRole();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      className="min-h-screen w-full relative"
    >
      <AnimatedBackground />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />

      {/* Background Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-green-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* DRAWER (FIXED) */}
      <div className="drawer lg:drawer-open drawer-mobile w-full relative z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* MAIN CONTENT */}
        <div className="drawer-content flex flex-col min-h-screen flex-1 overflow-x-hidden">
          <motion.nav className="navbar backdrop-blur-xl bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-b border-white/20 shadow-xl sticky top-0 z-20">
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

          <div className="flex-1 p-4 md:p-6">
            <Outlet />
          </div>
        </div>

        {/* SIDEBAR (FIXED RESPONSIVE) */}
        <div className="drawer-side z-30">
          <label htmlFor="my-drawer-4" className="drawer-overlay" />

          <div
            ref={sidebarRef}
            className={`flex min-h-full flex-col backdrop-blur-2xl bg-gradient-to-b from-green-900/90 to-emerald-900/90 border-r border-white/20 shadow-2xl transition-all duration-300 overflow-y-auto
              ${collapsed ? "w-[72px] lg:w-[72px]" : "w-64 lg:w-64"}`}
          >
            <ul className="menu w-full grow p-3 space-y-1.5">

              {/* LOGO */}
              <li className="mb-3">
                <Link
                  to="/"
                  className={`flex items-center backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl transition-all duration-200 ${collapsed
                      ? "justify-center w-10 h-10 mx-auto p-0 tooltip tooltip-right"
                      : "gap-3 px-3 py-2"
                    }`}
                  data-tip="Homepage"
                >
                  <motion.img
                    ref={logoRef}
                    className={collapsed ? "w-7 h-7" : "w-9 h-9"}
                    src={logo}
                    alt="logo"
                  />
                  {!collapsed && (
                    <span className="text-white font-bold text-sm">
                      City Fix
                    </span>
                  )}
                </Link>
              </li>

              {/* DASHBOARD */}
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={collapsed ? navLinkClassCollapsed : navLinkClass}
                >
                  <FaHome />
                  {!collapsed && <span>Dashboard</span>}
                </NavLink>
              </li>

              {/* PROFILE */}
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className={collapsed ? navLinkClassCollapsed : navLinkClass}
                >
                  <ImProfile />
                  {!collapsed && <span>My Profile</span>}
                </NavLink>
              </li>

              {/* ADMIN */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink to="/dashboard/all-issus-table" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                      <MdOutlineViewCarousel />
                      {!collapsed && <span>All Issues</span>}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/user-management" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                      <FaUsers />
                      {!collapsed && <span>User Management</span>}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/manage-staff" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                      <MdManageAccounts />
                      {!collapsed && <span>Manage Staff</span>}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/user-block-manage" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                      <MdOutlineAppBlocking />
                      {!collapsed && <span>Blocked Users</span>}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/view-payments" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                      <RiSecurePaymentFill />
                      {!collapsed && <span>View Payments</span>}
                    </NavLink>
                  </li>
                </>
              )}

              {/* STAFF */}
              {role === "staff" && (
                <li>
                  <NavLink to="/dashboard/assigned-issues" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                    <MdOutlineAssignmentTurnedIn />
                    {!collapsed && <span>Assigned Issues</span>}
                  </NavLink>
                </li>
              )}

              {/* USER */}
              {role === "user" && (
                <li>
                  <NavLink to="/dashboard/my-issus" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                    <TbReportSearch />
                    {!collapsed && <span>My Issues</span>}
                  </NavLink>
                </li>
              )}
            </ul>

            {/* COLLAPSE BUTTON */}
            <div className="hidden lg:flex justify-center pb-4">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white"
              >
                {collapsed ? <FaChevronRight size={11} /> : <FaChevronLeft size={11} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;