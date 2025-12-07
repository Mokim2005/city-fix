import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[450px] lg:h-[550px] bg-gradient-to-r from-[#1a132f] to-[#2b2250] overflow-hidden flex flex-col items-center justify-center text-center px-4 md:px-10">
      {/* Floating shapes for motion */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-40 h-40 bg-pink-500 rounded-full opacity-20 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Banner content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <h1 className="text-4xl bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent drop-shadow-md tracking-wide md:text-6xl lg:text-7xl font-extrabold py-4 tracking-wide">
          City Fix
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-2xl mb-6 text-gray-300"
        >
          Report city issues instantly. Help make your city smarter, cleaner,
          and safer.
        </motion.p>

        {/* Key Features / Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col md:flex-row justify-center gap-6 mb-8 text-gray-400 font-medium"
        >
          <span>🛠 Track issues in real-time</span>
          <span>💡 Suggest improvements</span>
          <span>📊 View reports & statistics</span>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#7c3aed" }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition-colors"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Optional background image overlay */}
      <img
        src="https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
    </section>
  );
};

export default Banner;
