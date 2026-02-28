export default function Loading() {
  return (
    <div className="min-h-[60vh]">
      {/* Hero skeleton */}
      <section className="hero-glass py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="h-8 md:h-10 rounded-lg w-72 mx-auto mb-3"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
          <div
            className="h-5 rounded w-48 mx-auto mb-6"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="h-11 rounded-xl w-44 mx-auto"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
        </div>
      </section>

      {/* Breadcrumb skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="h-4 w-32 rounded skeleton-shimmer" />
      </div>

      {/* Jobs grid skeleton */}
      <section className="py-8 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-64 rounded skeleton-shimmer mb-2" />
          <div className="h-4 w-40 rounded skeleton-shimmer mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 h-48 skeleton-shimmer"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
