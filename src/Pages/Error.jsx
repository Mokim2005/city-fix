import React from "react";
import { Link } from "react-router";
import { ShieldAlert } from "lucide-react";

const Error = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border-t-4 border-red-500">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />

        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          403 Forbidden
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          You don't have permission to access this page.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="bg-gray-800 hover:bg-black text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
