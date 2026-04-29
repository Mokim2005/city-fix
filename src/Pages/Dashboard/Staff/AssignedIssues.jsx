// src/components/dashboard/AssignedIssues.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, isValid } from "date-fns";
import { motion } from "framer-motion";
import UserAuth from "../../../Hooks/UserAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      if (statusFilter !== "All" && issue.status !== statusFilter)
        return false;
      if (priorityFilter !== "All" && issue.priority !== priorityFilter)
        return false;
      return true;
    })
    .sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isNaN(dateB) - isNaN(dateA) || dateB - dateA;
    });

  if (isLoading) return <Loading />;

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="min-h-screen  backdrop-blur-xl px-4 py-10">
        <title>Assigned Issues</title>

        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400"
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
             className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
             className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Priority</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </motion.div>

        {/* Table */}
        {filteredIssues.length === 0 ? (
          <motion.div
            className="text-center py-24 text-2xl text-gray-400"
            variants={itemVariants}
          >
            {issues.length === 0
              ? "No issues assigned to you yet."
              : "No issues match your current filters."}
          </motion.div>
        ) : (
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10"
            variants={itemVariants}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-8 py-6 text-left text-gray-200 text-sm uppercase">
                      Title
                    </th>
                    <th className="px-8 py-6 text-left text-gray-200 text-sm uppercase">
                      Category
                    </th>
                    <th className="px-8 py-6 text-left text-gray-200 text-sm uppercase">
                      Location
                    </th>
                    <th className="px-8 py-6 text-left text-gray-200 text-sm uppercase">
                      Priority
                    </th>
                    <th className="px-8 py-6 text-left text-gray-200 text-sm uppercase">
                      Status
                    </th>
                    <th className="px-8 py-6 text-left text-gray-200 text-sm uppercase">
                      Reported
                    </th>
                    <th className="px-8 py-6 text-left text-gray-200 text-sm uppercase">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {filteredIssues.map((issue) => (
                    <motion.tr
                      key={issue._id}
                      className="hover:bg-white/10 transition"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <td className="px-8 py-6 text-white">
                        {issue.title}
                      </td>
                      <td className="px-8 py-6 text-gray-300">
                        {issue.category}
                      </td>
                      <td className="px-8 py-6 text-gray-300">
                        {issue.location || "-"}
                      </td>

                      <td className="px-8 py-6">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-semibold ${
                            issue.priority === "High"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {issue.priority || "Normal"}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <span className="px-4 py-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {issue.status}
                        </span>
                      </td>

                      <td className="px-8 py-6 text-gray-400">
                        {formatDate(issue.createdAt)}
                      </td>

                      <td className="px-8 py-6">
                        <select
                          onChange={(e) =>
                            handleStatusChange(issue._id, e.target.value)
                          }
                          value=""
                          disabled={mutation.isPending}
                           className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="" disabled>
                            Change Status →
                          </option>

                          {(issue.status === "pending" ||
                            issue.status === "assigned") && (
                            <option value="In Progress">
                              In Progress
                            </option>
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
      </div>
    </motion.div>
  );
};

export default AssignedIssues;