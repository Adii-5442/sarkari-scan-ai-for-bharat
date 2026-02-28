import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Sarkari Scan",
  description:
    "The page you're looking for doesn't exist. Browse latest sarkari naukri and government job notifications on Sarkari Scan.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F7FAFC] px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Visual */}
        <div className="relative mb-8">
          <p
            className="text-[120px] md:text-[160px] font-black leading-none select-none"
            style={{ color: "rgba(11, 99, 168, 0.08)" }}
          >
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.49L20.49,19L15.5,14M9.5,14C7,14 5,12 5,9.5S7,5 9.5,5 14,7 14,9.5 12,14 9.5,14Z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for may have been moved or doesn&apos;t
          exist. Find your next sarkari naukri from our latest listings.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 shadow-md"
            style={{
              background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)",
            }}
          >
            🏠 Browse All Jobs
          </Link>
          <Link
            href="/sarkari-naukri"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#0B63A8] bg-white border-2 border-[#0B63A8] transition-all hover:bg-blue-50"
          >
            📋 Sarkari Naukri {currentYear}
          </Link>
        </div>

        {/* Quick Category Links */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
            Popular Categories
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: "/railway-jobs", label: "🚂 Railway" },
              { href: "/bank-jobs", label: "🏦 Bank" },
              { href: "/ssc-jobs", label: "📝 SSC" },
              { href: "/defence-jobs", label: "🛡️ Defence" },
              { href: "/upsc-jobs", label: "🏛️ UPSC" },
              { href: "/teaching-jobs", label: "📚 Teaching" },
              { href: "/police-jobs", label: "👮 Police" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:border-[#0B63A8] hover:text-[#0B63A8] transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
