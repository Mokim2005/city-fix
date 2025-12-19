import React from "react";
import { motion } from "framer-motion";

const BannerReport = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#140e26] via-[#1a1433] to-[#221a3f] text-white overflow-hidden relative">
      {/* Optional subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-transparent to-pink-600" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-20 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl"
        >
          How City Fix Works
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16"
        >
          {[
            {
              emoji: "📍",
              title: "Report an Issue",
              desc: "Spot a problem in your city and report it instantly via the app with photos and location.",
            },
            {
              emoji: "⚡",
              title: "Track Progress",
              desc: "Follow the status of your report in real-time and see updates from authorities.",
            },
            {
              emoji: "✅",
              title: "See Results",
              desc: "Get notified when the issue is resolved and help make your city better together!",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -20,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              className="relative group"
            >
              {/* Main Card with strong floating effect */}
              <div
                className="relative p-8 lg:p-10 bg-gradient-to-br from-[#2b2250]/90 via-[#251d45]/95 to-[#1e1638]/90 rounded-3xl backdrop-blur-xl border border-purple-700/40 
                shadow-2xl group-hover:shadow-purple-500/30 
                transition-all duration-500 
                translate-y-0 group-hover:-translate-y-4"
              >
                {/* Inner glow border on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Extra floating shadow layer */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10" />

                <div className="relative z-20 text-center">
                  <motion.div
                    whileHover={{
                      scale: 1.3,
                      rotate: index === 0 ? 15 : index === 2 ? -15 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-7xl mb-8 inline-block drop-shadow-lg"
                  >
                    <span className="bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {item.emoji}
                    </span>
                  </motion.div>

                  <h3 className="font-extrabold text-2xl lg:text-3xl mb-5 text-white drop-shadow-md">
                    {item.title}
                  </h3>

                  <p className="text-gray-200 text-base lg:text-lg leading-relaxed max-w-sm mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BannerReport;
