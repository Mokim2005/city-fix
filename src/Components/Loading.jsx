import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loading = () => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    // Logo animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotate: -180, opacity: 0 },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // Text animation
    gsap.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" }
    );

    // Dots animation
    dotsRef.current.forEach((dot, index) => {
      if (dot) {
        gsap.to(dot, {
          y: -10,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      }
    });

    // Continuous rotation for outer ring
    gsap.to(".spinner-ring", {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[3px]"></div>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Loading Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glassy Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl p-12 shadow-2xl"
        >
          {/* Spinner Container */}
          <div ref={logoRef} className="relative w-32 h-32 mx-auto mb-8">
            {/* Outer Spinning Ring */}
            <div className="spinner-ring absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500"></div>

            {/* Middle Ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-400 border-l-blue-400"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />

            {/* Inner Pulsing Circle */}
            <motion.div
              className="absolute inset-6 rounded-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 backdrop-blur-sm"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />

            {/* Center Logo/Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <div className="text-4xl">🏙️</div>
            </motion.div>

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(168, 85, 247, 0.8)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>

          {/* Loading Text */}
          <div ref={textRef} className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              City Fix
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-4">
              Loading, please wait
              <span className="inline-flex ml-1">
                <span
                  ref={(el) => (dotsRef.current[0] = el)}
                  className="inline-block"
                >
                  .
                </span>
                <span
                  ref={(el) => (dotsRef.current[1] = el)}
                  className="inline-block"
                >
                  .
                </span>
                <span
                  ref={(el) => (dotsRef.current[2] = el)}
                  className="inline-block"
                >
                  .
                </span>
              </span>
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-gray-400 text-sm backdrop-blur-xl bg-white/5 px-6 py-3 rounded-full border border-white/10"
        >
          Preparing your experience...
        </motion.p>
      </div>

      {/* Decorative Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 border-4 border-purple-400/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-12 h-12 border-4 border-pink-400/30 rounded-lg"
        animate={{
          y: [0, 20, 0],
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Loading;
