import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BannerSlider = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative text-white py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Side - Text Content with Glassy Effect */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left space-y-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              City's Best Plumbing & Water Service
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              Fast and reliable solutions for all plumbing issues — from leak
              repairs and pipe fixing to complete water supply installation. We
              provide 24/7 emergency service across the city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Get Free Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-500/50 hover:border-green-400 backdrop-blur-md bg-green-600/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300"
              >
                Call Now: +880 1700-000000
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Slider with Glassy Border */}
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="lg:w-1/2 text-center lg:text-left space-y-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-green-500/40 hover:border-green-500/50 transition-all duration-300"
           >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={4000}
                swipeable
                emulateTouch
                dynamicHeight={false}
                className="w-full"
              >
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
                  <img
                    src="https://i.ibb.co.com/KcJPPXY2/PH-WASH-2014-Daniel-Burgui-337-scaled-aspect-ratio-1920-1080.jpg"
                    className="w-full h-full object-cover"
                    alt="Slide 1"
                  />
                </div>

                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/070/015/200/small/burst-water-pipe-leaking-water-free-photo.jpg"
                    className="w-full h-full object-cover"
                    alt="Slide 2"
                  />
                </div>

                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1436337936912-5be7166b31ae?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RyZWV0JTIwbGlnaHR8ZW58MHx8MHx8fDA%3D"
                    className="w-full h-full object-cover"
                    alt="Slide 3"
                  />
                </div>
              </Carousel>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
