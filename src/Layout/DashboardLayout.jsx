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
  `relative flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium tracking-wide transition-all duration-200 rounded-lg
  ${isActive
    ? "text-[#00C2A8] bg-[rgba(0,194,168,0.08)] border-l-2 border-[#00C2A8]"
    : "text-white/55 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
  }`;

const navLinkClassCollapsed = ({ isActive }) =>
  `relative flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-all duration-200 tooltip tooltip-right
  ${isActive
    ? "text-[#00C2A8] bg-[rgba(0,194,168,0.08)] border-l-2 border-[#00C2A8]"
    : "text-white/55 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
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
    <div className="min-h-screen w-full" style={{ backgroundColor: "#080d14" }}>
      {/* Animated cyber background — z-index: -1 inside component */}
      <AnimatedBackground />

      {/* All content sits above background */}
      <div style={{ position: "relative", zIndex: 1 }} className="min-h-screen">

        {/* DRAWER */}
        <div className="drawer lg:drawer-open w-full">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

          {/* MAIN CONTENT */}
          <div className="drawer-content flex flex-col min-h-screen flex-1 overflow-x-hidden">

            {/* NAVBAR */}
            <motion.nav
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="navbar sticky top-0 z-20 border-b border-cyan-500/20 shadow-lg shadow-black/40"
              style={{ backgroundColor: "rgba(8, 13, 20, 0.85)", backdropFilter: "blur(16px)" }}
            >
              <label
                htmlFor="my-drawer-4"
                className="cityfix-btn cityfix-btn-primary btn btn-square btn-ghost lg:hidden rounded-xl font-semibold text-white shadow-lg transition-all duration-500 ease-out"
              >
                ☰
              </label>
              <div className="px-4 text-xl font-black tracking-widest"
                style={{ color: "#00C2A8", textShadow: "0 0 20px rgba(0,194,168,0.4)" }}>
                CITY FIX
              </div>
            </motion.nav>

            {/* PAGE CONTENT */}
            <div className="flex-1 p-4 md:p-6">
              <Outlet />
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="drawer-side z-30">
            <label htmlFor="my-drawer-4" className="drawer-overlay" />

            <div
              ref={sidebarRef}
              className={`flex min-h-full flex-col border-r border-cyan-500/20 shadow-2xl transition-all duration-300 overflow-y-auto
                ${collapsed ? "w-[72px] lg:w-[72px]" : "w-64 lg:w-64"}`}
              style={{
                backgroundColor: "rgba(8, 13, 20, 0.95)",
                backdropFilter: "blur(24px)",
                boxShadow: "4px 0 30px rgba(0,194,168,0.08)",
              }}
            >
              {/* Sidebar inner top glow line */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(0,194,168,0.5), transparent)"
              }} />

              <ul className="menu w-full grow p-3 space-y-1.5">

                {/* LOGO */}
                <li className="mb-3">
                  <Link
                    to="/"
                    className={`flex items-center border border-cyan-500/20 rounded-xl transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 ${
                      collapsed ? "justify-center w-10 h-10 mx-auto p-0 tooltip tooltip-right" : "gap-3 px-3 py-2"
                    }`}
                    style={{ backgroundColor: "rgba(0,194,168,0.08)" }}
                    data-tip="Homepage"
                  >
                    <motion.img
                      ref={logoRef}
                      className={collapsed ? "w-7 h-7" : "w-9 h-9"}
                      src={logo}
                      alt="logo"
                    />
                    {!collapsed && (
                      <span className="font-bold text-sm tracking-widest" style={{ color: "#00C2A8" }}>
                        CITY FIX
                      </span>
                    )}
                  </Link>
                </li>

                {/* Divider */}
                {!collapsed && (
                  <li className="px-3 py-1">
                    <span className="text-xs tracking-widest" style={{ color: "rgba(0,194,168,0.4)" }}>
                      NAVIGATION
                    </span>
                  </li>
                )}

                {/* DASHBOARD */}
                <li>
                  <NavLink to="/dashboard" end className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                    <FaHome />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </li>

                {/* PROFILE */}
                <li>
                  <NavLink to="/dashboard/my-profile" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                    <ImProfile />
                    {!collapsed && <span>My Profile</span>}
                  </NavLink>
                </li>

                {/* ADMIN */}
                {role === "admin" && (
                  <>
                    {!collapsed && (
                      <li className="px-3 py-1">
                        <span className="text-xs tracking-widest" style={{ color: "rgba(0,194,168,0.4)" }}>
                          ADMIN
                        </span>
                      </li>
                    )}
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
                  <>
                    {!collapsed && (
                      <li className="px-3 py-1">
                        <span className="text-xs tracking-widest" style={{ color: "rgba(0,194,168,0.4)" }}>
                          STAFF
                        </span>
                      </li>
                    )}
                    <li>
                      <NavLink to="/dashboard/assigned-issues" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                        <MdOutlineAssignmentTurnedIn />
                        {!collapsed && <span>Assigned Issues</span>}
                      </NavLink>
                    </li>
                  </>
                )}

                {/* USER */}
                {role === "user" && (
                  <>
                    {!collapsed && (
                      <li className="px-3 py-1">
                        <span className="text-xs tracking-widest" style={{ color: "rgba(0,194,168,0.4)" }}>
                          MY AREA
                        </span>
                      </li>
                    )}
                    <li>
                      <NavLink to="/dashboard/my-issus" className={collapsed ? navLinkClassCollapsed : navLinkClass}>
                        <TbReportSearch />
                        {!collapsed && <span>My Issues</span>}
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>

              {/* Bottom glow line */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)"
              }} />

              {/* COLLAPSE BUTTON */}
              <div className="hidden lg:flex justify-center py-4">
<button
                   onClick={() => setCollapsed(!collapsed)}
                   className="cityfix-btn cityfix-btn-primary relative overflow-hidden w-8 h-8 rounded-full font-semibold text-white shadow-lg transition-all duration-500 ease-out flex items-center justify-center"
                 >
                   {collapsed ? <FaChevronRight size={11} /> : <FaChevronLeft size={11} />}
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;