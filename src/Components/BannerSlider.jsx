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
  const sliderRef = useRef(null);

  useEffect(() => {
    // Left side text animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Right side slider animation
    gsap.fromTo(
      sliderRef.current,
      { opacity: 0, x: 80, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative text-white py-12 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Decorative Subtle Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div 
            ref={textRef}
            className="lg:col-span-5 text-center lg:text-left space-y-6 bg-gray-900/60 backdrop-blur-xl border border-gray-700/60 rounded-2xl p-6 md:p-10 shadow-xl relative group overflow-hidden"
          >
            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs md:text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              24/7 Premium Emergency Service
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] text-white tracking-tight">
              City's Best{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Plumbing & Water
              </span>{" "}
              Service
            </h1>

            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Fast and reliable solutions for all plumbing issues — from leak
              repairs and pipe fixing to complete water supply installation. We
              provide premium care across the entire city instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(34, 211, 238, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-xl text-sm md:text-base font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-950 shadow-lg cursor-pointer transition-all duration-300"
              >
                Get Free Quote
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="border border-gray-700 hover:border-cyan-500/50 backdrop-blur-md px-6 py-3.5 rounded-xl text-sm md:text-base font-medium cursor-pointer transition-all duration-300 text-gray-200"
              >
                Call Now: +880 1700-000000
              </motion.button>
            </div>
          </div>

          {/* Right Side - Slider Container */}
          <div 
            ref={sliderRef}
            className="lg:col-span-7 w-full h-full"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="relative p-2 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-700/60 hover:border-cyan-500/40 shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 overflow-hidden"
            >
              <div className="rounded-xl overflow-hidden relative shadow-inner">
                {/* Visual Overlay on Slider */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent z-10 pointer-events-none" />
                
                <Carousel
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  showStatus={false}
                  interval={4500}
                  swipeable
                  emulateTouch
                  dynamicHeight={false}
                  className="w-full"
                >
                  <div className="relative h-[250px] sm:h-[350px] md:h-[420px] lg:h-[460px] w-full">
                    <img
                      src="https://i.ibb.co.com/KcJPPXY2/PH-WASH-2014-Daniel-Burgui-337-scaled-aspect-ratio-1920-1080.jpg"
                      className="w-full h-full object-cover"
                      alt="Professional Plumbing Service"
                    />
                  </div>

                  <div className="relative h-[250px] sm:h-[350px] md:h-[420px] lg:h-[460px] w-full">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/070/015/200/small/burst-water-pipe-leaking-water-free-photo.jpg"
                      className="w-full h-full object-cover"
                      alt="Emergency Leak Repair"
                    />
                  </div>

                  <div className="relative h-[250px] sm:h-[350px] md:h-[420px] lg:h-[460px] w-full">
                    <img
                      src="https://images.unsplash.com/photo-1436337936912-5be7166b31ae?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RyZWV0JTIwbGlnaHR8ZW58MHx8MHx8fDA%3D"
                      className="w-full h-full object-cover"
                      alt="City Infrastructure Maintenance"
                    />
                  </div>
                </Carousel>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BannerSlider;