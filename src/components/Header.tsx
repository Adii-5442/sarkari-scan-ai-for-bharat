"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PLAY_STORE_URL } from "@/lib/api";

const PlayStoreIcon = () => (
  <Image
    src="/google-play-icon.png"
    alt="Google Play"
    width={20}
    height={20}
    className="w-5 h-5"
  />
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo.png"
              alt="Sarkari Scan"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <div>
              <span className="text-xl font-bold text-gray-900">Sarkari</span>
              <span className="text-xl font-bold text-[#0B63A8]">Scan</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-12">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#0B63A8] font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/privacy-policy"
              className="text-gray-700 hover:text-[#0B63A8] font-medium transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="flex-1" />

          {/* Download App Button */}
          <div className="flex items-center gap-3">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0B63A8] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#084B80] transition-colors shadow-sm"
            >
              <PlayStoreIcon />
              <span className="hidden sm:inline">Get App</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#0B63A8] font-medium px-2 py-2 rounded-lg hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                href="/privacy-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#0B63A8] font-medium px-2 py-2 rounded-lg hover:bg-gray-50"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
