import React from "react";
import { FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom"; // react-router-dom থেকে import করো (v6 এর জন্য)
import { motion } from "framer-motion";

const PaymentCanceld = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-4">
     <title>Payment Cancelled</title>
      {/* Optional subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20" />

      <motion.div
        className="relative bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center border border-gray-800"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Cancel Icon with animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-28 h-28 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <FiXCircle className="w-20 h-20 text-red-500" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Payment Canceled
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl text-gray-300 mb-10 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          No worries! Your payment was not processed. You can try again whenever
          you're ready.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link to="/dashboard/payment">
            <button className="px-10 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-red-700 hover:to-pink-700 transition shadow-xl transform hover:scale-105">
              Try Payment Again
            </button>
          </Link>

          <Link to="/">
            <button className="px-10 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg rounded-xl transition shadow-xl transform hover:scale-105">
              Back to Home
            </button>
          </Link>
        </motion.div>

        {/* Small footer note */}
        <motion.p
          className="text-sm text-gray-500 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          If you encountered an issue, contact support.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PaymentCanceld;
