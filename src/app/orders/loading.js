
export default function Loading() {
  return (
    <div className="space-y-3 p-6" aria-label="Loading dashboard">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-10 animate-pulse rounded bg-slate-200"
        />
      ))}
    </div>
  );
}
