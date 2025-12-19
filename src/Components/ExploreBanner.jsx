import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// --- Custom SVG Icons (Lucide-style) ---
const Icons = {
  Map: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  ),
  Users: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Chart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  ),
  Shield: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  ),
  Clock: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  City: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="18" x="3" y="3" rx="2" />
      <rect width="8" height="10" x="13" y="11" rx="2" />
      <path d="M13 3h7a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-7" />
    </svg>
  ),
};

// --- Spotlight Card Component ---
const FeatureCard = ({ feature, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a0f35]/80 to-[#120a25]/60 backdrop-blur-xl p-10 overflow-hidden shadow-2xl"
    >
      {/* Interactive Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(700px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.2), transparent 70%)`
          ),
        }}
      />

      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-xl" />
      </div>

      <div className="relative z-10 flex flex-col items-start">
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/10 border border-purple-500/30 backdrop-blur-sm group-hover:scale-110 group-hover:border-purple-400/60 transition-all duration-500">
          <feature.icon
            size={40}
            className="text-purple-400 group-hover:text-purple-300"
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
          {feature.title}
        </h3>
        <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-100 transition-colors duration-300">
          {feature.description}
        </p>
      </div>

      {/* Animated bottom gradient line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transition-all duration-700 group-hover:w-full" />
    </motion.div>
  );
};

const App = () => {
  const features = [
    {
      icon: Icons.Map,
      title: "Real-time Reporting",
      description:
        "Report problems instantly from anywhere. Track progress live until fully resolved.",
    },
    {
      icon: Icons.Users,
      title: "Community Driven",
      description:
        "Connect with fellow citizens to collectively improve city infrastructure and safety.",
    },
    {
      icon: Icons.Chart,
      title: "Powerful Analytics",
      description:
        "View trends, hotspots, and detailed insights on reported issues across the city.",
    },
    {
      icon: Icons.Shield,
      title: "Transparency & Accountability",
      description:
        "Full visibility into how authorities handle reports, building trust and efficiency.",
    },
    {
      icon: Icons.Clock,
      title: "Rapid Response",
      description:
        "Quick assignment and resolution by government teams for faster fixes.",
    },
    {
      icon: Icons.City,
      title: "Multi-City Support",
      description:
        "Scalable system supporting multiple cities with centralized management.",
    },
  ];

  return (
    <div className="bg-[#050017] text-white min-h-screen selection:bg-purple-600/30 overflow-x-hidden">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-purple-900/30 blur-3xl rounded-full animate-pulse slow" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[700px] h-[700px] bg-pink-900/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <header className="relative z-10 pt-32 pb-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block px-5 py-2 mb-8 text-sm font-semibold tracking-widest text-purple-300 uppercase bg-purple-900/20 border border-purple-700/40 rounded-full backdrop-blur-sm">
            Transforming Urban Life
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            Empowering Citizens,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300">
              Fixing Cities.
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-12">
            Join thousands of citizens reporting issues, tracking improvements,
            and making cities smarter, cleaner, and safer together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-bold text-lg transition-all shadow-2xl shadow-purple-600/40 hover:shadow-purple-600/60 hover:-translate-y-1">
              Get Started Now
            </button>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full font-bold text-lg transition-all backdrop-blur-md hover:border-white/40">
              Learn More
            </button>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to report, track, and resolve urban issues
            efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
