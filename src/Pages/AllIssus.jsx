import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UserAuth from "../Hooks/UserAuth";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import { useQuery } from "@tanstack/react-query";

const AllIssus = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loadingIds, setLoadingIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all issues
  const { data: issues = [], isLoading: loading } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issus");
      return res.data;
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const hasUserUpvoted = (issue) => {
    if (!user || !issue?.upvotedUsers) return false;
    return issue.upvotedUsers.includes(user.email);
  };

  const handleUpvote = async (issue) => {
    if (!user) return navigate("/login");

    if (issue.email === user.email) {
      return Swal.fire("Oops!", "You cannot upvote your own issue.", "warning");
    }

    if (hasUserUpvoted(issue)) {
      return Swal.fire("Oops!", "You already upvoted this issue.", "warning");
    }

    setLoadingIds((prev) => [...prev, issue._id]);

    try {
      const res = await axiosSecure.patch(`/issus/upvote/${issue._id}`, {
        email: user.email,
      });

      if (!res.data?.success) {
        Swal.fire("Error", res.data?.message || "Upvote failed", "error");
      }
      // Query will be stale, but we keep it simple as before
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Upvote failed!", "error");
    } finally {
      setLoadingIds((prev) => prev.filter((x) => x !== issue._id));
    }
  };

  if (loading) {
    return <Loading />;
  }

  const displayedIssues = issues
    .filter((i) => i.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => {
      if (filter === "all") return true;
      if (
        [
          "Road",
          "Electricity",
          "Water",
          "Garbage",
          "Sanitation",
          "Other",
        ].includes(filter)
      ) {
        return i.category === filter;
      }
      if (["pending", "in-progress", "resolved"].includes(filter)) {
        return i.status?.toLowerCase() === filter; // Case-insensitive match
      }
      if (["High", "Normal"].includes(filter)) {
        return i.priority === filter;
      }
      return true;
    });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(displayedIssues.length / itemsPerPage);
  const paginatedIssues = displayedIssues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -12,
      scale: 1.03,
      transition: { duration: 0.4 },
    },
  };

  // Fixed status styling – handles both lowercase and "Resolved"
  const getStatusStyle = (status) => {
    const lowerStatus = status?.toLowerCase();
    switch (lowerStatus) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50";
      case "in-progress":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/50";
      case "resolved":
        return "bg-green-500/20 text-green-300 border border-green-500/50";
      default:
        return "bg-gray-500/20 text-gray-300 border border-gray-500/50";
    }
  };

  // Priority badge styling
  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-500/20 text-red-300 border border-red-500/50";
    }
    return "bg-purple-500/20 text-purple-300 border border-purple-500/50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1a132f] to-[#2b2250] py-12 px-4 md:px-8 lg:px-12">
      <title>All Issues</title>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-12"
      >
        All Reported Issues
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mb-12"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search issues by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-purple-500/30 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-xl">
            🔍
          </span>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-4 rounded-2xl bg-gray-700 border border-purple-500/30 backdrop-blur-md text-white focus:outline-none focus:border-purple-400 transition"
        >
          <option value="all">All Issues</option>
          <optgroup label="By Category">
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Other">Other</option>
          </optgroup>
          <optgroup label="By Status">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </optgroup>
          <optgroup label="By Priority">
            <option value="High">High Priority</option>
            <option value="Normal">Normal</option>
          </optgroup>
        </select>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedIssues.map((issue, index) => {
              const disabled =
                !user || issue.email === user.email || hasUserUpvoted(issue);
              const isLoading = loadingIds.includes(issue._id);

              // Properly format status text (handles "Resolved", "resolved", etc.)
              const statusText = issue.status
                ? issue.status.charAt(0).toUpperCase() +
                  issue.status.slice(1).toLowerCase().replace("-", " ")
                : "Pending";

              return (
                <motion.div
                  key={issue._id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  exit={{ opacity: 0, scale: 0.9 }}
                  variants={cardVariants}
                  className="relative group"
                >
                  <div className="h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-purple-600/30 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-purple-600/50 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity -z-10" />

                    <div className="relative overflow-hidden">
                      <img
                        src={
                          issue.image ||
                          "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={issue.title || "Issue"}
                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <div className="p-6 relative z-10">
                      <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                        {issue.title || "Untitled Issue"}
                      </h2>

                      <div className="flex flex-wrap gap-3 mb-5">
                        <span
                          className={`px-5 py-2 text-sm font-semibold rounded-full shadow-md ${getStatusStyle(
                            issue.status
                          )}`}
                        >
                          {statusText}
                        </span>

                        <span
                          className={`px-5 py-2 text-sm font-semibold rounded-full shadow-md ${getPriorityStyle(
                            issue.priority
                          )}`}
                        >
                          {issue.priority || "Normal"} Priority
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm mb-2">
                        <span className="text-purple-400 font-medium">
                          Category:
                        </span>{" "}
                        {issue.category || "Uncategorized"}
                      </p>
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        📍 {issue.location || "Location not specified"}
                      </p>

                      <div className="flex justify-between items-center mt-6">
                        <button
                          onClick={() => handleUpvote(issue)}
                          disabled={disabled || isLoading}
                          className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                            disabled
                              ? "bg-gray-600/50 cursor-not-allowed text-gray-400"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-600/50"
                          }`}
                        >
                          {isLoading ? "Upvoting..." : "Upvote"}
                        </button>

                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-300">
                            {issue.upvote || 0}
                          </p>
                          <p className="text-xs text-gray-400">Upvotes</p>
                        </div>

                        <Link
                          to={`/Issus-details/${issue._id}`}
                          className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-600/50 transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {displayedIssues.length > 0 && (
          <div className="flex justify-center items-center mt-12 space-x-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              Previous
            </button>
            <span className="text-white text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              Next
            </button>
          </div>
        )}

        {!displayedIssues.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-gray-400">
              No issues found matching your filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllIssus;
