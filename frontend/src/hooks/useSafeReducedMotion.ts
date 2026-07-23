/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A safe wrapper around Framer Motion's useReducedMotion hook.
 * Prevents hydration mismatches in Next.js by deferring client-side
 * media queries until the component is mounted.
 */
export function useSafeReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  const isReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? !!isReduced : false;
}
