"use client";

import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticProps> = ({
  children,
  strength = 0.3,
  className = ""
}) => {
  const shouldReduceMotion = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 14, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
