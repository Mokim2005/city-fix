import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  // ----------------------------
  // Fetch Issues
  // ----------------------------
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

  // helper: check already upvoted
  const hasUserUpvoted = (issue) => {
    if (!user || !issue?.upvotedUsers) return false;
    return issue.upvotedUsers.includes(user.email);
  };

  // ----------------------------
  // Handle Upvote (Fixed)
  // ----------------------------
  const handleUpvote = async (issue) => {
    if (!user) return navigate("/login");

    if (issue.email === user.email) {
      return Swal.fire("Oops!", "You cannot upvote your own issue.", "warning");
    }

    if (hasUserUpvoted(issue)) {
      return Swal.fire("Oops!", "You already upvoted this issue.", "warning");
    }

    // UI Optimistic Update + loader
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
        email: user.email, // FIXED
      });

      if (!res.data?.success) {
        // rollback if backend failed
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
      // rollback UI
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

  // ---------------------------------
  // Skeleton Loading UI
  // ---------------------------------
  if (loading) {
    return <Loading></Loading>;
  }

  // ----------------------------
  // Filter + Search Logic
  // ----------------------------
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a132f] to-[#2b2250] py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-purple-400 mb-6">
        All Reported Issues
      </h1>

      {/* Search + Filter */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 mb-8 justify-between">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-lg w-full md:w-1/3 bg-white/10 border border-purple-500 text-white placeholder-gray-300 focus:outline-none"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 rounded-lg bg-white/10 border border-purple-500 text-white w-full md:w-1/3"
        >
          <option value="all">Filter: All</option>

          <optgroup label="Category">
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Other">Other</option>
          </optgroup>

          <optgroup label="Status">
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="resolved">Resolved</option>
          </optgroup>

          <optgroup label="Priority">
            <option value="High">High</option>
            <option value="Normal">Normal</option>
          </optgroup>
        </select>
      </div>

      {/* Issues Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedIssues.map((issue) => {
          const disabled =
            !user || issue.email === user.email || hasUserUpvoted(issue);
          const isLoading = loadingIds.includes(issue._id);

          return (
            <div
              key={issue._id}
              className="backdrop-blur-xl bg-white/10 border border-purple-600/30 
              p-5 rounded-2xl shadow-lg hover:shadow-purple-700/40 transition"
            >
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-48 object-cover rounded-xl border border-purple-500/30"
              />

              <h2 className="text-2xl font-semibold text-purple-300 mt-4">
                {issue.title}
              </h2>

              <p className="text-gray-300 mt-1">
                <span className="font-semibold text-purple-400">Category:</span>{" "}
                {issue.category}
              </p>

              <span
                className={`inline-block px-3 py-1 text-white rounded-lg mt-3
                ${
                  issue.status === "pending"
                    ? "bg-yellow-500"
                    : issue.status === "resolved"
                    ? "bg-green-600"
                    : "bg-blue-600"
                }`}
              >
                {issue.status}
              </span>

              <span
                className={`inline-block px-3 py-1 rounded-lg ml-2 mt-3
                ${
                  issue.priority === "High"
                    ? "bg-red-600 text-white"
                    : "bg-gray-400 text-black"
                }`}
              >
                {issue.priority || "Normal"}
              </span>

              <p className="mt-3 text-sm text-gray-300">📍 {issue.location}</p>

              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={() => handleUpvote(issue)}
                  disabled={disabled || isLoading}
                  className={`px-4 py-2 rounded-lg shadow-md transition ${
                    disabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {isLoading ? "..." : "👍 Upvote"}
                </button>

                <p className="text-purple-300 font-semibold">
                  Total: {issue.upvote || 0}
                </p>

                <Link
                  to={`/Issus-details/${issue._id}`}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
                >
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllIssus;
