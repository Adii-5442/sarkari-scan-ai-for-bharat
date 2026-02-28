"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PLAY_STORE_URL } from "@/lib/api";

const NAV_LINKS = [
  { label: "SSC Jobs", href: "/ssc-jobs" },
  { label: "Railway", href: "/railway-jobs" },
  { label: "Bank Jobs", href: "/bank-jobs" },
  { label: "UPSC", href: "/upsc-jobs" },
  { label: "Defence", href: "/defence-jobs" },
  { label: "Teaching", href: "/teaching-jobs" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100" style={{ boxShadow: "0 1px 12px rgba(11,63,107,0.08)" }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image src="/logo.png" alt="Sarkari Scan" width={40} height={40} className="h-9 w-auto" />
            <div className="leading-none">
              <span className="text-lg font-black text-gray-900">Sarkari</span>
              <span className="text-lg font-black text-[#0B63A8]">Scan</span>
            </div>
          </Link>

          {/* Desktop Category Nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1 mx-4 overflow-hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-[#0B63A8] hover:bg-blue-50 transition-all whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex-1 lg:flex-none" />

          {/* Download App Button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-sm"
              style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)", color: "white" }}
            >
              <Image src="/google-play-icon.png" alt="Google Play" width={18} height={18} className="w-4 h-4" />
              <span className="hidden sm:inline">Get App</span>
              <span className="sm:hidden">App</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-1.5">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#0B63A8] font-medium px-3 py-2 rounded-lg hover:bg-blue-50 text-sm transition-colors">
                🏠 Home
              </Link>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#0B63A8] font-medium px-3 py-2 rounded-lg hover:bg-blue-50 text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#0B63A8] font-medium px-3 py-2 rounded-lg hover:bg-blue-50 text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
