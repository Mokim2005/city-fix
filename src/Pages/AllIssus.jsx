import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const AllIssus = () => {
  const axiosSecure = UseAxiosSecure();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/issus")
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  const handleUpvote = async (id) => {
    try {
      const res = await axiosSecure.patch(`/issus/upvote/${id}`);
      if (res.data.success) {
        setIssues((prev) =>
          prev.map((i) => (i._id === id ? { ...i, upvote: i.upvote + 1 } : i))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a132f] to-[#2b2250] py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-purple-400 mb-10">
        All Reported Issues
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="backdrop-blur-xl bg-white/10 border border-purple-600/30 
            p-5 rounded-2xl shadow-lg hover:shadow-purple-700/40 transition duration-300"
          >
            {/* Image */}
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-48 object-cover rounded-xl border border-purple-500/30"
            />

            {/* Title */}
            <h2 className="text-2xl font-semibold text-purple-300 mt-4">
              {issue.title}
            </h2>

            {/* Category */}
            <p className="text-gray-300 mt-1">
              <span className="font-semibold text-purple-400">Category:</span>{" "}
              {issue.category}
            </p>

            {/* Status Badge */}
            <span
              className={`inline-block px-3 py-1 text-white rounded-lg mt-3
              ${
                issue.status?.toLowerCase() === "pending"
                  ? "bg-yellow-500"
                  : issue.status?.toLowerCase() === "resolved"
                  ? "bg-green-600"
                  : "bg-blue-600"
              }`}
            >
              {(issue.status || "Unknown").toUpperCase()}
            </span>

            {/* Priority Badge */}
            <span
              className={`inline-block px-3 py-1 rounded-lg ml-2 mt-3
              ${
                issue.priority?.toLowerCase() === "high"
                  ? "bg-red-600 text-white"
                  : "bg-gray-400 text-black"
              }`}
            >
              {issue.priority || "Normal"}
            </span>

            {/* Location */}
            <p className="mt-3 text-sm text-gray-300">📍 {issue.location}</p>

            {/* Upvote + View */}
            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => handleUpvote(issue._id)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg 
                hover:bg-purple-700 shadow-md hover:shadow-purple-600/40 transition"
              >
                👍 Upvote
              </button>

              <p className="text-purple-300 font-semibold">
                Total: {issue.upvote || 0}
              </p>

              <Link
                to={`/Issus-details/${issue._id}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg 
                hover:bg-green-700 shadow-md transition"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIssus;
