import React, { useEffect } from "react";
import gsap from "gsap";
import "../styles/darkBackground.css";

const AnimatedBackground = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      gsap.to(".orb-1", {
        x: 30,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-2", {
        x: -25,
        y: 30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-3", {
        x: 20,
        y: -35,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div className="animated-bg">
      <div className="orb-1"></div>
      <div className="orb-2"></div>
      <div className="orb-3"></div>
    </div>
  );
};

export default AnimatedBackground;
