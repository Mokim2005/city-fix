import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";

const UsersManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchText, setSearchText] = useState("");

  // 👉 pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      text: "Make this user Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire(
              "Success!",
              `${user.displayName} is now Admin`,
              "success",
            );
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: "Remove Admin role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then(() => {
          refetch();
          Swal.fire(
            "Removed!",
            `${user.displayName} is no longer admin`,
            "success",
          );
        });
      }
    });
  };

  // 👉 Pagination Logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-6 lg:p-10">
      <title>User Management</title>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
      >
        Users Management
      </motion.h2>

      <p className="text-center text-xl mb-8 text-white/80">
        Total Users: <span className="font-bold">{users.length}</span>
      </p>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="search"
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600/40 to-purple-600/40 text-xs md:text-sm uppercase">
                <th className="px-4 md:px-6 py-4">#</th>
                <th className="px-4 md:px-6 py-4">User</th>
                <th className="px-4 md:px-6 py-4 hidden sm:table-cell">
                  Email
                </th>
                <th className="px-4 md:px-6 py-4">Role</th>
                <th className="px-4 md:px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/20">
              <AnimatePresence>
                {paginatedUsers.map((user, i) => (
                  <motion.tr
                    key={user._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <td className="px-4 md:px-6 py-4 text-center">
                      {startIndex + i + 1}
                    </td>

                    <td className="px-4 md:px-6 py-4 flex items-center gap-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          className="w-10 h-10 rounded-full border border-white/30"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                          {user.displayName?.charAt(0) || "U"}
                        </div>
                      )}
                      <div>
                        <div>{user.displayName}</div>
                        <div className="text-xs text-white/60">
                          {user._id.slice(-6)}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                      {user.email}
                    </td>

                    <td className="px-4 md:px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-purple-500/30 text-purple-300"
                            : "bg-gray-500/30 text-gray-300"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    <td className="px-4 md:px-6 py-4 text-center">
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmin(user)}
                          className="bg-red-500 p-3 rounded-lg"
                        >
                          <FiShieldOff />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="bg-green-500 p-3 rounded-lg"
                        >
                          <FaUserShield />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
