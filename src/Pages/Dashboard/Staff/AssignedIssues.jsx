// src/components/dashboard/AssignedIssues.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, isValid } from "date-fns"; // isValid যোগ করা
import { motion } from "framer-motion";
import UserAuth from "../../../Hooks/UserAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";

// 🔥 Variants গুলো এখানে ডিফাইন করো (কম্পোনেন্টের বাইরে বা ভিতরে – যেকোনো এক জায়গায়)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AssignedIssues = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const {
    data: issues = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["assignedIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/assigned-issues");
      return res.data;
    },
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: async ({ issueId, newStatus }) => {
      const res = await axiosSecure.patch(`/staff/update-progress/${issueId}`, {
        status: newStatus,
        progressNote: `Status changed to ${newStatus} by staff`,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignedIssues"] });
    },
  });

  const handleStatusChange = (issueId, newStatus) => {
    if (newStatus) {
      mutation.mutate({ issueId, newStatus });
    }
  };

  // Safe date formatter
  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";
    const date = new Date(dateValue);
    if (isNaN(date.getTime()) || !isValid(date)) {
      return "Invalid Date";
    }
    return format(date, "dd MMM yyyy");
  };

  const filteredIssues = issues
    .filter((issue) => {
      if (statusFilter !== "All" && issue.status !== statusFilter) return false;
      if (priorityFilter !== "All" && issue.priority !== priorityFilter)
        return false;
      return true;
    })
    .sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
      // Safe sorting for dates
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isNaN(dateB) - isNaN(dateA) || dateB - dateA;
    });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-400">
          Error loading issues: {error?.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-6 md:p-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500"
        variants={itemVariants}
      >
        My Assigned Issues ({issues.length})
      </motion.h2>

      {/* Filters */}
      <motion.div
        className="flex flex-col sm:flex-row gap-5 mb-12 max-w-2xl mx-auto"
        variants={itemVariants}
      >
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 px-6 py-4 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        >
          <option value="All">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Working">Working</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="flex-1 px-6 py-4 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
        >
          <option value="All">All Priority</option>
          <option value="Normal">Normal</option>
          <option value="High">High (Boosted)</option>
        </select>
      </motion.div>

      {/* Empty State or Table */}
      {filteredIssues.length === 0 ? (
        <motion.div
          className="text-center py-24 text-2xl text-slate-500"
          variants={itemVariants}
        >
          {issues.length === 0
            ? "No issues assigned to you yet."
            : "No issues match your current filters."}
        </motion.div>
      ) : (
        <motion.div
          className="bg-slate-800/50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-slate-700"
          variants={itemVariants}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/70">
                <tr>
                  <th className="px-8 py-6 text-left text-slate-300 font-semibold text-sm uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-8 py-6 text-left text-slate-300 font-semibold text-sm uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-8 py-6 text-left text-slate-300 font-semibold text-sm uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-8 py-6 text-left text-slate-300 font-semibold text-sm uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-8 py-6 text-left text-slate-300 font-semibold text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-6 text-left text-slate-300 font-semibold text-sm uppercase tracking-wider">
                    Reported
                  </th>
                  <th className="px-8 py-6 text-left text-slate-300 font-semibold text-sm uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredIssues.map((issue) => (
                  <motion.tr
                    key={issue._id}
                    className="hover:bg-slate-700/40 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <td className="px-8 py-6 font-medium">{issue.title}</td>
                    <td className="px-8 py-6 text-slate-400">
                      {issue.category}
                    </td>
                    <td className="px-8 py-6 text-slate-400">
                      {issue.location || "-"}
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-xs font-semibold tracking-wide ${
                          issue.priority === "High"
                            ? "bg-red-900/60 text-red-300 border border-red-700"
                            : "bg-green-900/60 text-green-300 border border-green-700"
                        }`}
                      >
                        {issue.priority || "Normal"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex px-4 py-2 rounded-full text-xs font-semibold bg-cyan-900/60 text-cyan-300 border border-cyan-700">
                        {issue.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-400">
                      {formatDate(issue.createdAt)}
                    </td>
                    <td className="px-8 py-6">
                      <select
                        onChange={(e) =>
                          handleStatusChange(issue._id, e.target.value)
                        }
                        value=""
                        disabled={mutation.isPending}
                        className="px-5 py-3 bg-slate-700/80 border border-slate-600 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                      >
                        <option value="" disabled>
                          Change Status →
                        </option>
                        {(issue.status === "pending" ||
                          issue.status === "assigned") && (
                          <option value="In Progress">In Progress</option>
                        )}
                        {issue.status === "In Progress" && (
                          <option value="Working">Working</option>
                        )}
                        {issue.status === "Working" && (
                          <option value="Resolved">Resolved</option>
                        )}
                        {issue.status === "Resolved" && (
                          <option value="Closed">Closed</option>
                        )}
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AssignedIssues;
