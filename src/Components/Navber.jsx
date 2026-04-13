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
    // Logo animation on mount
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotate: -180, opacity: 0 },
      { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut().catch((err) => console.log(err));
    setProfileOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/issus-form" },
    { name: "All Issues", path: "/all-issus" },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Issues", path: "/dashboard/my-issus" },
  ];

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCnjou-vW2aJ1l3p-bTuxfd0Q25AWYbwHcVA&s')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-2xl border-b border-white/20"
          : "border-b border-white/10"
      }`}
    >
      {/* Stronger Background Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/65 to-black/70 backdrop-blur-sm"></div>
      {/* Fixed Width Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <motion.div
              ref={logoRef}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="backdrop-blur-xl bg-white/20 border-2 border-white/30 rounded-2xl p-2 shadow-2xl"
            >
              <img src={logo} alt="City Fix Logo" className="w-10 h-10 object-contain" />
            </motion.div>
            <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
              City Fix
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                        : "text-white hover:text-cyan-300 hover:bg-white/20 backdrop-blur-sm"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </motion.div>
            ))}

            {user &&
              userLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                          : "text-white hover:text-cyan-300 hover:bg-white/20 backdrop-blur-sm"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Profile or Login */}
            {user ? (
              <div className="relative hidden lg:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 backdrop-blur-xl bg-white/20 border-2 border-white/30 py-2 px-3 rounded-full shadow-2xl hover:bg-white/30 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full border-2 border-cyan-400 object-cover shadow-lg"
                  />
                  <span className="text-white font-bold hidden xl:block max-w-[100px] truncate drop-shadow-lg">
                    {user.displayName}
                  </span>
                  <ChevronDown
                    className={`text-white transition-transform duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    size={18}
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 backdrop-blur-2xl bg-black/90 border-2 border-white/30 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                        <p className="font-bold text-white truncate drop-shadow-lg">{user.displayName}</p>
                        <p className="text-sm text-cyan-300 truncate">{user.email}</p>
                      </div>

                      <div className="p-2">
                        <NavLink
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-white hover:text-cyan-300 hover:bg-white/20 rounded-xl transition-all duration-300 font-semibold"
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </NavLink>
                        <NavLink
                          to="/dashboard/my-issus"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-white hover:text-cyan-300 hover:bg-white/20 rounded-xl transition-all duration-300 font-semibold"
                        >
                          <FileText size={18} />
                          My Issues
                        </NavLink>
                        <button
                          onClick={handleLogOut}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 font-semibold"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink
                  to="/login"
                  className="hidden lg:block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
                >
                  Login
                </NavLink>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden backdrop-blur-xl bg-white/20 border-2 border-white/30 p-2 rounded-xl text-white shadow-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.3 }}
            className="lg:hidden backdrop-blur-2xl bg-black/90 border-t border-white/20"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                        : "text-white hover:text-cyan-300 hover:bg-white/20"
                    }`
                  }
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
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                            : "text-white hover:text-cyan-300 hover:bg-white/20"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}

                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2 backdrop-blur-xl bg-white/10 rounded-xl">
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-lg"
                      />
                      <div>
                        <p className="text-white font-bold drop-shadow-lg">{user.displayName}</p>
                        <p className="text-sm text-cyan-300">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 text-left font-bold"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-center shadow-lg shadow-cyan-500/50"
                >
                  Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
