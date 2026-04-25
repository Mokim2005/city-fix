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
    // Logo animation
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

    // Sections animation
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
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]"></div>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo & About Section */}
          <div
            ref={(el) => (sectionsRef.current[0] = el)}
            className="flex flex-col items-center md:items-start"
          >
            <motion.div
              ref={logoRef}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 mb-4 shadow-xl"
            >
              <img
                src={Logo}
                alt="City Fix Logo"
                className="w-16 h-16 object-contain"
              />
            </motion.div>
            <h3 className="font-black text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              City Fix
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed text-center md:text-left max-w-xs">
              Improving your city's infrastructure, one report at a time.
              Together, we build smarter, safer communities.
            </p>
          </div>

          {/* Quick Links */}
          <div
            ref={(el) => (sectionsRef.current[1] = el)}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="font-bold text-lg mb-4 text-purple-300">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-purple-400">▸</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            ref={(el) => (sectionsRef.current[2] = el)}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="font-bold text-lg mb-4 text-purple-300">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-purple-400 mt-1 flex-shrink-0" />
                <span>123 City Center, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-purple-400 flex-shrink-0" />
                <a
                  href="mailto:support@cityfix.com"
                  className="hover:text-purple-400 transition-colors"
                >
                  support@cityfix.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-purple-400 flex-shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="hover:text-purple-400 transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div
            ref={(el) => (sectionsRef.current[3] = el)}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="font-bold text-lg mb-4 text-purple-300">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`backdrop-blur-xl bg-white/10 border border-white/20 p-3 rounded-xl text-xl ${social.color} transition-all duration-300 shadow-lg hover:shadow-purple-500/50`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="w-full max-w-xs">
              <h5 className="font-semibold text-sm mb-3 text-gray-300">
                Subscribe to Newsletter
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-sm shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} City Fix. All rights reserved. Made
            with ❤️ for better cities.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <a
              href="/privacy"
              className="hover:text-purple-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-purple-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 backdrop-blur-xl bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all z-50 border border-white/20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <FaArrowUp className="text-white text-xl" />
      </motion.button>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"></div>
    </footer>
  );
};

export default Footer;
