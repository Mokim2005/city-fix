import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const UsersManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} is now an Admin!`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: "Remove admin privileges from this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then(() => {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} is no longer an Admin`,
            showConfirmButton: false,
            timer: 2500,
          });
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading users...
      </div>
    );
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-10">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
      >
        Users Management
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-2xl mb-10 text-gray-300"
      >
        Total Users:{" "}
        <span className="font-bold text-indigo-400">{users.length}</span>
      </motion.p>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-md mx-auto mb-12"
      >
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search users by name or email..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-left text-sm font-semibold uppercase tracking-wider">
                <th className="px-8 py-6">No</th>
                <th className="px-8 py-6">User</th>
                <th className="px-8 py-6">Email</th>
                <th className="px-8 py-6">Role</th>
                <th className="px-8 py-6 text-center">Admin Action</th>
                <th className="px-8 py-6 text-center">Other Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <AnimatePresence>
                {users.map((user, i) => (
                  <motion.tr
                    key={user._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.6)" }}
                    className="transition-colors"
                  >
                    <td className="px-8 py-6 text-center font-medium">
                      {i + 1}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded-full ring-2 ring-offset-4 ring-offset-gray-800 ring-indigo-500">
                            {user.photoURL ? (
                              <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                                {user.displayName?.charAt(0).toUpperCase() ||
                                  "U"}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">
                            {user.displayName || "N/A"}
                          </div>
                          <div className="text-sm text-gray-400">
                            User ID: {user._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-300">{user.email}</td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${
                          user.role === "admin"
                            ? "bg-purple-600/30 text-purple-300"
                            : "bg-gray-600/30 text-gray-300"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      {user.role === "admin" ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemoveAdmin(user)}
                          className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-4 rounded-xl shadow-lg hover:shadow-red-500/30 transition"
                          title="Remove Admin"
                        >
                          <FiShieldOff size={22} />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMakeAdmin(user)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl shadow-lg hover:shadow-green-500/30 transition"
                          title="Make Admin"
                        >
                          <FaUserShield size={22} />
                        </motion.button>
                      )}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition">
                        More Actions
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default UsersManagement;
