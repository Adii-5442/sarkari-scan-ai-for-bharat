import Link from "next/link";
import Image from "next/image";
import { PLAY_STORE_URL } from "@/lib/api";

const PlayStoreIcon = () => (
  <Image
    src="/google-play-icon.png"
    alt="Google Play"
    width={24}
    height={24}
    className="w-6 h-6"
  />
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* App Download Banner */}
      <div className="download-banner py-12 px-4 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="Sarkari Scan"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Get the Sarkari Scan App
            </h2>
          </div>
          <p className="text-white mb-3 max-w-2xl mx-auto text-lg">
            Check eligibility for all jobs • Get instant alerts • Track
            deadlines
          </p>
          <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm">
            One tap to see which jobs you can apply for based on your age &
            education
          </p>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <PlayStoreIcon />
            <span>Get Free on Play Store</span>
          </a>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Sarkari Scan"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <span className="text-xl font-bold">Sarkari</span>
                <span className="text-xl font-bold text-highlight-light">
                  Scan
                </span>
              </div>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed text-sm">
              Sarkari Scan is India&apos;s trusted portal for the latest{" "}
              <strong className="text-gray-300">sarkari naukri</strong>{" "}
              notifications. Find, check eligibility, and apply for{" "}
              <strong className="text-gray-300">
                government jobs {currentYear}
              </strong>{" "}
              — UPSC, SSC, Railway, Banks, Defence, Teaching & State Govt jobs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                {
                  href: "/sarkari-naukri",
                  label: `Sarkari Naukri ${currentYear}`,
                },
                { href: "/government-jobs", label: "Government Jobs" },
                { href: PLAY_STORE_URL, label: "Download App", external: true },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Jobs by Category</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/railway-jobs", label: `Railway Jobs ${currentYear}` },
                { href: "/bank-jobs", label: "Bank Jobs – SBI, IBPS" },
                { href: "/ssc-jobs", label: "SSC Jobs – CGL, CHSL, MTS" },
                {
                  href: "/defence-jobs",
                  label: "Defence Jobs – Army, Navy, AF",
                },
                { href: "/upsc-jobs", label: "UPSC Jobs – IAS, IPS, CDS" },
                { href: "/teaching-jobs", label: "Teaching Jobs – CTET, KVS" },
                { href: "/police-jobs", label: "Police Jobs – Constable, SI" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
            <ul className="space-y-2.5">
              {[
                {
                  href: "/sarkari-naukri",
                  label: `Sarkari Naukri ${currentYear}`,
                },
                {
                  href: "/government-jobs",
                  label: `Latest Govt Jobs ${currentYear}`,
                },
                { href: "/10th-pass-govt-jobs", label: "10th Pass Govt Jobs" },
                { href: "/12th-pass-govt-jobs", label: "12th Pass Govt Jobs" },
                { href: "/bank-jobs", label: "Bank PO & Clerk Jobs" },
                { href: "/ssc-jobs", label: `SSC CGL / CHSL ${currentYear}` },
                {
                  href: "/railway-jobs",
                  label: `RRB Railway Jobs ${currentYear}`,
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO Footer Text */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-xs leading-relaxed">
            <strong className="text-gray-400">Sarkari Scan</strong> provides the
            latest <strong className="text-gray-400">sarkari naukri</strong>{" "}
            notifications,{" "}
            <strong className="text-gray-400">sarkari result</strong> updates,
            and <strong className="text-gray-400">government job</strong> alerts
            for {currentYear}. Our platform covers UPSC, SSC, RRB, IBPS, State
            PSCs, Defence, Police, Teaching, and PSU recruitment. Whether
            you&apos;re looking for{" "}
            <strong className="text-gray-400">10th pass govt jobs</strong>,{" "}
            <strong className="text-gray-400">12th pass government jobs</strong>
            , or{" "}
            <strong className="text-gray-400">
              graduation level sarkari naukri
            </strong>
            , Sarkari Scan helps you find the right opportunity. Download the
            app for free instant job alerts.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Sarkari Scan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/sarkari-naukri"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Sarkari Naukri
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/government-jobs"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Govt Jobs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
