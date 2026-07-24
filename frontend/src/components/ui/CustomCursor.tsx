"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useSafeReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28, mass: 0.15 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Only enable on fine pointer (desktop mouse)
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion || !isVisible) return null;

  return (
    <motion.div
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)"
      }}
      animate={{
        scale: isHovered ? 2.2 : 1,
        borderColor: isHovered ? "rgba(152, 78, 50, 0.65)" : "rgba(70, 91, 64, 0.35)",
        backgroundColor: isHovered ? "rgba(152, 78, 50, 0.08)" : "rgba(70, 91, 64, 0.03)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="fixed w-6 h-6 rounded-full border pointer-events-none z-[9999] backdrop-blur-[1px] hidden md:block"
    />
  );
};
