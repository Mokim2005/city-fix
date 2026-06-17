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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
        <p class="font-bold text-lg text-green-400">${staff.displayName}</p>
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

  // Pagination logic
  const totalPages = Math.ceil(sortedIssues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedIssues = sortedIssues.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loadingIssues || loadingStaff) {
    return <Loading />;
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-6 lg:p-10">
    <title>All Issues Table</title>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-10 text-center bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent drop-shadow-lg"
      >
        All Issues Management ({sortedIssues.length})
      </motion.h2>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/30"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
                <tr className="bg-gradient-to-r from-cyan-600/50 to-teal-600/50 text-xs md:text-sm uppercase">
                <th className="px-3 md:px-6 py-4 md:py-5">Title</th>
                <th className="px-3 md:px-6 py-4 md:py-5 hidden sm:table-cell">Category</th>
                <th className="px-3 md:px-6 py-4 md:py-5">Status</th>
                <th className="px-3 md:px-6 py-4 md:py-5 hidden lg:table-cell">Priority</th>
                <th className="px-3 md:px-6 py-4 md:py-5 hidden xl:table-cell">Assigned Staff</th>
                <th className="px-3 md:px-6 py-4 md:py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              <AnimatePresence>
                {paginatedIssues.map((issue, index) => (
                  <motion.tr
                    key={issue._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    className="transition-colors"
                  >
                    <td className="px-3 md:px-6 py-4 md:py-5 font-medium text-sm md:text-base">
                      <div className="line-clamp-2">{issue.title}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 md:py-5 hidden sm:table-cell text-sm md:text-base">{issue.category}</td>
                    <td className="px-3 md:px-6 py-4 md:py-5">
                      <span
                        className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                          issue.status === "pending"
                            ? "bg-amber-900/40 text-amber-300"
                            : issue.status === "resolved"
                            ? "bg-emerald-900/40 text-emerald-300"
                            : issue.status === "rejected"
                            ? "bg-red-600/30 text-red-300"
                            : "bg-cyan-900/30 text-cyan-300"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 md:py-5 hidden lg:table-cell">
                      <span
                        className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs font-bold ${
                          issue.priority === "High"
                            ? "bg-red-900/40 text-red-300"
                            : issue.priority === "Medium"
                            ? "bg-amber-900/40 text-amber-300"
                            : "bg-gray-700/40 text-gray-300"
                        }`}
                      >
                        {issue.priority}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 md:py-5 hidden xl:table-cell text-sm">
                      {issue.assignedStaffEmail ? (
                        <span className="text-green-300">
                          {issue.assignedStaffEmail}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        {!issue.assignedStaffEmail && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAssign(issue)}
                             className="cityfix-btn cityfix-btn-primary px-3 md:px-5 py-2 rounded-lg text-xs md:text-sm shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
                          >
                            Assign
                          </motion.button>
                        )}
                        {issue.status === "pending" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReject(issue._id)}
                             className="cityfix-btn cityfix-btn-primary px-3 md:px-5 py-2 rounded-lg text-xs md:text-sm shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
                          >
                            Reject
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-2 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="cityfix-btn cityfix-btn-ghost px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </motion.button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            // Show first page, last page, current page, and pages around current
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(page)}
                  className={`cityfix-btn ${currentPage === page ? "cityfix-btn-primary" : "cityfix-btn-ghost"} px-4 py-2 rounded-lg cursor-pointer ${
                    currentPage === page
                      ? "shadow-lg shadow-cyan-500/20"
                      : ""
                  }`}
                >
                  {page}
                </motion.button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="text-white px-2">
                  ...
                </span>
              );
            }
            return null;
          })}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cityfix-btn cityfix-btn-ghost px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </motion.button>
        </motion.div>
      )}

      {/* Assign Staff Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-md p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Assign Staff to:{" "}
                <span className="text-white block mt-2">{selectedIssue?.title}</span>
              </h3>

              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent mb-6 cursor-pointer"
              >
                <option value="" className="bg-gray-800">Select a staff member</option>
                {staffList.map((s) => (
                  <option key={s._id} value={s.email} className="bg-gray-800">
                    {s.displayName} ({s.email})
                  </option>
                ))}
              </select>

              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="cityfix-btn cityfix-btn-ghost px-6 py-3 rounded-lg border border-white/30 cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmAssign}
                  disabled={assignMutation.isPending}
                  className="cityfix-btn cityfix-btn-primary px-6 py-3 rounded-lg shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
