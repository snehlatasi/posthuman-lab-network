import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const emptySubscribe = () => () => {};

/**
 * A safe wrapper around Framer Motion's useReducedMotion hook.
 * Prevents hydration mismatches in Next.js by deferring client-side
 * media queries until the component is mounted.
 */
export function useSafeReducedMotion(): boolean {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const isReduced = useReducedMotion();

  return isClient ? !!isReduced : false;
}
