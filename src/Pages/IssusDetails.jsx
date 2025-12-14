import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UserAuth from "../Hooks/UserAuth";
import Swal from "sweetalert2";

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

  if (!issue) return <p className="text-center text-white">Loading...</p>;

  const isOwner = issue.email === user?.email;
  const isPriority = issue.priority == "Normal";

  // 🗑 Delete Issue
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issus/${id}`).then(() => {
          Swal.fire("Deleted!", "Your issue has been deleted.", "success");
          navigate("/all-issus");
        });
      }
    });
  };

  // 🚀 Boost Priority (Payment Simulation)
  const handleBoost = async () => {
    Swal.fire({
      title: "Boost Priority?",
      text: "You need to pay 100 BDT",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay 100 BDT",
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
    <div className="min-h-screen bg-gradient-to-b from-[#1a132f] to-[#2b2250] py-12 px-4">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-purple-500/30 shadow-2xl">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-72 object-cover rounded-xl border border-purple-500/30"
        />

        <h1 className="text-4xl font-bold text-purple-300 mt-6">
          {issue.title}
        </h1>

        <p className="text-gray-300 mt-4 text-lg">{issue.description}</p>

        {/* Meta Info */}
        <div className="mt-6 space-y-2 text-gray-300 text-lg">
          <p>
            <strong>Category:</strong> {issue.category}
          </p>
          <p>
            <strong>Location:</strong> {issue.location}
          </p>
          <p>
            <strong>Status:</strong> {issue.status}
          </p>
          <p>
            <strong>Priority:</strong> {issue.priority}
          </p>
          <p>
            <strong>Upvotes:</strong> {issue.upvote}
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-3">Timeline</h2>
          <div className="space-y-3">
            {issue.timeline?.map((t, index) => (
              <div
                key={index}
                className="bg-white/10 p-3 rounded-lg border border-purple-500/20"
              >
                <p className="text-gray-200">{t.text}</p>
                <p className="text-sm text-gray-400">
                  {new Date(t.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-10">
          {/* Edit */}
          {isOwner && issue.status === "pending" && (
            <Link
              to={`/edit-issue/${issue._id}`}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </Link>
          )}
          {/* Delete */}
          {isOwner && (
            <button
              onClick={handleDelete}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          )}
          Boost
          {/* console.log(object) */}
          {isPriority && (
            <button
              onClick={handleBoost}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Boost Priority (100 BDT)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
