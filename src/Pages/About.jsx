import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTools, FaShieldAlt } from "react-icons/fa";

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1535689077097-a8726b5ff822?fm=jpg&q=60&w=3000&auto=format&fit=crop')",
        }}
      ></div>

      {/* 🔥 Dark + Glass Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* 🔥 Floating Gradient Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-10 py-20">

        {/* Hero Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-cyan-400">City Fix</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            A smart civic platform empowering citizens to report issues,
            collaborate with authorities, and build better cities together.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            {[{
              title: "🎯 Our Mission",
              text: "To bridge the gap between citizens and government with a transparent, fast, and efficient issue resolution system."
            },
            {
              title: "🚀 Our Vision",
              text: "To create smarter cities where technology drives accountability and improves daily urban life."
            }].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl"
              >
                <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
                  {item.title}
                </h2>
                <p className="text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-10">
              Key Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[{
                icon: <FaUsers />,
                title: "User Interaction",
                text: "Report, upvote, and track civic issues in real-time."
              },
              {
                icon: <FaTools />,
                title: "Smart Management",
                text: "Admins assign and staff resolve issues efficiently."
              },
              {
                icon: <FaShieldAlt />,
                title: "Secure System",
                text: "Firebase auth with protected role-based access."
              }].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08 }}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl"
                >
                  <div className="text-4xl mx-auto mb-4 text-cyan-400">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </motion.div>
              ))}
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
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08 }}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl"
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
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Technology Stack
            </h2>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
              <p className="text-gray-300">
                Built using{" "}
                <span className="text-cyan-400 font-semibold">React</span>,{" "}
                <span className="text-cyan-400 font-semibold">Node.js</span>,{" "}
                <span className="text-cyan-400 font-semibold">Express</span>,{" "}
                <span className="text-cyan-400 font-semibold">MongoDB</span>,{" "}
                <span className="text-cyan-400 font-semibold">Firebase</span>, and{" "}
                <span className="text-cyan-400 font-semibold">Stripe</span>.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;