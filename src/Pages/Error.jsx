import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, Home, LayoutDashboard, ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Error = () => {
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Icon animation
    gsap.fromTo(
      iconRef.current,
      { scale: 0, rotate: -180, opacity: 0 },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" }
    );

    // Floating animation for icon
    gsap.to(iconRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden"
    >
      <title>403 - Forbidden</title>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Error Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl p-8 sm:p-12 lg:p-16 max-w-2xl w-full shadow-2xl"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl opacity-50"></div>

        <div className="relative z-10 text-center">
          {/* Icon */}
          <div ref={iconRef} className="flex justify-center mb-8">
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                    "0 0 40px rgba(239, 68, 68, 0.8)",
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="backdrop-blur-xl bg-red-500/20 border-2 border-red-500/50 rounded-full p-6"
              >
                <ShieldAlert className="w-16 h-16 sm:w-20 sm:h-20 text-red-400" />
              </motion.div>
            </div>
          </div>

          {/* Title */}
          <div ref={titleRef}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              403
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              Access Forbidden
            </h2>
          </div>

          {/* Description */}
          <div ref={contentRef}>
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-10 leading-relaxed max-w-lg mx-auto">
              Oops! You don't have permission to access this page. Please check
              your access level or return to a safe zone.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                >
                  <Home className="w-5 h-5" />
                  Go to Home
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-2 px-8 py-4 backdrop-blur-xl bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white rounded-xl font-bold transition-all duration-300"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              </motion.div>
            </div>

            {/* Back Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 mx-auto px-6 py-3 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white rounded-xl font-semibold transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-gray-400 text-sm">
              🛡️ City Fix — Access Control System
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Need help? Contact support at{" "}
              <a
                href="mailto:support@cityfix.com"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                support@cityfix.com
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 border-4 border-red-400/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-16 h-16 border-4 border-purple-400/30 rounded-lg"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      />
    </div>
  );
};

export default Error;
