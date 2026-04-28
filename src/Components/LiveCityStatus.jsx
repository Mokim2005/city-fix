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
    color: "text-yellow-400",
  },
  {
    icon: FaTint,
    label: "Water Issues",
    value: 64,
    color: "text-blue-400",
  },
  {
    icon: FaBolt,
    label: "Electricity Issues",
    value: 42,
    color: "text-purple-400",
  },
  {
    icon: FaCheckCircle,
    label: "Resolved Issues",
    value: 320,
    color: "text-green-400",
  },
];

const LiveCityStatus = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: issues = [], isLoading, isError } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issus");
      return res.data;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const dynamicStats = useMemo(() => {
    if (!user || isLoading || isError) return null;
    const road = issues.filter((i) => i.category === "Road").length;
    const water = issues.filter((i) => i.category === "Water").length;
    const electricity = issues.filter((i) => i.category === "Electricity").length;
    const resolved = issues.filter(
      (i) => i.status?.toLowerCase() === "resolved"
    ).length;
    return [
      {
        icon: FaRoad,
        label: "Road Issues",
        value: road,
        color: "text-yellow-400",
      },
      {
        icon: FaTint,
        label: "Water Issues",
        value: water,
        color: "text-blue-400",
      },
      {
        icon: FaBolt,
        label: "Electricity Issues",
        value: electricity,
        color: "text-purple-400",
      },
      {
        icon: FaCheckCircle,
        label: "Resolved Issues",
        value: resolved,
        color: "text-green-400",
      },
    ];
  }, [user, isLoading, isError, issues]);

  const stats = dynamicStats || staticStats;
  return (
    <section className="py-20 px-4 md:px-10 text-white relative">
      
      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold">
          Live City <span className="text-purple-400">Status</span>
        </h2>
        <p className="text-gray-300 mt-3">
          Real-time overview of city issues
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="relative p-6 rounded-2xl 
                       bg-white/10 backdrop-blur-xl 
                       border border-white/20 
                       shadow-xl hover:shadow-purple-500/30 
                       transition-all text-center"
          >
            {/* ICON */}
            <div className={`text-4xl mb-3 flex justify-center ${item.color}`}>
              <item.icon />
            </div>

            {/* VALUE (animated feel) */}
            <h3 className="text-3xl font-bold">
              {item.value}+
            </h3>

            {/* LABEL */}
            <p className="text-gray-300 mt-2 text-sm">
              {item.label}
            </p>

            {/* glow circle */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-xl opacity-0 hover:opacity-100 transition"></div>
          </motion.div>
        ))}
      </div>

      {/* FOOT NOTE */}
      <p className="text-center text-gray-400 mt-10 text-sm">
        Updated in real-time based on citizen reports
      </p>
    </section>
  );
};

export default LiveCityStatus;