import { motion } from "framer-motion";
import { FaRegEdit, FaSearch, FaTools, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: FaRegEdit,
    title: "Report Issue",
    desc: "Citizens can easily report city problems with images and location.",
  },
  {
    icon: FaSearch,
    title: "Review Process",
    desc: "Authorities review and verify the reported issues quickly.",
  },
  {
    icon: FaTools,
    title: "Action Taken",
    desc: "City teams are assigned to fix the problem efficiently.",
  },
  {
    icon: FaCheckCircle,
    title: "Issue Resolved",
    desc: "Once fixed, the issue is marked as resolved with updates.",
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
        <p className="text-gray-300 mt-3">
          Simple steps to make your city better
        </p>
      </div>

      {/* STEPS */}
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="relative p-6 rounded-2xl 
                       bg-white/10 backdrop-blur-xl 
                       border border-white/20 
                       shadow-lg hover:shadow-purple-500/30 
                       transition-all"
          >
             {/* ICON */}
            <div className="text-green-400 text-3xl mb-4">
              <step.icon />
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-semibold mb-2">
              {step.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-300 text-sm">
              {step.desc}
            </p>

            {/* STEP NUMBER */}
            <span className="absolute top-3 right-4 text-white/20 text-4xl font-bold">
              {index + 1}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;