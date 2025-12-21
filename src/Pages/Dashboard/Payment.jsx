import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loading from "../../Components/Loading";
import UserAuth from "../../Hooks/UserAuth";
import Swal from "sweetalert2";

const Payment = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  // MongoDB থেকে current user এর full data নিয়ে isPremium চেক করা
  const { data: currentUser = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { isLoading: issuesLoading, data: issuss = [] } = useQuery({
    queryKey: ["issus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issus");
      return res.data;
    },
  });

  if (issuesLoading || userLoading) {
    return <Loading />;
  }

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        email: user.email,
        name: user.displayName || "User",
        amount: 1000,
        plan: "premium",
        purpose: "subscribe",
      };

      console.log("Payment Info:", paymentInfo);

      // Subscribe endpoint এ save করা (optional, তোমার backend এ যদি থাকে)
      const subRes = await axiosSecure.post("/subscribe", paymentInfo);
      console.log("Subscription saved:", subRes.data);

      // Stripe checkout session create করা
      const sessionRes = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      // 🔥 এখানে টাইপো ছিল: sessionRAes → sessionRes
      if (sessionRes.data.url) {
        window.location.href = sessionRes.data.url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed!",
        text:
          err.response?.data?.message ||
          "Could not initiate payment. Please try again.",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1f1f2e] text-white">
      <div className="bg-[#2e2e4d] rounded-2xl p-10 shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Upgrade to Premium</h1>
        <p className="text-xl mb-8 text-gray-300">Unlock exclusive features</p>

        <div className="text-5xl font-extrabold mb-8 text-purple-400">
          ৳1000{" "}
          <span className="text-lg font-normal text-gray-400">/ one time</span>
        </div>

        {currentUser.isPremium ? (
          <div className="text-center">
            <p className="text-2xl text-green-400 font-bold mb-4">
              ✅ You are already a Premium Member!
            </p>
            <p className="text-gray-400">Enjoy all premium features.</p>
          </div>
        ) : (
          <button
            onClick={handlePayment}
            className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all py-4 px-10 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105"
          >
            Pay Now with SSLCommerz
          </button>
        )}

        <p className="mt-8 text-sm text-gray-500">
          Secure payment powered by SSLCommerz
        </p>
      </div>
    </div>
  );
};

export default Payment;
