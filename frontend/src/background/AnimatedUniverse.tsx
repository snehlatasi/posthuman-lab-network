"use client";

import { useEffect, useRef, useState } from "react";
import { universeConfig } from "./config/animation";
import { useUniverseControls } from "./hooks/useUniverseControls";
import { isWebGLAvailable, UniverseRenderer } from "./Renderer";
import { StaticUniverseFallback } from "./StaticUniverseFallback";

export function AnimatedUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<UniverseRenderer | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const controls = useUniverseControls();

  useEffect(() => {
    if (webglUnavailable) return;

    let cancelled = false;
    let renderer: UniverseRenderer | null = null;

    const initializeRenderer = () => {
      if (cancelled || !canvasRef.current) return;

      if (!isWebGLAvailable()) {
        console.warn("Universe background disabled: WebGL is unavailable in this browser.");
        setWebglUnavailable(true);
        return;
      }

      try {
        renderer = new UniverseRenderer({
          canvas: canvasRef.current,
          config: universeConfig,
          pointer: controls.pointerRef.current,
          scroll: controls.scrollRef.current,
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

    const frameId = requestAnimationFrame(initializeRenderer);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      renderer?.dispose();
      if (rendererRef.current === renderer) {
        rendererRef.current = null;
      }
    };
  }, [
    controls.lowPower,
    controls.pointerRef,
    controls.reducedMotion,
    controls.scrollRef,
    webglUnavailable,
  ]);

  useEffect(() => {
    rendererRef.current?.setReducedMotion(controls.reducedMotion);
  }, [controls.reducedMotion]);

  useEffect(() => {
    rendererRef.current?.setVisible(controls.visible);
  }, [controls.visible]);

  if (webglUnavailable) {
    return <StaticUniverseFallback />;
  }

  return (
    <div
      className="fixed inset-0 z-0 min-h-dvh w-full overflow-hidden bg-[#020611] pointer-events-none"
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
