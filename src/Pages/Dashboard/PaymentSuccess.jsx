import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const { width, height } = useWindowSize();

  const [isProcessing, setIsProcessing] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [transactionId, setTransactionId] = useState("");


  const productName = "IssueHub Pro";

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axiosSecure.post("/payment-success", { sessionId });

        setPurpose(res.data.purpose || "");
        setTransactionId(res.data.transactionId || res.data.paymentIntent || sessionId);

        setIsProcessing(false);
        setShowConfetti(true);

        let title = "Payment Successful!";
        let text = "Thank you for your purchase!";

        if (res.data.purpose === "boost") {
          title = "Boost Activated!";
          text = "Your issue has been successfully boosted!";
        } else if (res.data.purpose === "subscribe") {
          title = "Welcome to Premium!";
          text = "Your subscription is now active!";
          setTimeout(() => navigate("/dashboard/my-profile"), 4000);
        }

        Swal.fire({
          icon: "success",
          title,
          text,
          timer: 3000,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#fff",
        });
      } catch (err) {
        setIsProcessing(false);
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Verification failed. Please contact support.",
          background: "#1f2937",
          color: "#fff",
        });
        navigate("/");
      }
    };

    verifyPayment();
  }, [sessionId, axiosSecure, navigate]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <title>Payment Success</title>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p
            className="text-2xl font-semibold text-gray-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Processing your payment...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.1}
          colors={["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#ffffff"]}
        />
      )}

      <motion.div
        className="bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center border border-gray-800"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Product Name */}
        <motion.h2
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {productName}
        </motion.h2>

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="w-28 h-28 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <svg
            className="w-20 h-20 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </svg>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {purpose === "boost" && "Your issue has been successfully boosted!"}
          {purpose === "subscribe" && "Premium subscription activated!"}
          {!purpose && "Thank you for your purchase."}
        </motion.p>

        <motion.div
          className="bg-gray-800/70 rounded-lg p-6 mb-10 border border-gray-700"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm text-gray-400 mb-2">Transaction ID</p>
          <p className="text-lg font-mono font-bold text-emerald-400 break-all">
            {transactionId}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <button
            onClick={() => navigate("/")}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg rounded-xl hover:from-emerald-600 hover:to-green-700 transition shadow-xl transform hover:scale-105"
          >
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;