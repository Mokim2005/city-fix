import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Loading from "../Components/Loading"; // Optional spinner

const LatestResolvedIssues = () => {
  const axiosSecure = UseAxiosSecure();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/latest-resolved?limit=6")
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
        Latest Resolved Issues
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="backdrop-blur-xl bg-white/10 border border-purple-600/30 
              p-5 rounded-2xl shadow-lg hover:shadow-purple-700/40 transition duration-300"
          >
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-48 object-cover rounded-xl border border-purple-500/30"
            />
            <h3 className="text-2xl font-semibold text-purple-300 mt-4">
              {issue.title}
            </h3>
            <p className="text-gray-300 mt-2">📍 {issue.location}</p>

            <Link
              to={`/Issus-details/${issue._id}`}
              className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestResolvedIssues;
