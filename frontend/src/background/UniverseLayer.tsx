"use client";

import dynamic from "next/dynamic";

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

export function UniverseLayer() {
  return <AnimatedUniverse />;
}
