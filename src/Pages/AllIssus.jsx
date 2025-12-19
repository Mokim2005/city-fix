import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UserAuth from "../Hooks/UserAuth";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const AllIssus = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingIds, setLoadingIds] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/issus")
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

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
    setIssues((prev) =>
      prev.map((i) =>
        i._id === issue._id
          ? {
              ...i,
              upvote: (i.upvote || 0) + 1,
              upvotedUsers: [...(i.upvotedUsers || []), user.email],
            }
          : i
      )
    );

    try {
      const res = await axiosSecure.patch(`/issus/upvote/${issue._id}`, {
        email: user.email,
      });

      if (!res.data?.success) {
        setIssues((prev) =>
          prev.map((i) =>
            i._id === issue._id
              ? {
                  ...i,
                  upvote: Math.max((i.upvote || 1) - 1, 0),
                  upvotedUsers: (i.upvotedUsers || []).filter(
                    (e) => e !== user.email
                  ),
                }
              : i
          )
        );
        Swal.fire("Error", res.data?.message || "Upvote failed", "error");
      }
    } catch (err) {
      setIssues((prev) =>
        prev.map((i) =>
          i._id === issue._id
            ? {
                ...i,
                upvote: Math.max((i.upvote || 1) - 1, 0),
                upvotedUsers: (i.upvotedUsers || []).filter(
                  (e) => e !== user.email
                ),
              }
            : i
        )
      );
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
        return i.status === filter;
      }
      if (["High", "Normal"].includes(filter)) {
        return i.priority === filter;
      }
      return true;
    });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1a132f] to-[#2b2250] py-12 px-4 md:px-8 lg:px-12">
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
          className="p-4 rounded-2xl bg-white/5 border border-purple-500/30 backdrop-blur-md text-white focus:outline-none focus:border-purple-400 transition"
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
            {displayedIssues.map((issue, index) => {
              const disabled =
                !user || issue.email === user.email || hasUserUpvoted(issue);
              const isLoading = loadingIds.includes(issue._id);

              // Safe fallback for status
              const statusText = issue.status
                ? issue.status.charAt(0).toUpperCase() + issue.status.slice(1)
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

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                            issue.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                              : issue.status === "resolved"
                              ? "bg-green-500/20 text-green-300 border border-green-500/40"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                          }`}
                        >
                          {statusText}
                        </span>

                        <span
                          className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                            issue.priority === "High"
                              ? "bg-red-500/20 text-red-300 border border-red-500/40"
                              : "bg-gray-500/20 text-gray-300 border border-gray-500/40"
                          }`}
                        >
                          {issue.priority || "Normal"} Priority
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm mb-2">
                        <span className="text-purple-400">Category:</span>{" "}
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
                          {isLoading ? "Upvoting..." : "👍 Upvote"}
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
