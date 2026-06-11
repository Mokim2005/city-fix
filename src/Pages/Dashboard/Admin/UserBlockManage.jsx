import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";

const UserBlockManage = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const blockMutation = useMutation({
    mutationFn: async ({ id, blocked }) => {
      const res = await axiosSecure.patch(`/admin/user-block/${id}`, {
        blocked,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "User status changed successfully.",
        timer: 2000,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#fff",
      });
    },
  });

  const handleBlock = async (user, blocked) => {
    const action = blocked ? "Block" : "Unblock";

    const result = await Swal.fire({
      title: `${action} User?`,
      text: `Are you sure you want to ${action.toLowerCase()} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes`,
    });

    if (result.isConfirmed) {
      blockMutation.mutate({ id: user._id, blocked });
    }
  };

  // Pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <Loading />;

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-6 lg:p-10">
      <title>User Block Manage</title>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
      >
        Manage Users ({users.length})
      </motion.h2>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/30"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
               <tr className="bg-gradient-to-r from-green-600/40 to-emerald-600/40 text-left text-xs md:text-sm font-semibold uppercase">
                <th className="px-4 md:px-6 py-4">Name</th>
                <th className="px-4 md:px-6 py-4 hidden sm:table-cell">Email</th>
                <th className="px-4 md:px-6 py-4">Subscription</th>
                <th className="px-4 md:px-6 py-4">Status</th>
                <th className="px-4 md:px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/20">
              <AnimatePresence>
                {paginatedUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    {/* Name */}
                    <td className="px-4 md:px-6 py-4 flex items-center gap-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          className="w-10 h-10 rounded-full border border-white/30"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                          {user.displayName?.charAt(0) || "U"}
                        </div>
                      )}
                      <span>{user.displayName || "N/A"}</span>
                    </td>

                    {/* Email */}
                    <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                      {user.email}
                    </td>

                    {/* Subscription */}
                    <td className="px-4 md:px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.isPremium
                            ? "bg-green-500/30 text-green-300"
                            : "bg-gray-500/30 text-gray-300"
                        }`}
                      >
                        {user.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 md:px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.blocked
                            ? "bg-red-500/30 text-red-300"
                            : "bg-green-500/30 text-green-300"
                        }`}
                      >
                        {user.blocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 md:px-6 py-4 text-center">
                       <motion.button
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         onClick={() =>
                           handleBlock(user, !user.blocked)
                         }
                         disabled={blockMutation.isPending}
                         className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-green-500/30 transition"
                       >
                        {blockMutation.isPending
                          ? "Processing..."
                          : user.blocked
                          ? "Unblock"
                          : "Block"}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div className="flex flex-wrap justify-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
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
        </motion.div>
      )}
    </div>
  );
};

export default UserBlockManage;