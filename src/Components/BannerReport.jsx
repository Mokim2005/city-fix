import React from "react";

const BannerReport = () => {
  return (
    <section className="py-16 bg-[#221a3f] text-white px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        How City Fix Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="text-center p-6 bg-[#2b2250] rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="text-purple-400 mb-4 text-5xl">📍</div>
          <h3 className="font-semibold text-xl mb-2">Report an Issue</h3>
          <p className="text-gray-300">
            Spot a problem in your city and report it instantly via the app.
          </p>
        </div>
        <div className="text-center p-6 bg-[#2b2250] rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="text-purple-400 mb-4 text-5xl">⚡</div>
          <h3 className="font-semibold text-xl mb-2">Track Progress</h3>
          <p className="text-gray-300">
            Follow the status of your report in real-time until it's fixed.
          </p>
        </div>
        <div className="text-center p-6 bg-[#2b2250] rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="text-purple-400 mb-4 text-5xl">✅</div>
          <h3 className="font-semibold text-xl mb-2">See Results</h3>
          <p className="text-gray-300">
            Get notified when the issue is resolved. Make your city safer!
          </p>
        </div>
      </div>
    </section>
  );
};

export default BannerReport;
