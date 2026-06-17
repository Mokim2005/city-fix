import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UserAuth from "../../../Hooks/UserAuth";
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
import Loading from "../../../Components/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboardHome = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UserAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading)
    return Loading

  const chartData = {
    labels: stats.statusStats.map((s) => s._id),
    datasets: [
      {
        label: "Issues by Status",
        data: stats.statusStats.map((s) => s.count),
        backgroundColor: "rgba(34, 197, 94, 0.6)", 
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#e2e8f0" } },
      title: { display: false },
      tooltip: { backgroundColor: "rgba(15, 23, 42, 0.8)" },
    },
    scales: {
      x: {
        ticks: { color: "#e2e8f0" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#e2e8f0" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen text-white p-6 md:p-8">
     <title>Admin Dashboard</title>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent drop-shadow-lg"
      >
        Admin Dashboard
      </motion.h2>

      {/* Stats Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10"
      >
        {[
          {
            label: "Total Issues",
            value: stats.totalIssues,
            cardClass: "bg-slate-900 border border-cyan-800",
            valueClass: "text-cyan-400",
            labelClass: "text-cyan-300",
          },
          {
            label: "Resolved",
            value: stats.resolvedCount,
            cardClass: "bg-emerald-950 border border-emerald-700",
            valueClass: "text-emerald-400",
            labelClass: "text-gray-200",
          },
          {
            label: "Pending",
            value: stats.pendingCount,
            cardClass: "bg-amber-950 border border-amber-700",
            valueClass: "text-amber-400",
            labelClass: "text-gray-200",
          },
          {
            label: "Rejected",
            value: stats.rejectedCount,
            cardClass: "bg-red-950 border border-red-800",
            valueClass: "text-red-400",
            labelClass: "text-gray-200",
          },
          {
            label: "Total Payments",
            value: `${stats.totalPaymentAmount} BDT`,
            cardClass: "bg-slate-900 border border-teal-700",
            valueClass: "text-teal-400",
            labelClass: "text-gray-200",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative overflow-hidden rounded-xl p-6 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${item.cardClass}`}
          >
            <div className="relative z-10">
              <p className={`text-sm font-medium ${item.labelClass}`}>{item.label}</p>
              <p className={`text-3xl font-bold mt-2 ${item.valueClass}`}>{item.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 mb-10 border border-cyan-500/20"
      >
        <h3 className="text-2xl font-semibold mb-6 text-cyan-300">
          Issues by Status
        </h3>
        <div className="h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Latest Sections */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Latest Issues",
            items: stats.latestIssues,
            key: "_id",
            display: (i) => `${i.title} (${i.status})`,
          },
          {
            title: "Latest Payments",
            items: stats.latestPayments,
            key: "_id",
            display: (p) => `${p.email} - ${p.amount_bdt} BDT`,
          },
          {
            title: "Latest Users",
            items: stats.latestUsers,
            key: "_id",
            display: (u) => `${u.displayName} (${u.email})`,
          },
        ].map((section, secIndex) => (
          <motion.div
            key={secIndex}
            variants={cardVariants}
            className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 border border-cyan-500/20"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-semibold mb-5 text-cyan-300">
              {section.title}
            </h3>
            <ul className="space-y-4">
              <AnimatePresence>
                {section.items.map((item, idx) => (
                  <motion.li
                    key={item[section.key]}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: idx * 0.05 }}
                    className="backdrop-blur-md bg-white/10 rounded-lg px-4 py-3 hover:bg-cyan-900/20 transition-colors duration-200 text-white"
                  >
                    {section.display(item)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminDashboardHome;
