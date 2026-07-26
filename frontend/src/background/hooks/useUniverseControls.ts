"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMobilePerformanceMode } from "@/hooks/useMobilePerformanceMode";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import type { PointerState } from "../types";

const createPointerState = (): PointerState => ({ x: 0, y: 0, velocity: 0 });

function detectLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;

  return memory <= 4 || cores <= 4 || coarsePointer;
}

export function useUniverseControls() {
  const reducedMotion = useSafeReducedMotion();
  const mobilePerformanceMode = useMobilePerformanceMode();
  const pointerRef = useRef<PointerState>(createPointerState());
  const [visible, setVisible] = useState(true);
  const [lowPower] = useState(() =>
    typeof window === "undefined" ? false : detectLowPowerDevice()
  );

  useEffect(() => {
    if (mobilePerformanceMode) return;

    let lastX = 0;
    let lastY = 0;

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

    const handleVisibility = () => setVisible(!document.hidden);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mobilePerformanceMode]);

  return useMemo(
    () => ({
      pointerRef,
      reducedMotion,
      lowPower,
      visible,
    }),
    [lowPower, reducedMotion, visible]
  );
}
