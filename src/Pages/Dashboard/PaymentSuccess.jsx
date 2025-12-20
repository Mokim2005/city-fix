import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;

    const verifyPayment = async () => {
      try {
        const res = await axiosSecure.post("/payment-success", { sessionId });

        if (res.data.purpose === "boost") {
          Swal.fire("Success!", "Issue boosted successfully!", "success");
          // navigate(/Issus-details/${issueId});
        }

        if (res.data.purpose === "subscribe") {
          Swal.fire("Subscribed!", "Premium activated!", "success");
          navigate("/dashboard/my-profile");
        }
      } catch (err) {
        Swal.fire("Error", "Payment verification failed", err);
        navigate("/");
      }
    };

    verifyPayment();
  }, [sessionId, axiosSecure, navigate]);

  return <p className="text-center mt-20">Processing payment...</p>;
};

export default PaymentSuccess;