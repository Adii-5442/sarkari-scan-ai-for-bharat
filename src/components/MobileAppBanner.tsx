"use client";

import { PLAY_STORE_URL } from "@/lib/api";
import { useState } from "react";

export default function MobileAppBanner() {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2 md:hidden"
            style={{
                background: "linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid rgba(11,63,107,0.1)",
                boxShadow: "0 -4px 24px rgba(11,63,107,0.1)",
            }}
        >
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)" }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8H17V6A5,5 0 0,0 12,1M12,3A3,3 0 0,1 15,6V8H9V6A3,3 0 0,1 12,3M12,11A3,3 0 0,1 15,14A3,3 0 0,1 12,17A3,3 0 0,1 9,14A3,3 0 0,1 12,11Z" />
                    </svg>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm leading-tight">Check Your Eligibility</p>
                    <p className="text-xs text-gray-500 mt-0.5">Free AI check in the Sarkari Scan app</p>
                </div>

                {/* CTA */}
                <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 rounded-xl text-white font-bold text-xs transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)" }}
                >
                    Download
                </a>

                {/* Dismiss */}
                <button
                    onClick={() => setDismissed(true)}
                    className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Dismiss"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
