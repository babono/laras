/** Marks what is in the design but not yet built in the app. */
export function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-fill/40 px-2.5 py-0.5 text-xs font-semibold text-fill">
      <span aria-hidden className="size-1.5 rounded-full bg-fill" />
      Designed, not built yet
    </span>
  );
}
