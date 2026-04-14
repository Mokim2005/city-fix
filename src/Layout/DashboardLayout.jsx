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
    // Logo animation
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotate: -180, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }

    // Sidebar animation
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  console.log("this is role", role);

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
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      <div className="drawer lg:drawer-open max-w-7xl mx-auto relative z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* CONTENT */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Top Navbar */}
          <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="navbar backdrop-blur-xl bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-b border-white/20 shadow-xl sticky top-0 z-20"
          >
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden backdrop-blur-xl bg-white/20 border border-white/30 text-white hover:bg-white/30"
            >
              ☰
            </label>
            <div className="px-4 flex items-center gap-3">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white drop-shadow-lg">
                City Fix Dashboard
              </div>
            </div>
          </motion.nav>

          {/* Main Content Area */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side z-30">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <motion.div
            ref={sidebarRef}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex min-h-full flex-col backdrop-blur-2xl bg-gradient-to-b from-purple-900/90 to-pink-900/90 border-r border-white/20 shadow-2xl is-drawer-close:w-20 is-drawer-open:w-72"
          >
            <ul className="menu w-full grow p-4 space-y-2">
              {/* Logo/Home */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl transition-all duration-300 mb-4"
                  data-tip="Homepage"
                >
                  <motion.img
                    ref={logoRef}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 object-contain"
                    src={logo}
                    alt="logo"
                  />
                  <span className="is-drawer-close:hidden text-white font-bold text-lg">
                    Homepage
                  </span>
                </Link>
              </li>

              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`
                  }
                  data-tip="Dashboard Home"
                >
                  <FaHome className="text-xl" />
                  <span className="is-drawer-close:hidden font-semibold">
                    Dashboard Home
                  </span>
                </NavLink>
              </li>

              {/* ================= ADMIN ================= */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-issus-table"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="View All Issues"
                    >
                      <MdOutlineViewCarousel className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        View All Issues
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-staff"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="Manage Staff"
                    >
                      <MdManageAccounts className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        Manage Staff
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/my-profile"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="My Profile"
                    >
                      <ImProfile className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        My Profile
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/user-block-manage"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="User Block Manage"
                    >
                      <MdOutlineAppBlocking className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        User Block Manage
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/user-management"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="User Management"
                    >
                      <FaUsers className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        User Management
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/view-payments"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="View Payments"
                    >
                      <RiSecurePaymentFill className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        View Payments
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* ================= STAFF ================= */}
              {role === "staff" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/assigned-issues"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="Assigned Issues"
                    >
                      <MdOutlineAssignmentTurnedIn className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        Assigned Issues
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/my-profile"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="My Profile"
                    >
                      <ImProfile className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        My Profile
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* ================= CITIZEN ================= */}
              {role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-issus"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="My Issues"
                    >
                      <TbReportSearch className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        My Issues
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/my-profile"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right backdrop-blur-xl border border-white/30 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      data-tip="My Profile"
                    >
                      <ImProfile className="text-xl" />
                      <span className="is-drawer-close:hidden font-semibold">
                        My Profile
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
