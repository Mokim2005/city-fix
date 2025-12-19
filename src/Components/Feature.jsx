import React from "react";
import { motion } from "framer-motion";

// Lucide-style Inline SVG Icons (Jate external dependency lagbe na)
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

// Gradient Icon Wrapper
const GradientIcon = ({ icon: IconComponent }) => {
  const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="relative mb-6 flex items-center justify-center">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#a855f7" offset="0%" /> {/* Purple-500 */}
            <stop stopColor="#ec4899" offset="100%" /> {/* Pink-500 */}
          </linearGradient>
        </defs>
      </svg>

      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:border-purple-500/50 transition-all duration-500">
        <div
          style={{ stroke: `url(#${gradientId})` }}
          className="text-5xl lg:text-6xl flex items-center justify-center"
        >
          <IconComponent />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const features = [
    {
      icon: Icons.Map,
      title: "Real-time Issue Reporting",
      description:
        "Report problems instantly from anywhere. Track progress live until fully resolved.",
    },
    {
      icon: Icons.Users,
      title: "Community Engagement",
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
      title: "Fast Response Times",
      description:
        "Quick assignment and resolution by government teams for rapid fixes.",
    },
    {
      icon: Icons.City,
      title: "Multi-City Support",
      description:
        "Scalable system supporting multiple cities with centralized management.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-24 bg-[#0a051a] text-white relative overflow-hidden min-h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Key Features of City Fix
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Amader platform-er powerful feature gulo babohar kore apnar shohorke
            gore tulun aro niramoy ebong shundor.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative p-8 h-full bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/5 hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <GradientIcon icon={feature.icon} />

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default App;
