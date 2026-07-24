"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export const ParallaxGlows: React.FC = () => {
  const shouldReduceMotion = useSafeReducedMotion();
  const { scrollY } = useScroll();

  // Scroll-linked parallax transforms for ambient background glows
  const glow1Y = useTransform(scrollY, [0, 2000], [0, 240]);
  const glow1X = useTransform(scrollY, [0, 2000], [0, -70]);
  const glow1Scale = useTransform(scrollY, [0, 2000], [1, 1.2]);

  const glow2Y = useTransform(scrollY, [0, 2000], [0, -160]);
  const glow2X = useTransform(scrollY, [0, 2000], [0, 90]);
  const glow2Scale = useTransform(scrollY, [0, 2000], [1, 0.88]);

  const glow3Y = useTransform(scrollY, [0, 2000], [0, 300]);
  const glow3X = useTransform(scrollY, [0, 2000], [0, -50]);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        style={{ y: glow1Y, x: glow1X, scale: glow1Scale }}
        className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-earth-400/20 blur-[130px]"
      />
      <motion.div
        style={{ y: glow2Y, x: glow2X, scale: glow2Scale }}
        className="absolute top-[25%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-moss-400/18 blur-[140px]"
      />
      <motion.div
        style={{ y: glow3Y, x: glow3X }}
        className="absolute bottom-[10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-teal-400/15 blur-[120px]"
      />
    </div>
  );
};
