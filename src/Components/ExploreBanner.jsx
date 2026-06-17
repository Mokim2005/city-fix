import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Icons ---
const Icons = {
  Map: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  City: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="18" x="3" y="3" rx="2" />
      <rect width="8" height="10" x="13" y="11" rx="2" />
      <path d="M13 3h7a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-7" />
    </svg>
  ),
};

// --- Feature Card ---
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className={`
        group relative p-6 rounded-2xl cursor-pointer
        bg-gray-900
        border border-gray-700
        ${feature.borderColor}
        shadow-lg ${feature.glowColor}
        hover:shadow-xl
        transition-all duration-300 ease-in-out
        overflow-hidden
      `}
    >
      {/* Background glow on hover */}
      <div
        className={`
          absolute inset-0 rounded-2xl 
          bg-gradient-to-br ${feature.bgGlow}
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
        `}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`
            text-4xl mb-4 flex justify-start 
            ${feature.iconColor}
            transition-transform duration-300 group-hover:scale-110
          `}
        >
          <feature.icon />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-white tracking-tight transition-colors duration-200">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom accent line */}
        <div
          className={`
            mt-5 h-0.5 w-0 rounded-full
            bg-gradient-to-r ${feature.bgGlow.replace("/10", "")}
            group-hover:w-full
            transition-all duration-500 ease-out
          `}
        />
      </div>
    </motion.div>
  );
};

// --- MAIN APP ---
const App = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  // LiveCityStatus-এর মত কালার থিম ডাটাতে ম্যাপ করা হয়েছে
  const features = [
    { 
      icon: Icons.Map, 
      title: "Real-time Reporting", 
      description: "Report problems instantly and track progress live.",
      iconColor: "text-amber-400",
      borderColor: "hover:border-amber-400",
      glowColor: "hover:shadow-amber-500/20",
      bgGlow: "from-amber-500/10 to-yellow-500/10",
    },
    { 
      icon: Icons.Users, 
      title: "Community Driven", 
      description: "Citizens work together to improve cities.",
      iconColor: "text-cyan-400",
      borderColor: "hover:border-cyan-400",
      glowColor: "hover:shadow-cyan-500/20",
      bgGlow: "from-cyan-500/10 to-teal-500/10",
    },
    { 
      icon: Icons.Chart, 
      title: "Analytics", 
      description: "View insights of city issues.",
      iconColor: "text-violet-400",
      borderColor: "hover:border-violet-400",
      glowColor: "hover:shadow-violet-500/20",
      bgGlow: "from-violet-500/10 to-purple-500/10",
    },
    { 
      icon: Icons.Shield, 
      title: "Transparency", 
      description: "Full accountability system.",
      iconColor: "text-emerald-400",
      borderColor: "hover:border-emerald-400",
      glowColor: "hover:shadow-emerald-500/20",
      bgGlow: "from-emerald-500/10 to-green-500/10",
    },
    { 
      icon: Icons.Clock, 
      title: "Fast Response", 
      description: "Quick issue resolution.",
      iconColor: "text-pink-400",
      borderColor: "hover:border-pink-400",
      glowColor: "hover:shadow-pink-500/20",
      bgGlow: "from-pink-500/10 to-rose-500/10",
    },
    { 
      icon: Icons.City, 
      title: "Multi-City", 
      description: "Supports multiple cities.",
      iconColor: "text-blue-400",
      borderColor: "hover:border-blue-400",
      glowColor: "hover:shadow-blue-500/20",
      bgGlow: "from-blue-500/10 to-indigo-500/10",
    },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* HERO */}
      <header ref={headerRef} className="text-center py-24">
        <h1 className="text-5xl font-black">
          Empowering Citizens <span className="text-cyan-400">Fixing Cities</span>
        </h1>
        <p className="mt-4 text-gray-300">
          Build smarter cities together.
        </p>
      </header>

      {/* FEATURES */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-20">
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </main>
    </div>
  );
};

export default App;