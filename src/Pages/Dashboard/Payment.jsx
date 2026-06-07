import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UserAuth from "../../Hooks/UserAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Payment = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  const [isProcessing, setIsProcessing] = useState(false);
  const cardRef = useRef(null);

  // GSAP floating animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  const { data: currentUser = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { isLoading: issuesLoading } = useQuery({
    queryKey: ["issus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issus");
      return res.data;
    },
  });

  if (issuesLoading || userLoading) {
    return null;
  }

  const handlePayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      const paymentInfo = {
        email: user.email,
        name: user.displayName || "User",
        amount: 1000,
        plan: "premium",
        purpose: "subscribe",
      };

      await axiosSecure.post("/subscribe", paymentInfo);

      const sessionRes = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (sessionRes.data.url) {
        window.location.href = sessionRes.data.url;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed!",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        background: "#111827",
        color: "#fff",
      });

      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Background glow effects */}
      <div className="absolute w-72 h-72 bg-green-500/20 blur-3xl rounded-full top-10 left-10" />
      <div className="absolute w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full bottom-10 right-10" />

      {/* Main Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative
          w-full max-w-xl
          rounded-3xl
          backdrop-blur-2xl
          bg-white/10
          border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          p-10
          text-white
          overflow-hidden
        "
      >
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-semibold backdrop-blur-md">
            ⭐ Premium Plan
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-2">
          Upgrade to Premium
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Unlock exclusive features instantly
        </p>

        {/* Price */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-6xl font-black bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            ৳1000
          </h2>
          <p className="text-gray-400 mt-2">One-time payment</p>
        </motion.div>

        {/* Already premium */}
        {currentUser.isPremium ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-3">👑</div>
            <p className="text-2xl text-green-400 font-bold">
              Premium Activated
            </p>
            <p className="text-gray-300 mt-2">
              Enjoy all premium features
            </p>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(34,197,94,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
            disabled={isProcessing}
            className={`
              relative
              w-full
              py-4
              rounded-2xl
              font-bold
              text-lg
              overflow-hidden
              transition-all
              ${
                isProcessing
                  ? "bg-gray-600 cursor-not-allowed opacity-70"
                  : "bg-gradient-to-r from-green-500 via-emerald-500 to-green-600"
              }
            `}
          >
            <span className="relative z-10">
              {isProcessing ? "Processing..." : "🚀 Upgrade Now"}
            </span>

            {!isProcessing && (
              <motion.div
                animate={{ x: ["-120%", "200%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 w-1/3 bg-white/20 skew-x-12"
              />
            )}
          </motion.button>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Secure payment powered by Stripe
        </p>
      </motion.div>
    </div>
  );
};

export default Payment;