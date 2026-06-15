import React, { useEffect } from "react";
import gsap from "gsap";
import "../styles/darkBackground.css";

const AnimatedBackground = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      // Orb floating animations
      gsap.to(".orb-1", {
        x: 40,
        y: -30,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-2", {
        x: -35,
        y: 40,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-3", {
        x: 25,
        y: -45,
        duration: 13,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-4", {
        x: -20,
        y: 25,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scanline flicker
      gsap.to(".scanline", {
        opacity: 0.03,
        duration: 0.08,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      // Grid pulse
      gsap.to(".cyber-grid", {
        opacity: 0.06,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div className="animated-bg">
      {/* Glowing orbs */}
      <div className="orb-1"></div>
      <div className="orb-2"></div>
      <div className="orb-3"></div>
      <div className="orb-4"></div>

      {/* Cyber grid overlay */}
      <div className="cyber-grid"></div>

      {/* Scanline effect */}
      <div className="scanline"></div>

      {/* Corner glow accents */}
      <div className="corner-glow corner-tl"></div>
      <div className="corner-glow corner-br"></div>
    </div>
  );
};

export default AnimatedBackground;