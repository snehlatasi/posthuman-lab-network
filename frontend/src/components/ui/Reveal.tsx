"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  staggerChildren?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 24,
  xOffset = 0,
  scale = 1,
  staggerChildren = 0
}) => {
  const shouldReduceMotion = useSafeReducedMotion();

  // If user prefers reduced motion, bypass standard transform displacements
  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  if (staggerChildren > 0) {
    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerChildren,
          delayChildren: delay
        }
      }
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const singleVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      x: xOffset,
      scale: scale
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // Out-expo bezier curve (premium, smooth feel)
      }
    }
  };

  return (
    <motion.div
      variants={singleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string; yOffset?: number }> = ({ 
  children, 
  className = "",
  yOffset = 16
}) => {
  const shouldReduceMotion = useSafeReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { ease: [0.16, 1, 0.3, 1] as [number, number, number, number], duration: 0.6 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
