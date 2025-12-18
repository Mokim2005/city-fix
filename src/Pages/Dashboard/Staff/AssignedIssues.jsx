// src/components/dashboard/AssignedIssues.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import UserAuth from "../../../Hooks/UserAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AssignedIssues = () => {
  const { user } = UserAuth(); // Firebase user
  const axiosSecure = UseAxiosSecure(); // আমাদের ঠিক করা হুক
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Data Fetch: Staff এর assigned issues
  const {
    data: issues = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["assignedIssues"],
    queryFn: async () => {
      // axiosSecure অলরেডি টোকেন যোগ করে দেয় (ঠিক করা হুকে)
      const res = await axiosSecure.get("/staff/assigned-issues");
      return res.data; // Axios সবসময় res.data-ই দেয়
    },
    enabled: !!user, // ইউজার না থাকলে কোয়েরি চলবে না
  });

  // Status Update Mutation
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

  // Filtering
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
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // UI States
  if (isLoading) {
    return (
      <div className="text-center py-10">Loading your assigned issues...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading issues: {error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        My Assigned Issues ({issues.length})
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
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
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Priority</option>
          <option value="Normal">Normal</option>
          <option value="High">High (Boosted)</option>
        </select>
      </div>

      {/* Table */}
      {filteredIssues.length === 0 ? (
        <p className="text-center text-gray-500">
          No issues assigned to you yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Title</th>
                <th className="border p-3 text-left">Category</th>
                <th className="border p-3 text-left">Location</th>
                <th className="border p-3 text-left">Priority</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Reported</th>
                <th className="border p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue._id} className="hover:bg-gray-50">
                  <td className="border p-3">{issue.title}</td>
                  <td className="border p-3">{issue.category}</td>
                  <td className="border p-3">{issue.location}</td>
                  <td className="border p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        issue.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </td>
                  <td className="border p-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {issue.status || "Pending"}
                    </span>
                  </td>
                  <td className="border p-3 text-sm">
                    {format(new Date(issue.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="border p-3">
                    <select
                      onChange={(e) =>
                        handleStatusChange(issue._id, e.target.value)
                      }
                      value="" // placeholder দেখানোর জন্য
                      className="px-3 py-2 border rounded bg-white"
                      disabled={mutation.isPending}
                    >
                      <option value="" disabled>
                        Change Status
                      </option>

                      {(issue.status === "pending" ||
                        issue.status === "assigned") && (
                        <option value="In Progress">→ In Progress</option>
                      )}

                      {issue.status === "In Progress" && (
                        <option value="Working">→ Working</option>
                      )}

                      {issue.status === "Working" && (
                        <option value="Resolved">→ Resolved</option>
                      )}

                      {issue.status === "Resolved" && (
                        <option value="Closed">→ Closed</option>
                      )}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedIssues;
