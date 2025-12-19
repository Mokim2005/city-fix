import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const UserBlockManage = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

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
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const handleBlock = (user, blocked) => {
    const action = blocked ? "Block" : "Unblock";
    if (window.confirm(`${action} this user?`)) {
      blockMutation.mutate({ id: user._id, blocked });
    }
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
        className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
      >
        Manage Users
      </motion.h2>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-left text-sm font-semibold uppercase tracking-wider">
                <th className="px-8 py-6">Name</th>
                <th className="px-8 py-6">Email</th>
                <th className="px-8 py-6">Subscription</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <AnimatePresence>
                {users.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.6)" }}
                    className="transition-colors"
                  >
                    <td className="px-8 py-6 flex items-center space-x-4">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg font-bold">
                          {user.displayName?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <span className="font-medium">
                        {user.displayName || "N/A"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-gray-300">{user.email}</td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-xs font-bold ${
                          user.isPremium
                            ? "bg-purple-600/30 text-purple-300"
                            : "bg-gray-600/30 text-gray-300"
                        }`}
                      >
                        {user.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-xs font-bold ${
                          user.blocked
                            ? "bg-red-600/40 text-red-300"
                            : "bg-green-600/40 text-green-300"
                        }`}
                      >
                        {user.blocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBlock(user, !user.blocked)}
                        disabled={blockMutation.isPending}
                        className={`px-8 py-3 rounded-lg font-medium shadow-lg transition ${
                          user.blocked
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-green-500/30"
                            : "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-red-500/30"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
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
    </div>
  );
};

export default UserBlockManage;
