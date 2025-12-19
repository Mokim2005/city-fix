import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden flex items-center justify-center text-center px-6 md:px-12">
      {/* Dark futuristic smart city background */}
      <div className="absolute inset-0">
        <img
          src="https://thumbs.dreamstime.com/b/stunning-futuristic-city-skyline-illuminated-vibrant-neon-lights-shades-blue-pink-purple-depicting-high-tech-393346294.jpg"
          alt="Dark futuristic smart city at night"
          className="w-full h-full object-cover"
        />
        {/* Heavy dark overlay for moody, dark vibe and better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-indigo-950/85 to-purple-950/90" />
      </div>

      {/* Floating abstract shapes – kept subtle with darker tones */}
      <motion.div
        className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 bg-purple-800/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-indigo-800/20 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 md:w-56 md:h-56 bg-cyan-900/15 rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-5xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl"
        >
          City Fix
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-xl md:text-3xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
        >
          Report city issues instantly. Together, we make our city smarter, cleaner, and safer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-gray-300 text-lg md:text-xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-3"
          >
            <span className="text-3xl">📍</span> Real-time issue tracking
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-3xl">💡</span> Suggest improvements
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-3"
          >
            <span className="text-3xl">📊</span> View reports & stats
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(109, 40, 217, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-purple-700 text-white font-bold text-lg rounded-full shadow-2xl transition-all"
          >
            Get Started Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, backgroundColor: "#1e293b" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-transparent border-2 border-gray-400 text-gray-200 font-bold text-lg rounded-full backdrop-blur-sm"
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;