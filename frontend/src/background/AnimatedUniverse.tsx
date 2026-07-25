"use client";

import { useEffect, useRef } from "react";
import { universeConfig } from "./config/animation";
import { useUniverseControls } from "./hooks/useUniverseControls";
import { UniverseRenderer } from "./Renderer";

export function AnimatedUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<UniverseRenderer | null>(null);
  const controls = useUniverseControls();

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new UniverseRenderer({
      canvas: canvasRef.current,
      config: universeConfig,
      pointer: controls.pointerRef.current,
      scroll: controls.scrollRef.current,
      reducedMotion: controls.reducedMotion,
      lowPower: controls.lowPower,
    });

    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [controls.lowPower, controls.pointerRef, controls.reducedMotion, controls.scrollRef]);

  useEffect(() => {
    rendererRef.current?.setReducedMotion(controls.reducedMotion);
  }, [controls.reducedMotion]);

  useEffect(() => {
    rendererRef.current?.setVisible(controls.visible);
  }, [controls.visible]);

  return (
    <div
      className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#020611] pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="universe-canvas h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-carbon-950/28 dark:bg-carbon-950/34" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,transparent_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.48)_100%)]" />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[0.2px]" />
    </div>
  );
}

export default AnimatedUniverse;
