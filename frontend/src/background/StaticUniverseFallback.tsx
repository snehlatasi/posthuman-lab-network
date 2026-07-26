"use client";

import { useTheme } from "@/context/ThemeContext";

export function StaticUniverseFallback() {
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
            : "bg-[radial-gradient(circle_at_50%_38%,rgba(69,236,255,0.08),transparent_28%),radial-gradient(circle_at_56%_46%,rgba(202,117,85,0.08),transparent_36%),linear-gradient(180deg,#fffaf0_0%,#f8f1e6_48%,#efe4d4_100%)]"
        }`}
      />
      <div
        className={`absolute left-1/2 top-[42%] h-[68vw] max-h-[360px] w-[68vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px] ${
          isDark
            ? "bg-[radial-gradient(circle,rgba(255,255,255,0.78)_0%,rgba(159,248,255,0.42)_13%,rgba(69,236,255,0.18)_31%,transparent_68%)]"
            : "bg-[radial-gradient(circle,rgba(255,255,255,0.72)_0%,rgba(159,248,255,0.1)_18%,rgba(202,117,85,0.08)_36%,transparent_70%)]"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(2,6,17,0.16)_42%,rgba(2,6,17,0.72)_100%)]"
            : "bg-[linear-gradient(90deg,rgba(255,250,240,0.96)_0%,rgba(255,250,240,0.9)_38%,rgba(248,241,230,0.82)_68%,rgba(248,241,230,0.94)_100%)]"
        }`}
      />
    </div>
  );
}
