import React from "react";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaMapMarkedAlt size={40} className="text-purple-400 mb-4" />,
      title: "Real-time Issue Reporting",
      description:
        "Report problems instantly from your mobile or desktop. Track issues in real-time until resolved.",
    },
    {
      icon: <FaUsers size={40} className="text-purple-400 mb-4" />,
      title: "Community Engagement",
      description:
        "Join a community of issuss helping improve city infrastructure and safety together.",
    },
    {
      icon: <FaChartLine size={40} className="text-purple-400 mb-4" />,
      title: "Data Analytics",
      description:
        "Get insights on reported issues, trends, and areas needing urgent attention.",
    },
    {
      icon: <FaShieldAlt size={40} className="text-purple-400 mb-4" />,
      title: "Transparency & Accountability",
      description:
        "Track how the city responds to issues, ensuring transparency and reliability.",
    },
    {
      icon: <FaClock size={40} className="text-purple-400 mb-4" />,
      title: "Fast Response",
      description:
        "Government teams and admins can quickly assign and resolve reported issues.",
    },
    {
      icon: <FaMapMarkedAlt size={40} className="text-purple-400 mb-4" />,
      title: "City Coverage",
      description:
        "Supports multiple cities with centralized reporting and management system.",
    },
  ];

  return (
    <section className="py-16 bg-[#1a132f] text-white px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Key Features of City Fix
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#2b2250] p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
