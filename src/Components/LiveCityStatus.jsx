import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FaRoad, FaTint, FaBolt, FaCheckCircle } from "react-icons/fa";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UserAuth from "../Hooks/UserAuth";

const staticStats = [
  {
    icon: FaRoad,
    label: "Road Issues",
    value: 128,
    iconColor: "text-amber-400",
    borderColor: "hover:border-amber-400",
    glowColor: "hover:shadow-amber-500/20",
    bgGlow: "from-amber-500/10 to-yellow-500/10",
  },
  {
    icon: FaTint,
    label: "Water Issues",
    value: 64,
    iconColor: "text-cyan-400",
    borderColor: "hover:border-cyan-400",
    glowColor: "hover:shadow-cyan-500/20",
    bgGlow: "from-cyan-500/10 to-teal-500/10",
  },
  {
    icon: FaBolt,
    label: "Electricity Issues",
    value: 42,
    iconColor: "text-violet-400",
    borderColor: "hover:border-violet-400",
    glowColor: "hover:shadow-violet-500/20",
    bgGlow: "from-violet-500/10 to-purple-500/10",
  },
  {
    icon: FaCheckCircle,
    label: "Resolved Issues",
    value: 320,
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-400",
    glowColor: "hover:shadow-emerald-500/20",
    bgGlow: "from-emerald-500/10 to-green-500/10",
  },
];

const LiveCityStatus = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issus");
      return res.data;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const dynamicStats = useMemo(() => {
    if (!user || isLoading || isError) return null;
    const road = issues.filter((i) => i.category === "Road").length;
    const water = issues.filter((i) => i.category === "Water").length;
    const electricity = issues.filter(
      (i) => i.category === "Electricity"
    ).length;
    const resolved = issues.filter(
      (i) => i.status?.toLowerCase() === "resolved"
    ).length;
    return [
      { ...staticStats[0], value: road },
      { ...staticStats[1], value: water },
      { ...staticStats[2], value: electricity },
      { ...staticStats[3], value: resolved },
    ];
  }, [user, isLoading, isError, issues]);

  const stats = dynamicStats || staticStats;

  return (
    <section className="py-20 px-4 md:px-10 text-white relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold">
          Live City{" "}
          <span className="text-cyan-400">Status</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base">
          Real-time overview of city issues
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ y: -6 }}
            className={`
              group relative p-6 rounded-2xl text-center cursor-default
              bg-gray-900
              border border-gray-700
              ${item.borderColor}
              shadow-lg ${item.glowColor}
              hover:shadow-xl
              transition-all duration-300 ease-in-out
              overflow-hidden
            `}
          >
            {/* Background glow on hover */}
            <div
              className={`
                absolute inset-0 rounded-2xl 
                bg-gradient-to-br ${item.bgGlow}
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              `}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div
                className={`
                  text-4xl mb-4 flex justify-center 
                  ${item.iconColor}
                  transition-transform duration-300 group-hover:scale-110
                `}
              >
                <item.icon />
              </div>

              {/* Value */}
              <h3 className="text-4xl font-extrabold text-white tracking-tight">
                {item.value}
                <span className="text-2xl font-bold text-gray-400">+</span>
              </h3>

              {/* Label */}
              <p className={`mt-2 text-sm font-medium ${item.iconColor} opacity-90`}>
                {item.label}
              </p>

              {/* Bottom accent line */}
              <div
                className={`
                  mt-4 h-0.5 w-0 mx-auto rounded-full
                  bg-gradient-to-r ${item.bgGlow.replace("/10", "")}
                  group-hover:w-3/4
                  transition-all duration-500 ease-out
                `}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-gray-500 mt-10 text-sm">
        ● Updated in real-time based on citizen reports
      </p>
    </section>
  );
};

export default LiveCityStatus;