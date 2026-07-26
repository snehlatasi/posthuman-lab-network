"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AnimatedUniverse = dynamic(
  () => import("./AnimatedUniverse").then((module) => module.AnimatedUniverse),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#020611] pointer-events-none"
        aria-hidden="true"
      />
    ),
  }
);

function shouldUseMobileFallback(): boolean {
  if (typeof window === "undefined") return true;

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowViewport = window.matchMedia("(max-width: 767px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;

  return reducedMotion || narrowViewport || coarsePointer || memory <= 4 || cores <= 4;
}

function MobileUniverseFallback() {
  return (
    <div
      className="fixed inset-0 z-0 min-h-dvh w-full overflow-hidden bg-[#020611] pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(69,236,255,0.22),transparent_24%),radial-gradient(circle_at_56%_46%,rgba(255,121,207,0.16),transparent_32%),linear-gradient(180deg,#020611_0%,#06101f_48%,#020611_100%)]" />
      <div className="absolute left-1/2 top-[42%] h-[68vw] max-h-[360px] w-[68vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.78)_0%,rgba(159,248,255,0.42)_13%,rgba(69,236,255,0.18)_31%,transparent_68%)] blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(2,6,17,0.16)_42%,rgba(2,6,17,0.72)_100%)]" />
    </div>
  );
}

export function UniverseLayer() {
  const [useFallback] = useState(shouldUseMobileFallback);
  const [canLoadWebgl, setCanLoadWebgl] = useState(false);

  useEffect(() => {
    if (useFallback) return;

    const load = () => setCanLoadWebgl(true);
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 1200 })
      : globalThis.setTimeout(load, 300);

    return () => {
      if (window.cancelIdleCallback && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else if (typeof idleId === "number") {
        globalThis.clearTimeout(idleId);
      }
    };
  }, [useFallback]);

  if (useFallback || !canLoadWebgl) {
    return <MobileUniverseFallback />;
  }

  return <AnimatedUniverse />;
}
