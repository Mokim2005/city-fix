import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#f9f9f9]">
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 animate-pulse"></div>

        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-green-500 animate-spin"></div>

        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
