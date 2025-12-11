import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  //   const [paymentInfo, setPaymentInfo] = useState(null);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post(`/payment-success`, { sessionId })
        .then((res) => {
          console.log("server response:", res.data);

          // setPaymentInfo({
          //   transactionId: res.data.transactionId,
          //   email: res.data.email,
          //   amount: res.data.amount,
          //   plan: res.data.plan,
          //   isPremium: res.data.isPremium,
          // });
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }, [sessionId]);

  // if (!paymentInfo) {
  //   return <h2 className="text-3xl">Loading payment result...</h2>;
  // }

  return (
    <div>
      <h2 className="text-4xl">Payment Successful</h2>
      {/* <p>Transaction ID: {paymentInfo.transactionId}</p>
      <p>Email: {paymentInfo.email}</p>
      <p>Amount: {paymentInfo.amount} BDT</p>
      <p>Plan: {paymentInfo.plan}</p>
      <p>Premium Status: {paymentInfo.isPremium ? "Active" : "Failed"}</p> */}
    </div>
  );
};

export default PaymentSuccess;
