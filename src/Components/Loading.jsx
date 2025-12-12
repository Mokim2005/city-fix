import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#1a132f] to-[#2b2250]">
      <div className="relative w-24 h-24">
        {/* Outer ring with glow */}
        <div className="absolute inset-0 rounded-full border-4 border-purple-600/30 animate-pulse"></div>

        {/* Spinning multi-color ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-400 border-b-pink-500 border-l-green-400 animate-spin"></div>

        {/* Inner bouncing glowing dot */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-purple-400 rounded-full -translate-x-1/2 -translate-y-1/2 animate-bounce shadow-lg shadow-purple-500/50"></div>
      </div>
      {/* Optional: Loading text */}
      <p className="absolute bottom-20 text-purple-300 text-lg animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
