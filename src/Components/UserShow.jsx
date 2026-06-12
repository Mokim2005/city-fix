import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Loading from "./Loading";

const UserShow = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-400 py-10">
        <p>Failed to load user statistics.</p>
        <p className="text-sm text-white/60 mt-2">{error?.message}</p>
      </div>
    );
  }

  const totalStaff = users.filter(
    (user) => (user?.role || "user") === "staff"
  ).length;

  const totalUsers = users.filter(
    (user) => (user?.role || "user") === "user"
  ).length;

  return (
    <div className="min-h-screen text-white p-4 md:p-6 lg:p-10">
      <title>User Statistics</title>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
      >
        User Statistics
      </motion.h2>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white/80 mb-3">
            Total Staff
          </h3>
          <p className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {totalStaff}
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white/80 mb-3">
            Total Users
          </h3>
          <p className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {totalUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserShow;
