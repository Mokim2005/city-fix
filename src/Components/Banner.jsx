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
    <section className="relative w-full min-h-screen overflow-hidden flex items-center">
      {/* Background Image - Full Screen Width (no container) */}
      <div className="fixed inset-0 z-0 w-screen h-screen">
        <img
          src="https://img.freepik.com/premium-photo/asphalt-road-modern-city_1127-6420.jpg?semt=ais_hybrid&w=740&q=80"
          alt="City Background"
          className="w-full h-full object-cover blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Fixed Width Container for Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Main Title with Glassy Effect */}
            <motion.div
              ref={titleRef}
              className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 lg:p-10 shadow-2xl"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  City Fix
                </span>
                <span className="block text-white text-3xl sm:text-4xl lg:text-5xl mt-4 font-bold">
                  Smart Solutions
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with Glassy Effect */}
            <motion.div
              ref={subtitleRef}
              className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl"
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed">
                Transform your city with instant issue reporting, real-time tracking, and community-driven solutions.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-4 lg:p-6 text-center shadow-xl hover:shadow-2xl hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="text-3xl lg:text-4xl mb-2">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(168, 85, 247, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] hover:bg-right text-white font-bold text-lg rounded-full shadow-2xl transition-all duration-500 backdrop-blur-sm border border-purple-400/50"
              >
                🚀 Get Started Free
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 backdrop-blur-xl bg-white/5 border-2 border-white/30 text-white font-bold text-lg rounded-full hover:border-cyan-400/70 transition-all duration-300"
              >
                📖 Learn More
              </motion.button>
            </div>
          </div>

          {/* Right Side - Floating Cards */}
          <div className="relative hidden lg:flex justify-center items-center h-[600px]">
            {/* Central Glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            />

            {/* Floating Cards Container */}
            <div className="relative w-full h-full flex flex-col justify-center items-center gap-8">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={index}
                  ref={(el) => (floatingCardsRef.current[index] = el)}
                  className="w-64"
                  animate={{
                    y: [0, -20, 0],
                    x: index === 1 ? [0, 20, 0] : [0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4 + index,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  whileHover={{ scale: 1.1, y: -10 }}
                >
                  <div
                    className={`backdrop-blur-2xl bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300`}
                  >
                    <div className="text-5xl mb-3">{card.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-300">{card.desc}</p>
                    
                    {/* Animated progress bar */}
                    <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 2,
                          delay: 1 + index * 0.3,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 border-4 border-purple-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-16 h-16 border-4 border-pink-400/30 rounded-lg"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/3 right-5 w-12 h-12 bg-cyan-400/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default Banner;
