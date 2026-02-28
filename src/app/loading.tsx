export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full border-[3px] border-gray-200 border-t-[#0B63A8] animate-spin"
            role="status"
            aria-label="Loading page"
          />
        </div>
        <p className="text-sm text-gray-400 font-medium animate-pulse">
          Loading jobs...
        </p>
      </div>
    </div>
  );
}
