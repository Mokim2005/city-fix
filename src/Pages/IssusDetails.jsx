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

  if (!issue) return <Loading />;

  const isOwner = issue.email === user?.email;
  const isPriority = issue.priority === "Normal";

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
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
    const res = await axiosSecure.post("/create-checkout-session", {
      email: user.email,
      issueId: issue._id,
      purpose: "boost",
    });
    window.location.href = res.data.url;
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1527690499469-ef2eff9c6735?fm=jpg&q=60&w=3000&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >

          {/* IMAGE */}
          <div className="relative h-[320px] md:h-[450px]">
            <img
              src={issue.image}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <h1 className="absolute bottom-6 left-6 text-4xl md:text-6xl font-bold">
              {issue.title}
            </h1>
          </div>

          {/* CONTENT */}
          <div className="p-6 md:p-10 space-y-10">

            <p className="text-gray-300 text-lg leading-relaxed">
              {issue.description}
            </p>

            {/* INFO CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Category", value: issue.category },
                { label: "Location", value: issue.location },
                { label: "Status", value: issue.status },
                { label: "Priority", value: issue.priority },
                { label: "Upvotes", value: issue.upvote },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:scale-105 transition"
                >
                  <p className="text-purple-300 text-sm">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* 🔥 TIMELINE (PRO STEP DESIGN) */}
            {issue.timeline?.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Update Timeline
                </h2>

                <div className="relative border-l border-purple-500/40 pl-6 space-y-8">

                  {issue.timeline.map((t, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Dot */}
                      <div className="absolute -left-[34px] top-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg" />

                      {/* Card */}
                      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 hover:bg-white/10 transition">
                        <p className="text-white text-lg font-medium">
                          {t.text}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          {new Date(t.date).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4">
              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-gray-800 hover:bg-black rounded-xl"
                >
                  Delete
                </button>
              )}

              {isPriority && (
                <button
                  onClick={handleBoost}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                >
                  Boost Priority
                </button>
              )}
            </div>

            <Link to="/all-issus" className="text-purple-300">
              ← Back to Issues
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IssueDetails;