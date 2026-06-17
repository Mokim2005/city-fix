import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTools, FaShieldAlt } from "react-icons/fa";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <div className="relative text-white overflow-hidden">
      
      {/* Content */}
      <div className="relative z-10 px-4 md:px-10 py-20">

        {/* Hero Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.15] tracking-tight">
            Building Smarter Cities with{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              City Fix
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering citizens to report, track, and resolve urban issues with
            complete transparency and modern efficiency.
          </p>
        </motion.div>

        {/* Sections Container */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-24"
        >

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "🎯 Our Mission",
                text: "Bridge the gap between citizens and government with a fast, transparent, and highly efficient communication loop.",
                bgGlow: "from-cyan-500/5 to-teal-500/5",
                hoverBorder: "hover:border-cyan-500/30",
                glowShadow: "hover:shadow-cyan-500/5"
              },
              {
                title: "🚀 Our Vision",
                text: "Create modern, responsive, smarter cities across the nation through digital accountability and infrastructure automation.",
                bgGlow: "from-purple-500/5 to-indigo-500/5",
                hoverBorder: "hover:border-purple-500/30",
                glowShadow: "hover:shadow-purple-500/5"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`
                  group relative p-8 rounded-2xl bg-gray-900 border border-gray-800/60
                  ${item.hoverBorder} shadow-md ${item.glowShadow}
                  transition-all duration-300 ease-in-out overflow-hidden
                `}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-3 text-white tracking-tight">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Features */}
          <div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight"
            >
              Key Features
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FaUsers />,
                  title: "User Interaction",
                  text: "Report issues seamlessly, upvote community concerns, and track real-time progress.",
                  bgGlow: "from-amber-500/5 to-yellow-500/5",
                  iconColor: "text-amber-400",
                  hoverBorder: "hover:border-amber-400/30",
                  glowShadow: "hover:shadow-amber-500/5"
                },
                {
                  icon: <FaTools />,
                  title: "Smart Management",
                  text: "Efficient issue distribution and structured task handling by authorized city staff.",
                  bgGlow: "from-cyan-500/5 to-blue-500/5",
                  iconColor: "text-cyan-400",
                  hoverBorder: "hover:border-cyan-400/30",
                  glowShadow: "hover:shadow-cyan-500/5"
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Secure System",
                  text: "Next-gen role-based access control secured entirely via robust Firebase authentication.",
                  bgGlow: "from-emerald-500/5 to-green-500/5",
                  iconColor: "text-emerald-400",
                  hoverBorder: "hover:border-emerald-400/30",
                  glowShadow: "hover:shadow-emerald-500/5"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`
                    group relative p-6 text-center rounded-2xl bg-gray-900 border border-gray-800/60
                    ${item.hoverBorder} shadow-md ${item.glowShadow}
                    transition-all duration-300 ease-in-out overflow-hidden
                  `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`text-3xl mb-4 flex justify-center ${item.iconColor} transition-transform duration-300 group-hover:scale-105`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Roles System */}
          <div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight"
            >
              Role-Based Dashboard
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { role: "User", text: "Submit issues with media data and trace daily system updates.", hoverBorder: "hover:border-pink-500/30", bgGlow: "from-pink-500/5 to-rose-500/5", glowShadow: "hover:shadow-pink-500/5" },
                { role: "Staff", text: "Receive specific community complaints and update action steps instantly.", hoverBorder: "hover:border-violet-500/30", bgGlow: "from-violet-500/5 to-purple-500/5", glowShadow: "hover:shadow-violet-500/5" },
                { role: "Admin", text: "Overlook regional security, authorize staff roles, and allocate resources.", hoverBorder: "hover:border-blue-500/30", bgGlow: "from-blue-500/5 to-indigo-500/5", glowShadow: "hover:shadow-blue-500/5" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`
                    group relative p-6 text-center rounded-2xl bg-gray-900 border border-gray-800/60
                    ${item.hoverBorder} shadow-md ${item.glowShadow}
                    transition-all duration-300 ease-in-out overflow-hidden
                  `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-2 text-white tracking-tight">
                      {item.role}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <motion.div variants={fadeUp} className="text-center max-w-4xl mx-auto pt-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight">
              Technology Stack
            </h2>

            <div className="group relative p-8 rounded-2xl bg-gray-900 border border-gray-800/60 hover:border-cyan-500/20 shadow-md transition-all duration-300 overflow-hidden">
              <p className="text-gray-400 text-base md:text-lg leading-relaxed relative z-10">
                Engineered flawlessly with{" "}
                <span className="text-cyan-400 font-semibold transition-colors duration-300 group-hover:text-cyan-300">React</span>,{" "}
                <span className="text-cyan-400 font-semibold transition-colors duration-300 group-hover:text-cyan-300">Node.js</span>,{" "}
                <span className="text-cyan-400 font-semibold transition-colors duration-300 group-hover:text-cyan-300">Express</span>,{" "}
                <span className="text-cyan-400 font-semibold transition-colors duration-300 group-hover:text-cyan-300">MongoDB</span>,{" "}
                <span className="text-cyan-400 font-semibold transition-colors duration-300 group-hover:text-cyan-300">Firebase</span>, and{" "}
                <span className="text-cyan-400 font-semibold transition-colors duration-300 group-hover:text-cyan-300">Stripe</span>.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default About;