import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UserAuth from "../Hooks/UserAuth";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import { useQuery } from "@tanstack/react-query";

gsap.registerPlugin(ScrollTrigger);

const AllIssus = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loadingIds, setLoadingIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

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

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      }
    });
  }, [currentPage, filter, search]);

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
        return i.status?.toLowerCase() === filter;
      }
      if (["High", "Normal"].includes(filter)) {
        return i.priority === filter;
      }
      return true;
    });

  const itemsPerPage = 9;
  const totalPages = Math.ceil(displayedIssues.length / itemsPerPage);
  const paginatedIssues = displayedIssues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-500/20 text-red-300 border border-red-500/50";
    }
    return "bg-purple-500/20 text-purple-300 border border-purple-500/50";
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://www.squareyards.com/blog/wp-content/uploads/2023/12/surat.jpg')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-12"
    >
      <title>All Issues</title>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl px-8 py-6 inline-block shadow-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              All Reported Issues
            </h1>
            <p className="text-gray-300 text-base sm:text-lg">
              Browse and track all city issues reported by citizens
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="🔍 Search issues by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 min-w-[200px]"
          >
            <option value="all" className="bg-gray-900">
              All Issues
            </option>
            <optgroup label="By Category" className="bg-gray-900">
              <option value="Road" className="bg-gray-900">
                🛣️ Road
              </option>
              <option value="Electricity" className="bg-gray-900">
                ⚡ Electricity
              </option>
              <option value="Water" className="bg-gray-900">
                💧 Water
              </option>
              <option value="Garbage" className="bg-gray-900">
                🗑️ Garbage
              </option>
              <option value="Sanitation" className="bg-gray-900">
                🚽 Sanitation
              </option>
              <option value="Other" className="bg-gray-900">
                📋 Other
              </option>
            </optgroup>
            <optgroup label="By Status" className="bg-gray-900">
              <option value="pending" className="bg-gray-900">
                ⏳ Pending
              </option>
              <option value="in-progress" className="bg-gray-900">
                🔄 In Progress
              </option>
              <option value="resolved" className="bg-gray-900">
                ✅ Resolved
              </option>
            </optgroup>
            <optgroup label="By Priority" className="bg-gray-900">
              <option value="High" className="bg-gray-900">
                🔴 High Priority
              </option>
              <option value="Normal" className="bg-gray-900">
                🟢 Normal
              </option>
            </optgroup>
          </select>
        </motion.div>

        {/* Issues Grid */}
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedIssues.map((issue, index) => {
              const disabled =
                !user || issue.email === user.email || hasUserUpvoted(issue);
              const isLoading = loadingIds.includes(issue._id);

              const statusText = issue.status
                ? issue.status.charAt(0).toUpperCase() +
                  issue.status.slice(1).toLowerCase().replace("-", " ")
                : "Pending";

              return (
                <motion.div
                  key={issue._id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                  {/* Glassy Card */}
                  <div className="h-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/50 hover:border-purple-500/50 transition-all duration-500">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10" />

                    {/* Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={
                          issue.image ||
                          "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={issue.title || "Issue"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 relative z-10">
                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                        {issue.title || "Untitled Issue"}
                      </h2>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                            issue.status
                          )}`}
                        >
                          {statusText}
                        </span>

                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(
                            issue.priority
                          )}`}
                        >
                          {issue.priority || "Normal"}
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm mb-2">
                        <span className="text-purple-400 font-medium">
                          Category:
                        </span>{" "}
                        {issue.category || "Uncategorized"}
                      </p>
                      <p className="text-gray-400 text-sm flex items-center gap-2 mb-5">
                        📍 {issue.location || "Location not specified"}
                      </p>

                      {/* Actions */}
                      <div className="flex justify-between items-center gap-3">
                        <motion.button
                          whileHover={{ scale: disabled ? 1 : 1.05 }}
                          whileTap={{ scale: disabled ? 1 : 0.95 }}
                          onClick={() => handleUpvote(issue)}
                          disabled={disabled || isLoading}
                          className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                            disabled
                              ? "bg-gray-600/50 cursor-not-allowed text-gray-400"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-600/50"
                          }`}
                        >
                          {isLoading ? "..." : `👍 ${issue.upvote || 0}`}
                        </motion.button>

                        <Link
                          to={`/Issus-details/${issue._id}`}
                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-green-600/50 transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {/* Pagination */}
        {displayedIssues.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center mt-12 gap-4 backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl px-6 py-4 inline-flex mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
            >
              ← Previous
            </motion.button>
            <span className="text-white text-lg font-medium px-4">
              {currentPage} / {totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
            >
              Next →
            </motion.button>
          </motion.div>
        )}

        {/* No Results */}
        {!displayedIssues.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl"
          >
            <p className="text-2xl text-gray-300 mb-2">😔 No issues found</p>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllIssus;
