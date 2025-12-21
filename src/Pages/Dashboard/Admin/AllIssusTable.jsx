import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2"; // ← যোগ করো (যদি না থাকে)

const AllIssusTable = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  const { data: issues = [], isLoading: loadingIssues } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issus");
      return res.data;
    },
  });

  const { data: staffList = [], isLoading: loadingStaff } = useQuery({
    queryKey: ["staffList"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/list");
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ id, staffEmail, staffName }) => {
      const res = await axiosSecure.patch(`/admin/assign-staff/${id}`, {
        staffEmail,
        staffName,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allIssues"]);
      Swal.fire({
        icon: "success",
        title: "Assigned!",
        text: "Staff has been successfully assigned to the issue.",
        timer: 2000,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#fff",
      });
      setShowModal(false);
      setSelectedStaff("");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to assign staff.", "error");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/admin/reject-issue/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allIssues"]);
      Swal.fire({
        icon: "success",
        title: "Rejected",
        text: "The issue has been rejected.",
        timer: 2000,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#fff",
      });
    },
    onError: () => {
      Swal.fire("Error!", "Failed to reject issue.", "error");
    },
  });

  const handleAssign = (issue) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  const confirmAssign = async () => {
    if (!selectedStaff) {
      Swal.fire("Warning", "Please select a staff member first!", "warning");
      return;
    }

    const staff = staffList.find((s) => s.email === selectedStaff);

    const result = await Swal.fire({
      title: "Confirm Assignment",
      html: `
        <p>Assign this issue to:</p>
        <p class="font-bold text-lg text-indigo-400">${staff.displayName}</p>
        <p class="text-sm text-gray-300">(${staff.email})</p>
        <br>
        <p class="font-semibold">Issue: ${selectedIssue.title}</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Assign!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      background: "#1f2937",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl",
      },
    });

    if (result.isConfirmed) {
      assignMutation.mutate({
        id: selectedIssue._id,
        staffEmail: selectedStaff,
        staffName: staff.displayName,
      });
    }
  };

  const handleReject = async (id) => {
    const issue = issues.find((i) => i._id === id);

    const result = await Swal.fire({
      title: "Reject This Issue?",
      text: `Title: ${issue.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      background: "#1f2937",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl",
      },
    });

    if (result.isConfirmed) {
      rejectMutation.mutate(id);
    }
  };

  // Sort: High priority first, then newest
  const sortedIssues = [...issues].sort((a, b) => {
    if (a.priority === "High" && b.priority !== "High") return -1;
    if (a.priority !== "High" && b.priority === "High") return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (loadingIssues || loadingStaff) {
    return <Loading />;
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-10">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
      >
        All Issues Management
      </motion.h2>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-left text-sm font-semibold uppercase tracking-wider">
                <th className="px-6 py-5">Title</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Priority</th>
                <th className="px-6 py-5">Assigned Staff</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <AnimatePresence>
                {sortedIssues.map((issue, index) => (
                  <motion.tr
                    key={issue._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.6)" }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-5 font-medium">{issue.title}</td>
                    <td className="px-6 py-5">{issue.category}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          issue.status === "pending"
                            ? "bg-yellow-600/30 text-yellow-400"
                            : issue.status === "resolved"
                            ? "bg-green-600/30 text-green-400"
                            : issue.status === "rejected"
                            ? "bg-red-600/30 text-red-400"
                            : "bg-indigo-600/30 text-indigo-400"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          issue.priority === "High"
                            ? "bg-red-600/40 text-red-300"
                            : issue.priority === "Medium"
                            ? "bg-orange-600/40 text-orange-300"
                            : "bg-gray-600/40 text-gray-300"
                        }`}
                      >
                        {issue.priority}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {issue.assignedStaffEmail ? (
                        <span className="text-green-400">
                          {issue.assignedStaffEmail}
                        </span>
                      ) : (
                        <span className="text-gray-500 italic">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center space-x-3">
                      {!issue.assignedStaffEmail && (
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAssign(issue)}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg font-medium shadow-lg hover:shadow-indigo-500/30 transition"
                        >
                          Assign Staff
                        </motion.button>
                      )}
                      {issue.status === "pending" && (
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReject(issue._id)}
                          className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-5 py-2 rounded-lg font-medium shadow-lg hover:shadow-red-500/30 transition"
                        >
                          Reject
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Assign Staff Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6 text-indigo-400">
                Assign Staff to:{" "}
                <span className="text-white">{selectedIssue?.title}</span>
              </h3>

              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-6"
              >
                <option value="">Select a staff member</option>
                {staffList.map((s) => (
                  <option key={s._id} value={s.email}>
                    {s.displayName} ({s.email})
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-500 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmAssign}
                  disabled={assignMutation.isPending}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {assignMutation.isPending ? "Assigning..." : "Confirm Assign"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllIssusTable;
