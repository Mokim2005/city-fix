import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "../assets/logo.png";
import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
  FaGithub,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotate: -180, opacity: 0 },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      }
    );

    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Issues", path: "/all-issus" },
    { name: "Report Issue", path: "/issus-from" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: "https://www.facebook.com/abdul.mokim.01", color: "hover:text-blue-500" },
    { icon: FaTwitter, url: "https://x.com/AbdulMokim40428", color: "hover:text-sky-400" },
    { icon: FaInstagram, url: "https://www.instagram.com/abdul.mokim.01/", color: "hover:text-pink-500" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/abdul-mokim1/", color: "hover:text-blue-600" },
    { icon: FaGithub, url: "https://github.com/Mokim2005", color: "hover:text-gray-300" },
  ];

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/08/79/64/26/360_F_879642658_OhKUCLV2Iukh3TgwPS5a8tbaaGA9qW08.jpg')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* Logo */}
          <div ref={(el) => (sectionsRef.current[0] = el)} className="flex flex-col items-center md:items-start">
            <motion.div
              ref={logoRef}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 mb-4 shadow-xl"
            >
              <img src={Logo} alt="City Fix Logo" className="w-16 h-16 object-contain" />
            </motion.div>
            <h3 className="font-black text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              City Fix
            </h3>
          </div>

          {/* Quick Links */}
          <div ref={(el) => (sectionsRef.current[1] = el)}>
            <h4 className="font-bold text-lg mb-4 text-purple-300">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="text-gray-300 hover:text-purple-400">
                    ▸ {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div ref={(el) => (sectionsRef.current[2] = el)}>
            <h4 className="font-bold text-lg mb-4 text-purple-300">Contact Us</h4>
            <p className="text-gray-300 text-sm">123 City Center, Dhaka</p>
          </div>

          {/* Social */}
          <div ref={(el) => (sectionsRef.current[3] = el)}>
            <h4 className="font-bold text-lg mb-4 text-purple-300">Follow Us</h4>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-xl bg-white/10 border border-white/20 ${social.color}`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-purple-600 p-4 rounded-full"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;