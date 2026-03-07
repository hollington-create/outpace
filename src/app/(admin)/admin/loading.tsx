export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-8 w-56 bg-brand-dark rounded-lg" />
        <div className="h-4 w-72 bg-brand-dark rounded-lg mt-2" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-brand-border/50 bg-brand-dark/60 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-darkest" />
              <div>
                <div className="h-3 w-24 bg-brand-darkest rounded mb-2" />
                <div className="h-7 w-12 bg-brand-darkest rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity skeleton */}
      <div className="rounded-2xl border border-brand-border/50 bg-brand-dark/60 p-6">
        <div className="h-6 w-36 bg-brand-darkest rounded-lg mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-darkest flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-full bg-brand-darkest rounded mb-2" />
                <div className="h-3 w-32 bg-brand-darkest rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
