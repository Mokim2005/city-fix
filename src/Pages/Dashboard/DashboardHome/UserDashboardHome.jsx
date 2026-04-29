// src/pages/dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";

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
    return Loading
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative p-8 min-h-screen text-white overflow-hidden"
    >
      <title>User Dashboard</title>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          Dashboard
        </motion.h1>

      {/* Stat Cards with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="stat backdrop-blur-xl bg-white/10 rounded-xl shadow-lg border border-white/30"
        >
          <div className="stat-title text-gray-200">Total Issues</div>
          <div className="stat-value text-cyan-300">{stats.total}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="stat backdrop-blur-xl bg-white/10 rounded-xl shadow-lg border border-white/30"
        >
          <div className="stat-title text-gray-200">Pending</div>
          <div className="stat-value text-amber-300">{stats.pending}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="stat backdrop-blur-xl bg-white/10 rounded-xl shadow-lg border border-white/30"
        >
          <div className="stat-title text-gray-200">In Progress</div>
          <div className="stat-value text-blue-300">{stats.inProgress}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="stat backdrop-blur-xl bg-white/10 rounded-xl shadow-lg border border-white/30"
        >
          <div className="stat-title text-gray-200">Resolved</div>
          <div className="stat-value text-green-300">{stats.resolved}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="stat backdrop-blur-xl bg-white/10 rounded-xl shadow-lg border border-white/30"
        >
          <div className="stat-title text-gray-200">Total Payments</div>
          <div className="stat-value text-purple-300">${stats.payments}</div>
        </motion.div>
      </div>

      {/* Chart with animation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="card backdrop-blur-xl bg-white/10 shadow-xl p-6 rounded-xl border border-white/30"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Issue Status Overview
        </h2>
        <div className="max-w-md mx-auto">
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom", labels: { color: "#ffffff" } },
              },
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserDashboardHome;
