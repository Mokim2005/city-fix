import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loading from "../../Components/Loading";
import UserAuth from "../../Hooks/UserAuth";
import Swal from "sweetalert2";

const Payment = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  const { isLoading, data: citizens = [] } = useQuery({
    queryKey: ["citizen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/citizen");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // current user find
  const currentUser = citizens.find((c) => c.email === user.email);

  const handlePayment = async () => {
    try {
      const paymenInfo = {
        email: currentUser.email, // use logged-in user
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymenInfo
      );
      window.location.href = res.data.url; // redirect to stripe checkout
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment initiation failed!", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1f1f2e] text-white">
      <div className="bg-[#2e2e4d] rounded-2xl p-8 shadow-2xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Please Pay 1000 BDT</h1>
        {currentUser?.isPremium ? (
          <p className="text-green-400 font-semibold">
            You are already Premium!
          </p>
        ) : (
          <button
            onClick={handlePayment}
            className="mt-4 bg-purple-600 hover:bg-purple-700 transition-all py-2 px-6 rounded-xl font-semibold"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Payment;
