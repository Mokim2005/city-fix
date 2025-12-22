import React from "react";
import { Link } from "react-router";
import { ShieldAlert } from "lucide-react";

const Error = () => {
  return (
    <div
      className="h-screen w-full flex justify-center items-center p-6"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #8a05ff 0%, #2a014f 60%, #120025 100%)",
      }}
    >
      <title>Forbidden</title>
      <div className="backdrop-blur-xl bg-white/10 border border-purple-500/30 shadow-2xl rounded-3xl p-10 max-w-md text-center animate__animated animate__fadeIn">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <ShieldAlert className="w-20 h-20 text-red-400 drop-shadow-[0_0_10px_#ff4d4d]" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-purple-200 drop-shadow-lg mb-3">
          403 Forbidden
        </h1>

        {/* Description */}
        <p className="text-purple-300 text-lg mb-10 leading-relaxed">
          You don’t have permission to access this page.<br />
          Please check your access level or return to safety.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-800/50 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="bg-pink-500/70 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-pink-700/50 transition"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-purple-400 text-sm mt-6 opacity-80">
          City Fix — Access Control System
        </p>
      </div>
    </div>
  );
};

export default Error;
