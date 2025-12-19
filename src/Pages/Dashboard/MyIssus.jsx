import React, { useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UserAuth from "../../Hooks/UserAuth";
import { FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyIssus = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  const [filter, setFilter] = useState("all");
  const [editData, setEditData] = useState(null);

  const {
    data: reports = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issus?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      background: "#1a132f",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issus/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Issue removed successfully",
              icon: "success",
              background: "#1a132f",
              color: "#fff",
            });
          }
        });
      }
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      category: form.category.value,
    };

    axiosSecure.patch(`/issus/${editData._id}`, updated).then(() => {
      Swal.fire({
        title: "Updated!",
        text: "Issue updated successfully!",
        icon: "success",
        background: "#1a132f",
        color: "#fff",
      });
      setEditData(null);
      refetch();
    });
  };

  const filteredReports =
    filter === "all"
      ? reports
      : reports.filter(
          (item) => item.status.toLowerCase().replace(" ", "-") === filter
        );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-gray-100 p-8"
    >
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://thumbs.dreamstime.com/b/abstract-futuristic-background-glowing-blue-pink-lines-digital-data-financial-charts-network-connections-perfect-tech-384785084.jpg"
          alt="futuristic background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-indigo-900/70 to-purple-900/80" />
      </div>

      {/* Floating Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
        >
          My Issues ({filteredReports.length})
        </motion.h1>

        {/* Filters with glow effect */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {["all", "pending", "in-progress", "resolved"].map((status, idx) => (
            <motion.button
              key={status}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-full font-medium transition-all 
                ${
                  filter === status
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-gray-800/50 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-purple-500"
                }`}
            >
              {status.replace("-", " ").toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Table with modern dark UI */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden"
        >
          {isLoading ? (
            <div className="p-20 text-center">
              <div className="loading loading-spinner loading-lg text-purple-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-200">
                    <th className="pl-6">#</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th className="pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report, i) => (
                    <motion.tr
                      key={report._id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-700/50 hover:bg-white/5 transition"
                    >
                      <td className="pl-6">{i + 1}</td>
                      <td className="font-medium">{report.title}</td>
                      <td>{report.location}</td>
                      <td>
                        <span
                          className={`badge badge-lg 
                          ${
                            report.status === "pending"
                              ? "badge-warning"
                              : report.status.includes("progress")
                              ? "badge-info"
                              : "badge-success"
                          }`}
                        >
                          {report.status.replace("-", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="pr-6">
                        <div className="flex justify-end gap-3">
                          {report.status === "pending" && (
                            <motion.button
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              onClick={() => setEditData(report)}
                              className="btn btn-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 shadow-lg"
                            >
                              <FaEdit />
                            </motion.button>
                          )}
                          <Link to={`/Issus-details/${report._id}`}>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              className="btn btn-sm bg-gradient-to-r from-green-600 to-teal-600 text-white border-0 shadow-lg"
                            >
                              <FcViewDetails size={18} />
                            </motion.button>
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            onClick={() => handleDelete(report._id)}
                            className="btn btn-sm bg-gradient-to-r from-red-600 to-pink-600 text-white border-0 shadow-lg"
                          >
                            <MdDelete />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit Modal – Futuristic Glassmorphism Style */}
      {editData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl w-full max-w-lg border border-purple-500/50 shadow-2xl shadow-purple-600/30"
          >
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Edit Issue
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              <input
                name="title"
                defaultValue={editData.title}
                className="input input-bordered w-full bg-gray-800/50 border-purple-500/50 focus:border-purple-400 text-white"
                placeholder="Title"
                required
              />
              <textarea
                name="description"
                defaultValue={editData.description}
                className="textarea textarea-bordered w-full bg-gray-800/50 border-purple-500/50 focus:border-purple-400 text-white h-32"
                placeholder="Description"
                required
              />
              <input
                name="location"
                defaultValue={editData.location}
                className="input input-bordered w-full bg-gray-800/50 border-purple-500/50 focus:border-purple-400 text-white"
                placeholder="Location"
                required
              />
              <input
                name="category"
                defaultValue={editData.category}
                className="input input-bordered w-full bg-gray-800/50 border-purple-500/50 focus:border-purple-400 text-white"
                placeholder="Category"
                required
              />

              <div className="flex justify-end gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  onClick={() => setEditData(null)}
                  className="px-6 py-3 bg-gray-700/70 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)",
                  }}
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold shadow-lg"
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyIssus;
