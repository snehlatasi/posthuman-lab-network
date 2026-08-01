"use client";

import { useTheme } from "@/context/ThemeContext";

interface StaticUniverseFallbackProps {
  animated?: boolean;
}

const petalIndexes = Array.from({ length: 18 }, (_, index) => index);
const waveIndexes = Array.from({ length: 4 }, (_, index) => index);

export function CssUniverseOrbit({ isDark }: { isDark: boolean }) {
  return (
    <div className="mobile-universe-orbit absolute left-1/2 top-[42%] h-[72vw] max-h-[360px] w-[72vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2">
      {petalIndexes.map((index) => (
        <span
          key={index}
          className={`mobile-universe-petal ${isDark ? "mobile-universe-petal-dark" : "mobile-universe-petal-light"}`}
          style={
            {
              "--petal-angle": `${index * 20}deg`,
              "--petal-delay": `${index * -0.42}s`,
            } as React.CSSProperties
          }
        />
      ))}
      {waveIndexes.map((index) => (
        <span
          key={index}
          className={`mobile-universe-wave ${isDark ? "mobile-universe-wave-dark" : "mobile-universe-wave-light"}`}
          style={{ "--wave-delay": `${index * -1.4}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function StaticUniverseFallback({ animated = false }: StaticUniverseFallbackProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      data-testid="static-universe-fallback"
      className={`fixed inset-0 z-0 min-h-dvh w-full overflow-hidden pointer-events-none transition-colors duration-300 ${
        isDark ? "bg-[#020611]" : "bg-[#f8f1e6]"
      }`}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_50%_38%,rgba(69,236,255,0.22),transparent_24%),radial-gradient(circle_at_56%_46%,rgba(255,121,207,0.16),transparent_32%),linear-gradient(180deg,#020611_0%,#06101f_48%,#020611_100%)]"
            : "bg-[radial-gradient(circle_at_50%_38%,rgba(69,236,255,0.2),transparent_30%),radial-gradient(circle_at_56%_46%,rgba(202,117,85,0.16),transparent_38%),linear-gradient(180deg,#fffaf0_0%,#f8f1e6_48%,#efe4d4_100%)]"
        }`}
      />
      <div
        className={`absolute left-1/2 top-[42%] h-[68vw] max-h-[360px] w-[68vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px] ${
          isDark
            ? "bg-[radial-gradient(circle,rgba(255,255,255,0.42)_0%,rgba(159,248,255,0.28)_15%,rgba(255,121,207,0.14)_34%,transparent_70%)]"
            : "bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(69,236,255,0.2)_20%,rgba(152,78,50,0.14)_42%,transparent_74%)]"
        }`}
      />
      {animated && <CssUniverseOrbit isDark={isDark} />}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(2,6,17,0.16)_42%,rgba(2,6,17,0.72)_100%)]"
            : "bg-[linear-gradient(90deg,rgba(255,250,240,0.76)_0%,rgba(255,250,240,0.42)_38%,rgba(248,241,230,0.08)_68%,rgba(248,241,230,0.16)_100%)]"
        }`}
      />
    </div>
  );
}
