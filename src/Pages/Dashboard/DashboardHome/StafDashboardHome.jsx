import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"; // npm i framer-motion

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UserAuth from "../../../Hooks/UserAuth";
import Loading from "../../../Components/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const StafDashboardHome = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UserAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["staffStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/stats");
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) return <Loading />;

  // Professional dark-mode friendly chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#e2e8f0" }, // slate-200
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)", // slate-900
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(148, 163, 184, 0.2)" }, // slate-400 opacity
        ticks: { color: "#e2e8f0" },
      },
      y: {
        grid: { color: "rgba(148, 163, 184, 0.2)" },
        ticks: { color: "#e2e8f0" },
      },
    },
  };

  const statusChartData = {
    labels: stats.statusStats?.map((s) => s._id) || [],
    datasets: [
      {
        label: "Issues by Status",
        data: stats.statusStats?.map((s) => s.count) || [],
        backgroundColor: "rgba(34, 211, 238, 0.7)", // cyan-400
        borderColor: "rgb(34, 211, 238)",
        borderWidth: 1,
      },
    ],
  };

  const priorityChartData = {
    labels: stats.priorityStats?.map((p) => p._id) || [],
    datasets: [
      {
        label: "Issues by Priority",
        data: stats.priorityStats?.map((p) => p.count) || [],
        backgroundColor: "rgba(139, 92, 246, 0.7)", // violet-500
        borderColor: "rgb(139, 92, 246)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      className="min-h-screen text-white p-6 md:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <title>Staff Dashboard</title>
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 drop-shadow-lg"
          variants={itemVariants}
        >
          Staff Dashboard Overview
        </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        variants={containerVariants}
      >
        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/50 transition-shadow duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Assigned Issues
          </h3>
          <p className="text-4xl font-bold text-cyan-300">
            {stats.assignedCount ?? 0}
          </p>
        </motion.div>

        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl hover:shadow-green-500/50 transition-shadow duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Resolved Issues
          </h3>
          <p className="text-4xl font-bold text-green-300">
            {stats.resolvedCount ?? 0}
          </p>
        </motion.div>

        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-500/50 transition-shadow duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Today's Tasks
          </h3>
          <p className="text-4xl font-bold text-yellow-300 mb-4">
            {stats.todaysTasks?.length ?? 0}
          </p>
          <ul className="space-y-2 text-sm text-gray-200">
            {stats.todaysTasks?.map((task) => (
              <motion.li
                key={task._id}
                className="backdrop-blur-md bg-white/10 rounded-lg px-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {task.title}
              </motion.li>
            )) || <li>No tasks today</li>}
          </ul>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl"
            variants={chartVariants}
          >
            <h3 className="text-2xl font-bold mb-4 text-green-300">
              Issues by Status
            </h3>
          <div className="h-80">
            <Bar data={statusChartData} options={chartOptions} />
          </div>
        </motion.div>

          <motion.div
            className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl"
            variants={chartVariants}
          >
            <h3 className="text-2xl font-bold mb-4 text-emerald-300">
              Issues by Priority
            </h3>
          <div className="h-80">
            <Bar data={priorityChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StafDashboardHome;
