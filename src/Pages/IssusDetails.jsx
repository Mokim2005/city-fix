import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
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

  const cardRef = useRef(null);

  useEffect(() => {
    axiosSecure.get(`/issus/${id}`).then((res) => {
      setIssue(res.data);
    });
  }, [id, axiosSecure]);

  // GSAP ENTRY ANIMATION
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, [issue]);

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
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">

        {/* MAIN CARD */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
        >

          {/* IMAGE */}
          <div className="relative h-[320px] md:h-[450px] overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src={issue.image}
              className="w-full h-full object-cover"
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
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xl hover:bg-white/10"
                >
                  <p className="text-purple-300 text-sm">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* TIMELINE */}
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
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[34px] top-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg group-hover:scale-125 transition" />

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <p className="text-white text-lg font-medium">
                          {t.text}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          {new Date(t.date).toLocaleString()}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}

                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4">
              {isOwner && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleDelete}
                  className="cityfix-btn cityfix-btn-ghost px-6 py-3 rounded-xl"
                >
                  Delete
                </motion.button>
              )}

              {isPriority && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleBoost}
                  className="cityfix-btn cityfix-btn-primary px-6 py-3 rounded-xl"
                >
                  Boost Priority
                </motion.button>
              )}
            </div>

            <Link
              to="/all-issus"
              className="text-purple-300 hover:text-white transition"
            >
              ← Back to Issues
            </Link>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IssueDetails;