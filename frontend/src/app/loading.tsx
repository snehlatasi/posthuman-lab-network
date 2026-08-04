export default function Loading() {
  return (
    <main className="min-h-dvh bg-bone-50 px-6 py-32 text-carbon-950 dark:bg-carbon-950 dark:text-bone-100">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <div className="h-10 w-10 rounded-full border border-earth-500/25 border-t-earth-600 animate-spin" />
        <div className="space-y-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-earth-600 dark:text-earth-400">
            Loading
          </p>
          <p className="font-serif text-2xl font-bold uppercase text-carbon-950 dark:text-bone-50">
            Preparing the next section
          </p>
        </div>
      </div>
    </main>
  );
}
