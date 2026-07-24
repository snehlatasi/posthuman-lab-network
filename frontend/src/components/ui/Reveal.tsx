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

interface SplitTextProps {
  text: string;
  className?: string;
  mode?: "words" | "chars";
  delay?: number;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  mode = "words",
  delay = 0.1,
  stagger = 0.04,
  as: Component = "h2"
}) => {
  const shouldReduceMotion = useSafeReducedMotion();
  const Tag = Component as any;

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const items = mode === "chars" ? text.split("") : text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: "115%",
      rotateX: -12
    },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="inline-block flex-wrap"
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden pb-1 -mb-1 align-top mr-[0.25em] last:mr-0"
          >
            <motion.span
              variants={childVariants}
              className="inline-block origin-bottom-left"
            >
              {item === "" ? "\u00A0" : item}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
