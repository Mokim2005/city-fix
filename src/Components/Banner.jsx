import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Banner = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);
  const floatingCardsRef = useRef([]);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -100, rotateY: -90 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: "power3.out" }
    );

    // Subtitle animation
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );

    // Stats animation
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.6 + index * 0.15,
            ease: "back.out(1.7)",
          }
        );
      }
    });

    // Floating cards animation
    floatingCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, x: 100, rotateZ: 45 },
          {
            opacity: 1,
            x: 0,
            rotateZ: 0,
            duration: 1,
            delay: 0.8 + index * 0.2,
            ease: "elastic.out(1, 0.5)",
          }
        );
      }
    });
  }, []);

  const stats = [
    { number: "10K+", label: "Issues Resolved", icon: "✅" },
    { number: "50K+", label: "Active Users", icon: "👥" },
    { number: "100+", label: "Cities Covered", icon: "🏙️" },
  ];

  const floatingCards = [
    {
      icon: "🚨",
      title: "Report Issue",
      desc: "Quick & Easy",
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30",
    },
    {
      icon: "📊",
      title: "Track Status",
      desc: "Real-time Updates",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: "🎯",
      title: "Get Results",
      desc: "Fast Resolution",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
  ];

  return (
<section className="relative w-full min-h-screen flex items-center overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src="https://www.the-world.in/wp-content/uploads/2024/04/The-World-Website-Cleanest-City-Surat-Landscape.webp"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60" />
  </div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* LEFT SIDE */}
      <div className="space-y-8">
        
        {/* Small Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-400/30"
        >
          🚀 Smart City Platform
        </motion.div>

        {/* TITLE */}
        <motion.h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Fix Your City
          </span>
          <br />
          <span className="text-white text-4xl sm:text-5xl">
            Smarter & Faster
          </span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          ref={subtitleRef}
          className="text-lg text-gray-300 max-w-xl"
        >
          রিপোর্ট করুন, ট্র্যাক করুন, এবং আপনার শহরের সমস্যা সমাধান করুন 
          একদম real-time এ। Community-driven smart solution platform.
        </motion.p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-xl"
          >
            🚀 Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-full border border-white/30 text-white"
          >
            📖 Learn More
          </motion.button>
        </div>

        {/* STATS */}
        <div className="flex gap-8 pt-6">
          {stats.map((stat, index) => (
            <div key={index}>
              <h2 className="text-3xl font-bold text-white">
                {stat.number}
              </h2>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE (Clean Card UI) */}
      <div className="relative flex justify-center">
        
        {/* Main Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[320px] sm:w-[400px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
        >
          <h3 className="text-white text-xl font-bold mb-4">
            📍 Report an Issue
          </h3>

          <div className="space-y-3">
            <div className="bg-white/10 p-3 rounded-lg text-gray-300">
              Road Damage
            </div>
            <div className="bg-white/10 p-3 rounded-lg text-gray-300">
              Broken Street Light
            </div>
            <div className="bg-white/10 p-3 rounded-lg text-gray-300">
              Garbage Issue
            </div>
          </div>

          <button className="mt-5 w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
            Submit Report
          </button>
        </motion.div>

        {/* Floating small cards */}
        <motion.div
          className="absolute -top-10 -left-10 bg-purple-500/20 p-4 rounded-xl backdrop-blur-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🚨 Alert
        </motion.div>

        <motion.div
          className="absolute -bottom-10 -right-10 bg-pink-500/20 p-4 rounded-xl backdrop-blur-lg"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          📊 Tracking
        </motion.div>
      </div>
    </div>
  </div>
</section>
  );
};

export default Banner;
