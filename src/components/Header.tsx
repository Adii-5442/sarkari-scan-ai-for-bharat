"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { PLAY_STORE_URL } from "@/lib/api";

const NAV_LINKS = [
  { label: "SSC Jobs", href: "/ssc-jobs", icon: "📝" },
  { label: "Railway", href: "/railway-jobs", icon: "🚂" },
  { label: "Bank Jobs", href: "/bank-jobs", icon: "🏦" },
  { label: "UPSC", href: "/upsc-jobs", icon: "🏛️" },
  { label: "Defence", href: "/defence-jobs", icon: "🛡️" },
  { label: "Teaching", href: "/teaching-jobs", icon: "📚" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for subtle header shadow enhancement
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, handleKeyDown]);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0B63A8] focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-shadow duration-300"
        style={{
          boxShadow: scrolled
            ? "0 4px 20px rgba(11,63,107,0.12)"
            : "0 1px 12px rgba(11,63,107,0.06)",
        }}
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Sarkari Scan - Home">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-9 w-auto transition-transform group-hover:scale-105"
                priority
              />
              <div className="leading-none">
                <span className="text-lg font-black text-gray-900">Sarkari</span>
                <span className="text-lg font-black text-[#0B63A8]">Scan</span>
              </div>
            </Link>

            {/* Desktop Category Nav */}
            <div className="hidden lg:flex items-center gap-1 flex-1 mx-4 overflow-hidden" role="list">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-[#0B63A8] hover:bg-blue-50 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63A8] focus-visible:ring-offset-2"
                  role="listitem"
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63A8] focus-visible:ring-offset-2"
                style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)", color: "white" }}
              >
                <Image src="/google-play-icon.png" alt="" width={18} height={18} className="w-4 h-4" />
                <span className="hidden sm:inline">Get App</span>
                <span className="sm:hidden">App</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63A8]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="w-5 h-5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  style={{ transform: mobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Animated slide down */}
          <div
            id="mobile-menu"
            className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: mobileMenuOpen ? "400px" : "0px",
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            role="menu"
            aria-hidden={!mobileMenuOpen}
          >
            <div className="py-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-1.5">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#0B63A8] font-medium px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63A8]"
                  role="menuitem">
                  <span>🏠</span> Home
                </Link>
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-[#0B63A8] font-medium px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63A8]"
                    role="menuitem">
                    <span>{link.icon}</span> {link.label}
                  </Link>
                ))}
                <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#0B63A8] font-medium px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63A8]"
                  role="menuitem">
                  <span>🔒</span> Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
