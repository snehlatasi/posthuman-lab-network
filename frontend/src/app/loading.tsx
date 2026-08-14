export default function Loading() {
  return (
    <main className="min-h-dvh bg-bone-50 px-6 py-28 text-carbon-950 dark:bg-carbon-950 dark:text-bone-100">
      <div className="mx-auto flex max-w-sm items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-earth-600 dark:bg-earth-400" />
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-carbon-700 dark:text-bone-300">
          Loading
        </p>
      </div>
    </main>
  );
}
