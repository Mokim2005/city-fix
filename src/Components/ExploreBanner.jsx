import React from "react";
import { motion } from "framer-motion";
const ExploreBanner = () => {
  return (
    <div className="text-center py-16 px-4 md:px-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 py-4">
        Empowering issuss, Fixing Cities
      </h2>
      <p className="text-gray-300 mb-3 max-w-2xl mx-auto text-lg md:text-xl">
        Join our community to report issues, track improvements, and make your
        city smarter, cleaner, and safer. Together, every small action makes a
        big impact.
      </p>
      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#7c3aed" }}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition-colors"
      >
        About Us
      </motion.button>
    </div>
  );
};

export default ExploreBanner;
