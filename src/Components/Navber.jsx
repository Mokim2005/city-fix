import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown, Menu, X, LogOut, LayoutDashboard, FileText } from "lucide-react";
import logo from "../assets/logo.png";
import UserAuth from "../Hooks/UserAuth";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotate: -180, opacity: 0 },
      { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut().catch((err) => console.log(err));
    setProfileOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Report Issue", path: "/issus-form" },
    { name: "All Issues", path: "/all-issus" },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Issues", path: "/dashboard/my-issus" },
  ];

  // Reusable NavLink class — Portfolio style (ইমেজের মতো হুবহু ফিক্সড করা হয়েছে)
  const desktopNavClass = ({ isActive }) =>
    `relative text-[13px] font-bold tracking-[0.15em] uppercase transition-all duration-200 pb-2 cursor-pointer
    ${isActive
      ? "text-cyan-400 underline decoration-cyan-400 decoration-2 underline-offset-8"
      : "text-gray-300 hover:text-cyan-400"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `relative block w-full text-sm font-medium px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer
    ${isActive
      ? "text-cyan-400 bg-cyan-900/30 border-l-2 border-cyan-400"
      : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/20 border-l-2 border-transparent"
    }`;

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-2xl border-b border-white/20" : "border-b border-white/10"
      }`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/65 to-black/70 backdrop-blur-sm" />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group shrink-0">
            <motion.div
              ref={logoRef}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="backdrop-blur-xl bg-gray-900/80 border-2 border-cyan-500/20 rounded-2xl p-2 shadow-2xl cursor-pointer"
            >
              <img src={logo} alt="City Fix Logo" className="w-8 h-8 object-contain" />
            </motion.div>
            <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
              City Fix
            </span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <NavLink key={index} to={link.path} end={link.path === "/"} className={desktopNavClass}>
                {link.name}
              </NavLink>
            ))}

            {user && userLinks.map((link, index) => (
              <NavLink key={index} to={link.path} className={desktopNavClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* User Profile or Login */}
            {user ? (
              <div className="relative hidden lg:block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 py-1.5 px-3 rounded-full hover:bg-cyan-900/20 hover:border-cyan-400/40 transition-all duration-200 cursor-pointer"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-cyan-400 object-cover"
                  />
                  <span className="text-white text-sm font-medium hidden xl:block max-w-[90px] truncate">
                    {user.displayName}
                  </span>
                  <ChevronDown
                    className={`text-white/70 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
                    size={16}
                  />
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-52 backdrop-blur-2xl bg-black/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                        <p className="font-semibold text-white text-sm truncate">{user.displayName}</p>
                        <p className="text-xs text-cyan-300 truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <NavLink
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 text-sm cursor-pointer"
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </NavLink>
                        <NavLink
                          to="/dashboard/my-issus"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 text-sm cursor-pointer"
                        >
                          <FileText size={16} />
                          My Issues
                        </NavLink>
                        <button
                          onClick={handleLogOut}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="hidden lg:inline-flex items-center text-[11px] font-semibold tracking-[0.18em] uppercase border border-white/40 text-gray-300 px-5 py-2 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-pointer"
              >
                Login
              </NavLink>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden bg-white/10 border border-white/20 p-2 rounded-xl text-white cursor-pointer transition-all duration-200 hover:bg-cyan-900/20 hover:border-cyan-400/40"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden backdrop-blur-2xl bg-black/90 border-t border-white/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavClass}
                >
                  {link.name}
                </NavLink>
              ))}

              {user ? (
                <>
                  {userLinks.map((link, index) => (
                    <NavLink
                      key={index}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileNavClass}
                    >
                      {link.name}
                    </NavLink>
                  ))}

                  <div className="pt-3 mt-2 border-t border-white/10">
                    <div className="flex items-center gap-3 px-3 py-2.5 mb-2 bg-white/5 rounded-xl cursor-pointer">
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-9 h-9 rounded-full border-2 border-cyan-400"
                      />
                      <div>
                        <p className="text-white text-sm font-semibold">{user.displayName}</p>
                        <p className="text-xs text-cyan-300">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { handleLogOut(); setMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 text-sm cursor-pointer"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2">
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center text-sm font-medium border border-white/30 text-gray-300 px-4 py-2.5 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-pointer"
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;