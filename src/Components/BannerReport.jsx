import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BannerReport = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      }
    });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative py-20 lg:py-28 text-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
          <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-16 md:mb-20 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-2xl"
        >
          How City Fix Works
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {[
            {
              emoji: "📍",
              title: "Report an Issue",
              desc: "Spot a problem in your city and report it instantly via the app with photos and location.",
            },
            {
              emoji: "⚡",
              title: "Track Progress",
              desc: "Follow the status of your report in real-time and see updates from authorities.",
            },
            {
              emoji: "✅",
              title: "See Results",
              desc: "Get notified when the issue is resolved and help make your city better together!",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              variants={cardVariants}
              whileHover={{
                y: -20,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              className="relative group"
            >
              {/* Main Card with Glassy Effect */}
              <div className="relative p-6 sm:p-8 lg:p-10 backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl group-hover:shadow-green-500/50 group-hover:border-green-500/50 transition-all duration-500 group-hover:-translate-y-4">
                {/* Inner glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-600/20 via-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Floating shadow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-green-600/30 to-emerald-600/30 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10" />

                <div className="relative z-20 text-center">
                  <motion.div
                    whileHover={{
                      scale: 1.3,
                      rotate: index === 0 ? 15 : index === 2 ? -15 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-5xl sm:text-6xl lg:text-7xl mb-6 sm:mb-8 inline-block drop-shadow-2xl"
                  >
                    {item.emoji}
                  </motion.div>

                  <h3 className="font-extrabold text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-5 text-white drop-shadow-md">
                    {item.title}
                  </h3>

                  <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-sm mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BannerReport;
