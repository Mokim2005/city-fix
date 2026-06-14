import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const UserShow = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users-count"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return null;
  }

  const totalStaff = users.filter(
    (user) => (user?.role || "user") === "staff"
  ).length;

  const totalUsers = users.filter(
    (user) => (user?.role || "user") === "user"
  ).length;

  return (
    <div className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-10"
      >
        User Statistics
      </motion.h2>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl shadow-lg p-8 text-center border">
          <h3 className="text-xl font-semibold mb-3">Total Staff</h3>
          <p className="text-5xl font-bold">{totalStaff}</p>
        </div>

        <div className="rounded-xl shadow-lg p-8 text-center border">
          <h3 className="text-xl font-semibold mb-3">Total Users</h3>
          <p className="text-5xl font-bold">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default UserShow;