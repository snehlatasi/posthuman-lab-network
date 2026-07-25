"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import type { PointerState, ScrollState } from "../types";

const createPointerState = (): PointerState => ({ x: 0, y: 0, velocity: 0 });
const createScrollState = (): ScrollState => ({ progress: 0, velocity: 0 });

function detectLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;

  return memory <= 4 || cores <= 4 || coarsePointer;
}

export function useUniverseControls() {
  const reducedMotion = useSafeReducedMotion();
  const pointerRef = useRef<PointerState>(createPointerState());
  const scrollRef = useRef<ScrollState>(createScrollState());
  const [visible, setVisible] = useState(true);
  const [lowPower] = useState(() =>
    typeof window === "undefined" ? false : detectLowPowerDevice()
  );

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastScroll = window.scrollY;
    let lastScrollTime = performance.now();

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = 0.5 - event.clientY / window.innerHeight;
      const velocity = Math.hypot(x - lastX, y - lastY) * 18;

      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.velocity = pointerRef.current.velocity * 0.82 + velocity * 0.18;

      lastX = x;
      lastY = y;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const current = window.scrollY;
      const now = performance.now();
      const deltaMs = Math.max(now - lastScrollTime, 16);

      scrollRef.current.progress = current / maxScroll;
      scrollRef.current.velocity = ((current - lastScroll) / deltaMs) * 0.018;

      lastScroll = current;
      lastScrollTime = now;
    };

    const handleVisibility = () => setVisible(!document.hidden);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return useMemo(
    () => ({
      pointerRef,
      scrollRef,
      reducedMotion,
      lowPower,
      visible,
    }),
    [lowPower, reducedMotion, visible]
  );
}
