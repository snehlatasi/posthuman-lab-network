"use client";

export function StaticUniverseFallback() {
  return (
    <div
      data-testid="static-universe-fallback"
      className="fixed inset-0 z-0 min-h-dvh w-full overflow-hidden bg-[#020611] pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(69,236,255,0.22),transparent_24%),radial-gradient(circle_at_56%_46%,rgba(255,121,207,0.16),transparent_32%),linear-gradient(180deg,#020611_0%,#06101f_48%,#020611_100%)]" />
      <div className="absolute left-1/2 top-[42%] h-[68vw] max-h-[360px] w-[68vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.78)_0%,rgba(159,248,255,0.42)_13%,rgba(69,236,255,0.18)_31%,transparent_68%)] blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(2,6,17,0.16)_42%,rgba(2,6,17,0.72)_100%)]" />
    </div>
  );
}
