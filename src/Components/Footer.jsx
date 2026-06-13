import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "../assets/logo.png";
import {
  FaTwitter,
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
    { name: "All Issues", path: "/all-issues" },
    { name: "Report Issue", path: "/issue-form" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      url: "https://www.facebook.com/abdul.mokim.01",
      color: "hover:text-blue-500",
    },
    {
      icon: FaTwitter,
      url: "https://x.com/AbdulMokim40428",
      color: "hover:text-sky-400",
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/abdul.mokim.01/",
      color: "hover:text-pink-500",
    },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/abdul-mokim1/",
      color: "hover:text-blue-600",
    },
    // {
    //   icon: FaGithub,
    //   url: "https://github.com/Mokim2005",
    //   color: "hover:text-gray-300",
    // },
  ];

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/08/79/64/26/360_F_879642658_OhKUCLV2Iukh3TgwPS5a8tbaaGA9qW08.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative text-white overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]"></div>

      {/* Animated background */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Logo */}
          <div ref={(el) => (sectionsRef.current[0] = el)}>
            <motion.div
              ref={logoRef}
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 p-4 rounded-xl mb-4 w-fit mx-auto md:mx-0"
            >
              <img
                src={Logo}
                alt="City Fix Logo"
                className="w-14 h-14 object-contain"
              />
            </motion.div>

            <h3 className="text-2xl font-bold text-purple-400">
              City Fix
            </h3>

            <p className="text-gray-300 text-sm mt-2">
              Improving your city's infrastructure, one report at a time.
            </p>

            {/* NEW LINE ADDED */}
            <p className="text-gray-400 text-xs mt-2">
              A smart platform to report and solve city problems efficiently.
            </p>
          </div>

          {/* Links */}
          <div ref={(el) => (sectionsRef.current[1] = el)}>
            <h4 className="mb-4 text-purple-300 font-bold">Quick Links</h4>
            {quickLinks.map((link, i) => (
              <a
                key={i}
                href={link.path}
                className="block text-gray-300 hover:text-purple-400 mb-2"
              >
                ▸ {link.name}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div ref={(el) => (sectionsRef.current[2] = el)}>
            <h4 className="mb-4 text-purple-300 font-bold">Contact</h4>

            <p className="flex gap-2 text-sm">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </p>

            <p className="flex gap-2 text-sm">
              <FaEnvelope /> support@cityfix.com
            </p>

            <p className="flex gap-2 text-sm">
              <FaPhone /> +880 1700-000000
            </p>
          </div>

          {/* Social */}
          <div ref={(el) => (sectionsRef.current[3] = el)}>
            <h4 className="mb-4 text-purple-300 font-bold">Follow</h4>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className={`bg-white/10 p-3 rounded-xl ${social.color}`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} City Fix
        </div>
      </div>

      {/* Scroll top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-purple-600 p-3 rounded-full"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;