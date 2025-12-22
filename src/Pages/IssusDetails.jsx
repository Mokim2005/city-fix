import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UserAuth from "../Hooks/UserAuth";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const IssueDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/issus/${id}`).then((res) => {
      setIssue(res.data);
    });
  }, [id, axiosSecure]);

  if (!issue) {
    return Loading
  }

  const isOwner = issue.email === user?.email;
  const isPriority = issue.priority === "Normal";

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a855f7",
      cancelButtonColor: "#4b5563",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issus/${id}`).then(() => {
          Swal.fire("Deleted!", "Issue removed successfully.", "success");
          navigate("/all-issus");
        });
      }
    });
  };

  const handleBoost = async () => {
    Swal.fire({
      title: "Boost Priority?",
      text: "Pay 100 BDT to make this High Priority",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#a855f7",
      confirmButtonText: "Pay 100 BDT",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/create-checkout-session", {
          email: user.email,
          issueId: issue._id,
          purpose: "boost",
        });
        window.location.href = res.data.url;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1a132f] to-[#2b2250] py-12 px-4 md:px-8">
      <title>Issues Details</title>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <div className="relative bg-gradient-to-br from-[#2b2250]/60 via-[#251d45]/70 to-[#1e1638]/80 backdrop-blur-2xl rounded-3xl overflow-hidden border border-purple-700/40 shadow-2xl">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10" />
          {/* Outer floating glow */}
          <div className="absolute -inset-2 bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl -z-10 opacity-70" />

          {/* Hero Image with Overlay Title */}
          <div className="relative h-80 md:h-96 overflow-hidden">
            <img
              src={
                issue.image ||
                "https://via.placeholder.com/1200x600?text=No+Image"
              }
              alt={issue.title}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1f]/90 via-[#1a132f]/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl leading-tight"
              >
                {issue.title}
              </motion.h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 p-6 md:p-10 lg:p-12">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-200 text-base sm:text-xl md:text-[15] text-[10px] leading-relaxed max-w-4xl mb-10 md:mb-12"
            >
              {issue.description || "No description available."}
            </motion.p>

            {/* Info Cards Grid - Improved for Responsiveness */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-10 md:mb-12">
              {[
                { label: "Category", value: issue.category || "N/A" },
                { label: "Location", value: issue.location || "Not specified" },
                {
                  label: "Status",
                  value:
                    issue.status?.charAt(0).toUpperCase() +
                      issue.status?.slice(1) || "Pending",
                },
                { label: "Priority", value: issue.priority || "Normal" },
                { label: "Upvotes", value: issue.upvote || 0 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="bg-gradient-to-br from-[#2b2250]/50 to-[#1e1638]/60 backdrop-blur-xl rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-700/30 text-center shadow-inner flex flex-col justify-center min-w-0"
                >
                  <p className="text-purple-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1 truncate">
                    {item.label}
                  </p>
                  <p
                    title={item.value}
                    className="text-sm sm:text-lg lg:text-xl font-bold text-white truncate px-1"
                  >
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Timeline */}
            {issue.timeline && issue.timeline.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-10 md:mb-12"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 md:mb-8">
                  Update Timeline
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {issue.timeline.map((t, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.15 }}
                      className="flex gap-4 sm:gap-5 bg-gradient-to-r from-[#2b2250]/40 to-[#1e1638]/50 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-purple-700/30"
                    >
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-100 text-base sm:text-lg font-medium">
                          {t.text}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 mt-2">
                          {new Date(t.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start"
            >
              {isOwner && issue.status === "pending" && (
                <Link
                  to={`/edit-issue/${issue._id}`}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-purple-600/50 transition-all duration-300"
                >
                  ✏️ Edit Issue
                </Link>
              )}

              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-gray-800/50 transition-all duration-300"
                >
                  🗑️ Delete Issue
                </button>
              )}

              {isPriority && (
                <button
                  onClick={handleBoost}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-purple-500/60 transition-all duration-300 flex items-center gap-2 sm:gap-3"
                >
                  ⚡ Boost Priority (100 BDT)
                </button>
              )}
            </motion.div>

            {/* Back Button */}
            <div className="mt-10 md:mt-12 text-center">
              <Link
                to="/all-issus"
                className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 text-base sm:text-lg font-medium transition"
              >
                ← Back to All Issues
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IssueDetails;
