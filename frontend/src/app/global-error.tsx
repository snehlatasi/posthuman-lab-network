"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="min-h-dvh bg-[#020611] px-6 py-24 text-white">
          <div className="mx-auto max-w-2xl space-y-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#9ff8ff]">
              The application hit a fatal error
            </p>
            <h1 className="font-serif text-4xl font-bold uppercase leading-tight">
              Reload this experience from a clean state.
            </h1>
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#020611] transition-colors hover:bg-[#9ff8ff]"
            >
              Reload
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
