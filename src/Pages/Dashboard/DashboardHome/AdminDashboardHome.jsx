import React from "react";
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

  if (isLoading) return <div>Loading dashboard...</div>;

  const chartData = {
    labels: stats.statusStats.map((s) => s._id),
    datasets: [
      {
        label: "Issues by Status",
        data: stats.statusStats.map((s) => s.count),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded">
          Total Issues: {stats.totalIssues}
        </div>
        <div className="p-4 bg-green-100 rounded">
          Resolved: {stats.resolvedCount}
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          Pending: {stats.pendingCount}
        </div>
        <div className="p-4 bg-red-100 rounded">
          Rejected: {stats.rejectedCount}
        </div>
        <div className="p-4 bg-purple-100 rounded">
          Total Payments: {stats.totalPaymentAmount} BDT
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl mb-2">Issues Chart</h3>
        <Bar data={chartData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg">Latest Issues</h3>
          <ul>
            {stats.latestIssues.map((i) => (
              <li key={i._id}>
                {i.title} ({i.status})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg">Latest Payments</h3>
          <ul>
            {stats.latestPayments.map((p) => (
              <li key={p._id}>
                {p.email} - {p.amount_bdt} BDT
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg">Latest Users</h3>
          <ul>
            {stats.latestUsers.map((u) => (
              <li key={u._id}>
                {u.displayName} ({u.email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
