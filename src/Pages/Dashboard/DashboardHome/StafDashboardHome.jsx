import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Bar } from "react-chartjs-2"; // react-chartjs-2 ইনস্টল করো (npm i react-chartjs-2 chart.js)
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

  if (isLoading) return <Loading></Loading>;

  // Chart data for status
  const statusChartData = {
    labels: stats.statusStats.map((s) => s._id),
    datasets: [
      {
        label: "Issues by Status",
        data: stats.statusStats.map((s) => s.count),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  // Priority chart
  const priorityChartData = {
    labels: stats.priorityStats.map((p) => p._id),
    datasets: [
      {
        label: "Issues by Priority",
        data: stats.priorityStats.map((p) => p.count),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Staff Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg">
          <h3 className="text-lg">Assigned Issues</h3>
          <p className="text-3xl">{stats.assignedCount}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <h3 className="text-lg">Resolved Issues</h3>
          <p className="text-3xl">{stats.resolvedCount}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <h3 className="text-lg">Today's Tasks</h3>
          <p className="text-3xl">{stats.todaysTasks.length}</p>
          <ul className="mt-2">
            {stats.todaysTasks.map((task) => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl mb-2">Status Chart</h3>
          <Bar data={statusChartData} />
        </div>
        <div>
          <h3 className="text-xl mb-2">Priority Chart</h3>
          <Bar data={priorityChartData} />
        </div>
      </div>
    </div>
  );
};

export default StafDashboardHome;
