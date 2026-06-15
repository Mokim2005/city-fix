import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../Components/Loading";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

gsap.registerPlugin(ScrollTrigger);

const LatestResolvedIssues = () => {
  const axiosSecure = UseAxiosSecure();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);

  useEffect(() => {
    axiosSecure
      .get("/latest-resolve")
      .then((res) => {
        console.log(res.data);
        setIssues(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  useEffect(() => {
    if (!loading && cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        }
      });
    }
  }, [loading, issues]);

  console.log(issues);

  if (loading) return <Loading />;

  return (
    <div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-10 sm:mb-12 md:mb-16 text-center"
        >
          Latest Resolved Issues
        </motion.h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {issues.map((issue, index) => (
            <motion.div
              key={issue._id}
              ref={(el) => (cardsRef.current[index] = el)}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
               className="backdrop-blur-2xl bg-white/5 border border-white/10 p-5 sm:p-6 rounded-3xl shadow-2xl hover:shadow-green-500/40 hover:border-green-500/50 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
               <h3 className="text-xl sm:text-2xl font-semibold text-white mt-4 mb-2 group-hover:text-green-300 transition-colors duration-300">
                {issue.title}
              </h3>
              <p className="text-gray-300 mb-4 flex items-center gap-2">
                <span className="text-lg">📍</span> {issue.location}
              </p>

                <Link
                to={`/Issus-details/${issue._id}`}
                className="cityfix-btn cityfix-btn-primary inline-block w-full text-center px-4 py-3 rounded-xl shadow-lg hover:shadow-green-500/50"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestResolvedIssues;
