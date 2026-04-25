import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTools, FaShieldAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white px-4 md:px-10 py-16">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About <span className="text-cyan-400">City Fix</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          City Fix is a smart civic issue reporting platform that empowers
          citizens to report urban problems and track real-time progress while
          authorities take action efficiently.
        </p>
      </motion.div>

      {/* Glass Container */}
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
              🎯 Our Mission
            </h2>
            <p className="text-gray-300">
              To bridge the gap between citizens and government by providing a
              transparent and efficient system for reporting and resolving civic
              issues.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
              🚀 Our Vision
            </h2>
            <p className="text-gray-300">
              To build smarter cities where technology ensures accountability,
              faster problem resolution, and improved quality of life.
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 text-center"
            >
              <FaUsers className="text-4xl mx-auto mb-4 text-cyan-400" />
              <h3 className="text-xl font-semibold mb-2">User Interaction</h3>
              <p className="text-gray-300 text-sm">
                Report issues, upvote problems, and track progress in real-time.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 text-center"
            >
              <FaTools className="text-4xl mx-auto mb-4 text-cyan-400" />
              <h3 className="text-xl font-semibold mb-2">Smart Management</h3>
              <p className="text-gray-300 text-sm">
                Admin assigns tasks, staff resolves issues efficiently.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 text-center"
            >
              <FaShieldAlt className="text-4xl mx-auto mb-4 text-cyan-400" />
              <h3 className="text-xl font-semibold mb-2">Secure System</h3>
              <p className="text-gray-300 text-sm">
                Firebase authentication with role-based protected routes.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Role Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">
            Role-Based System
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {["User", "Staff", "Admin"].map((role, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-cyan-300">
                  {role}
                </h3>
                <p className="text-gray-300 text-sm">
                  {role === "User" &&
                    "Submit and manage issues, upvote and track progress."}
                  {role === "Staff" &&
                    "Handle assigned issues and update status efficiently."}
                  {role === "Admin" &&
                    "Manage users, assign staff, and control the system."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-6">
            Technology Stack
          </h2>

          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <p className="text-gray-300">
              Built using <span className="text-cyan-400">React</span>,{" "}
              <span className="text-cyan-400">Node.js</span>,{" "}
              <span className="text-cyan-400">Express</span>,{" "}
              <span className="text-cyan-400">MongoDB</span>,{" "}
              <span className="text-cyan-400">Firebase</span>, and{" "}
              <span className="text-cyan-400">Stripe</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;