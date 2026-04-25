import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTools, FaShieldAlt } from "react-icons/fa";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1535689077097-a8726b5ff822?auto=format&fit=crop&w=3000&q=60')",
        }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Floating Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-10 py-20">

        {/* Hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Building Smarter Cities with{" "}
            <span className="text-cyan-400">City Fix</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Empowering citizens to report, track, and resolve urban issues with
            transparency and efficiency.
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-20"
        >

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "🎯 Our Mission",
                text: "Bridge the gap between citizens and government with a fast, transparent system.",
              },
              {
                title: "🚀 Our Vision",
                text: "Create smarter cities through accountability and modern technology.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-cyan-500/20"
              >
                <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
                  {item.title}
                </h2>
                <p className="text-gray-300 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Key Features
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <FaUsers />,
                  title: "User Interaction",
                  text: "Report issues, upvote, and track real-time progress.",
                },
                {
                  icon: <FaTools />,
                  title: "Smart Management",
                  text: "Efficient issue handling by admin and staff roles.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Secure System",
                  text: "Role-based access with Firebase authentication.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-cyan-500/20"
                >
                  <div className="text-4xl mb-4 text-cyan-400 group-hover:scale-110 transition">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Roles */}
          <div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Role-Based System
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-10">
              {["User", "Staff", "Admin"].map((role, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-xl hover:border-cyan-400/40 hover:shadow-cyan-500/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                    {role}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {role === "User" &&
                      "Submit issues and track progress."}
                    {role === "Staff" &&
                      "Resolve assigned issues efficiently."}
                    {role === "Admin" &&
                      "Manage system and assign responsibilities."}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <motion.div
            variants={fadeUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Technology Stack
            </h2>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300">
              <p className="text-gray-300 text-lg">
                Built with{" "}
                <span className="text-cyan-400 font-semibold">React</span>,{" "}
                <span className="text-cyan-400 font-semibold">Node.js</span>,{" "}
                <span className="text-cyan-400 font-semibold">Express</span>,{" "}
                <span className="text-cyan-400 font-semibold">MongoDB</span>,{" "}
                <span className="text-cyan-400 font-semibold">Firebase</span>, and{" "}
                <span className="text-cyan-400 font-semibold">Stripe</span>.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default About;