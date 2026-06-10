import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const navLinkClass = ({ isActive }) =>
  `relative z-10 flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 w-full
  ${
    isActive
      ? "bg-white/30 border-white/50 text-white font-semibold shadow-md shadow-green-500/20"
      : "bg-white/10 border-white/20 text-white/75 hover:bg-white/20 hover:text-white hover:border-white/40"
  }`;

const navLinkClassCollapsed = ({ isActive }) =>
  `relative z-10 flex items-center justify-center w-10 h-10 mx-auto rounded-xl border transition-all duration-200 tooltip tooltip-right
  ${
    isActive
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

  const sidebarWidth = collapsed ? "w-[72px]" : "w-64";

  return (
    <div
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1389713219/photo/%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%97%E0%B8%B1%E0%B8%A8%E0%B8%99%E0%B9%8C%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%A7%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%8D%E0%B8%88%E0%B8%81%E0%B8%B4%E0%B8%95%E0%B8%B4%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%E0%B9%80%E0%B8%A2%E0%B9%87%E0%B8%99.jpg?s=612x612&w=0&k=20&c=qU8DjzGALzq9wNvEx0-jU3iXfLUAaO_ud_SG4iDVnCc=')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen w-full relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>

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

      <div className="drawer lg:drawer-open w-full relative z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* MAIN CONTENT */}
        <div className="drawer-content flex flex-col min-h-screen flex-1 min-w-0 overflow-x-hidden">
          {/* Navbar */}
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

          {/* Page Content */}
          <div className="flex-1 min-w-0 overflow-x-hidden p-4 md:p-6">
            <Outlet />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side z-30">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <motion.div
            ref={sidebarRef}
            animate={{ width: collapsed ? 72 : 256 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex min-h-full flex-col backdrop-blur-2xl bg-gradient-to-b from-green-900/90 to-emerald-900/90 border-r border-white/20 shadow-2xl overflow-visible"
            style={{ minWidth: collapsed ? 72 : 256 }}
          >
            {/* Scrollable nav area */}
            <ul className="menu w-full grow p-3 space-y-1.5 overflow-visible overflow-y-auto">

              {/* Logo */}
              <li className="mb-3">
                <Link
                  to="/"
                  className={`flex items-center backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl transition-all duration-200 ${
                    collapsed ? "justify-center w-10 h-10 mx-auto p-0 tooltip tooltip-right" : "gap-3 px-3 py-2"
                  }`}
                  data-tip="Homepage"
                >
                  <motion.img
                    ref={logoRef}
                    className={collapsed ? "w-7 h-7 object-contain" : "w-9 h-9 object-contain"}
                    src={logo}
                    alt="logo"
                  />
                  {!collapsed && (
                    <span className="text-white font-bold text-sm whitespace-nowrap">City Fix</span>
                  )}
                </Link>
              </li>

              {/* Dashboard */}
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={collapsed ? navLinkClassCollapsed : navLinkClass}
                  data-tip={collapsed ? "Dashboard" : undefined}
                >
                  <FaHome className="shrink-0 text-lg" />
                  {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Dashboard</span>}
                </NavLink>
              </li>

              {/* My Profile */}
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className={collapsed ? navLinkClassCollapsed : navLinkClass}
                  data-tip={collapsed ? "My Profile" : undefined}
                >
                  <ImProfile className="shrink-0 text-lg" />
                  {!collapsed && <span className="text-sm font-medium whitespace-nowrap">My Profile</span>}
                </NavLink>
              </li>

              {/* Admin Routes */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-issus-table"
                      className={collapsed ? navLinkClassCollapsed : navLinkClass}
                      data-tip={collapsed ? "All Issues" : undefined}
                    >
                      <MdOutlineViewCarousel className="shrink-0 text-lg" />
                      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">All Issues</span>}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/user-management"
                      className={collapsed ? navLinkClassCollapsed : navLinkClass}
                      data-tip={collapsed ? "User Management" : undefined}
                    >
                      <FaUsers className="shrink-0 text-lg" />
                      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">User Management</span>}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-staff"
                      className={collapsed ? navLinkClassCollapsed : navLinkClass}
                      data-tip={collapsed ? "Manage Staff" : undefined}
                    >
                      <MdManageAccounts className="shrink-0 text-lg" />
                      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Manage Staff</span>}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/user-block-manage"
                      className={collapsed ? navLinkClassCollapsed : navLinkClass}
                      data-tip={collapsed ? "Blocked Users" : undefined}
                    >
                      <MdOutlineAppBlocking className="shrink-0 text-lg" />
                      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Blocked Users</span>}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/view-payments"
                      className={collapsed ? navLinkClassCollapsed : navLinkClass}
                      data-tip={collapsed ? "View Payments" : undefined}
                    >
                      <RiSecurePaymentFill className="shrink-0 text-lg" />
                      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">View Payments</span>}
                    </NavLink>
                  </li>
                </>
              )}

              {/* Staff Routes */}
              {role === "staff" && (
                <li>
                  <NavLink
                    to="/dashboard/assigned-issues"
                    className={collapsed ? navLinkClassCollapsed : navLinkClass}
                    data-tip={collapsed ? "Assigned Issues" : undefined}
                  >
                    <MdOutlineAssignmentTurnedIn className="shrink-0 text-lg" />
                    {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Assigned Issues</span>}
                  </NavLink>
                </li>
              )}

              {/* User Routes */}
              {role === "user" && (
                <li>
                  <NavLink
                    to="/dashboard/my-issus"
                    className={collapsed ? navLinkClassCollapsed : navLinkClass}
                    data-tip={collapsed ? "My Issues" : undefined}
                  >
                    <TbReportSearch className="shrink-0 text-lg" />
                    {!collapsed && <span className="text-sm font-medium whitespace-nowrap">My Issues</span>}
                  </NavLink>
                </li>
              )}
            </ul>

            {/* Collapse Toggle Button — Desktop only */}
            <div className="hidden lg:flex justify-center pb-4 pt-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white transition-all duration-200"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <FaChevronRight size={11} /> : <FaChevronLeft size={11} />}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;