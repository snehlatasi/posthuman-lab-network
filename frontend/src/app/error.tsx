"use client";

import { useEffect } from "react";
import { logError } from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError("Application route error", error);
  }, [error]);

  return (
    <main className="min-h-dvh bg-bone-50 px-6 py-24 text-carbon-950 dark:bg-carbon-950 dark:text-bone-100">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-earth-600 dark:text-earth-400">
          Something interrupted this page
        </p>
        <h1 className="font-serif text-4xl font-bold uppercase leading-tight">
          The page can be retried without leaving the site.
        </h1>
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-carbon-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-bone-50 transition-colors hover:bg-earth-600 dark:bg-earth-600 dark:hover:bg-earth-500"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
