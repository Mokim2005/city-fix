import { motion } from "framer-motion";
import { FaRegEdit, FaSearch, FaTools, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: FaRegEdit,
    title: "Report Issue",
    desc: "Citizens can easily report city problems with images and location.",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-400",
    glowColor: "hover:shadow-purple-500/20",
    bgGlow: "from-purple-500/10 to-fuchsia-500/10",
  },
  {
    icon: FaSearch,
    title: "Review Process",
    desc: "Authorities review and verify the reported issues quickly.",
    iconColor: "text-indigo-400",
    borderColor: "hover:border-indigo-400",
    glowColor: "hover:shadow-indigo-500/20",
    bgGlow: "from-indigo-500/10 to-blue-500/10",
  },
  {
    icon: FaTools,
    title: "Action Taken",
    desc: "City teams are assigned to fix the problem efficiently.",
    iconColor: "text-violet-400",
    borderColor: "hover:border-violet-400",
    glowColor: "hover:shadow-violet-500/20",
    bgGlow: "from-violet-500/10 to-purple-500/10",
  },
  {
    icon: FaCheckCircle,
    title: "Issue Resolved",
    desc: "Once fixed, the issue is marked as resolved with updates.",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-400",
    glowColor: "hover:shadow-emerald-500/20",
    bgGlow: "from-emerald-500/10 to-green-500/10",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-20 px-4 md:px-10 text-white">
      
      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold">
          How It <span className="text-purple-400">Works</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base">
          Simple steps to make your city better
        </p>
      </div>

      {/* STEPS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ y: -6 }}
            className={`
              group relative p-6 rounded-2xl cursor-default
              bg-gray-900
              border border-gray-700
              ${step.borderColor}
              shadow-lg ${step.glowColor}
              hover:shadow-xl
              transition-all duration-300 ease-in-out
              overflow-hidden
            `}
          >
            {/* Background glow on hover */}
            <div
              className={`
                absolute inset-0 rounded-2xl 
                bg-gradient-to-br ${step.bgGlow}
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
                  ${step.iconColor}
                  transition-transform duration-300 group-hover:scale-110
                `}
              >
                <step.icon />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-white tracking-tight">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className={`
                  mt-5 h-0.5 w-0 rounded-full
                  bg-gradient-to-r ${step.bgGlow.replace("/10", "")}
                  group-hover:w-full
                  transition-all duration-500 ease-out
                `}
              />
            </div>

            {/* STEP NUMBER */}
            <span className="absolute top-4 right-5 text-gray-800/40 text-4xl font-extrabold select-none transition-colors duration-300 group-hover:text-white/10">
              0{index + 1}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;