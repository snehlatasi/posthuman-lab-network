"use client";

import { useEffect, useRef, useState } from "react";
import { universeConfig } from "./config/animation";
import { useUniverseControls } from "./hooks/useUniverseControls";
import { isWebGLAvailable, UniverseRenderer } from "./Renderer";
import { StaticUniverseFallback } from "./StaticUniverseFallback";
import { useTheme } from "@/context/ThemeContext";
import { logWarning } from "@/lib/logger";

export function AnimatedUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<UniverseRenderer | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const controls = useUniverseControls();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (webglUnavailable) return;

    let cancelled = false;
    let renderer: UniverseRenderer | null = null;
    let frameId: number | null = null;

    const initializeRenderer = () => {
      if (cancelled || !canvasRef.current) return;

      if (!isWebGLAvailable()) {
        logWarning("Universe background disabled: WebGL is unavailable in this browser.");
        setWebglUnavailable(true);
        return;
      }

      try {
        renderer = new UniverseRenderer({
          canvas: canvasRef.current,
          config: universeConfig,
          pointer: controls.pointerRef.current,
          reducedMotion: controls.reducedMotion,
          lowPower: controls.lowPower,
          onFatalError: () => {
            setWebglUnavailable(true);
          },
        });

        rendererRef.current = renderer;
        renderer.start();
      } catch {
        setWebglUnavailable(true);
      }
    };

    frameId = window.requestAnimationFrame(initializeRenderer);

    return () => {
      cancelled = true;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      renderer?.dispose();
      if (rendererRef.current === renderer) {
        rendererRef.current = null;
      }
    };
  }, [
    controls.lowPower,
    controls.pointerRef,
    controls.reducedMotion,
    webglUnavailable,
  ]);

  useEffect(() => {
    rendererRef.current?.setReducedMotion(controls.reducedMotion);
  }, [controls.reducedMotion]);

  useEffect(() => {
    rendererRef.current?.setVisible(controls.visible);
  }, [controls.visible]);

  if (webglUnavailable) {
    return <StaticUniverseFallback animated />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`fixed inset-0 z-0 min-h-dvh w-full overflow-hidden pointer-events-none transition-colors duration-300 ${
        isDark ? "bg-[#020611]" : "bg-[#f8f1e6]"
      }`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="universe-canvas h-full w-full opacity-100"
      />
      <div
        className={`pointer-events-none absolute inset-0 transition-colors duration-300 ${
          isDark ? "bg-carbon-950/34" : "bg-bone-50/18"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_52%_42%,transparent_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.48)_100%)]"
            : "bg-[linear-gradient(90deg,rgba(255,250,240,0.76)_0%,rgba(255,250,240,0.42)_38%,rgba(248,241,230,0.08)_68%,rgba(248,241,230,0.16)_100%)]"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[0.2px]" />
    </div>
  );
}

export default AnimatedUniverse;
