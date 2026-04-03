export function PageLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="container-app flex flex-1 flex-col items-center justify-center gap-4 py-24">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-border/70 border-t-brand-accent"
        aria-hidden="true"
      />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
