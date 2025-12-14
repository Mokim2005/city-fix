import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loading from "../../Components/Loading";
import UserAuth from "../../Hooks/UserAuth";
import Swal from "sweetalert2";

const Payment = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();
  

  const { isLoading, data: issuss = [] } = useQuery({
    queryKey: ["issus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issus");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  // console.log(currentUser.email)
  console.log('user info', user.email)


  const handlePayment = async () => {
    try {
      const paymentInfo = {
        email:user.email,
        name: user.displayName,
        amount: 1000,
        plan: "premium",
      };

      console.log("this is payment info",paymentInfo)
      const subRes = await axiosSecure.post("/subscribe", paymentInfo);
      console.log("Saved subscription:", subRes.data);

      const sessionRes = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );


      window.location.href = sessionRes.data.url;
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment initiation failed!", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1f1f2e] text-white">
      <div className="bg-[#2e2e4d] rounded-2xl p-8 shadow-2xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Please Pay 1000 BDT</h1>

        {user?.isPremium ? (
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
