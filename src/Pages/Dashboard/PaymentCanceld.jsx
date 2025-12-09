import React from "react";

import { FiXCircle } from "react-icons/fi";
import { Link } from "react-router";

const PaymentCanceld = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md text-center animate-fadeIn">
        <FiXCircle className="mx-auto text-red-500 text-9xl mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mb-8">
          Oops! Your payment was not completed. Please try again to continue.
        </p>
        <Link to='/dashboard/payment'>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCanceld;
