// src/pages/dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDashboardHome = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    payments: 0,
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/dashboard/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const pieData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        data: [stats.pending, stats.inProgress, stats.resolved],
        backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative p-8 bg-gradient-to-br from-gray-900 to-indigo-950 min-h-screen text-gray-100 overflow-hidden"
    >
      {/* Floating subtle shapes for dark, techy vibe */}
      <motion.div
        className="absolute top-10 left-10 w-48 h-48 bg-indigo-800/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 bg-purple-800/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent"
      >
        Dashboard
      </motion.h1>

      {/* Stat Cards with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="stat bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-indigo-500/30"
        >
          <div className="stat-title text-gray-400">Total Issues</div>
          <div className="stat-value text-cyan-400">{stats.total}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="stat bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-amber-500/30"
        >
          <div className="stat-title text-gray-400">Pending</div>
          <div className="stat-value text-amber-400">{stats.pending}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="stat bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-blue-500/30"
        >
          <div className="stat-title text-gray-400">In Progress</div>
          <div className="stat-value text-blue-400">{stats.inProgress}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="stat bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-green-500/30"
        >
          <div className="stat-title text-gray-400">Resolved</div>
          <div className="stat-value text-green-400">{stats.resolved}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="stat bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-purple-500/30"
        >
          <div className="stat-title text-gray-400">Total Payments</div>
          <div className="stat-value text-purple-400">${stats.payments}</div>
        </motion.div>
      </div>

      {/* Chart with animation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="card bg-gray-800/80 backdrop-blur-md shadow-xl p-6 rounded-xl border border-indigo-500/30"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          Issue Status Overview
        </h2>
        <div className="max-w-md mx-auto">
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom", labels: { color: "#e5e7eb" } },
              },
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserDashboardHome;
