"use client";

import { PLAY_STORE_URL } from "@/lib/api";
import { useState, useEffect } from "react";

const DISMISS_KEY = "sarkari-scan-app-banner-dismissed";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function MobileAppBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Check if previously dismissed within the cooldown period
        try {
            const dismissedAt = localStorage.getItem(DISMISS_KEY);
            if (dismissedAt) {
                const elapsed = Date.now() - parseInt(dismissedAt, 10);
                if (elapsed < DISMISS_DURATION_MS) return;
            }
        } catch { /* localStorage unavailable */ }

        // Delay showing banner so it doesn't block initial paint
        const timer = setTimeout(() => setVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    function handleDismiss() {
        setVisible(false);
        try {
            localStorage.setItem(DISMISS_KEY, String(Date.now()));
        } catch { /* localStorage unavailable */ }
    }

    if (!visible) return null;

    return (
        <>
            {/* Spacer so page content isn't hidden behind the fixed banner */}
            <div className="h-20 md:hidden" aria-hidden="true" />

            <div
                className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2 md:hidden animate-slide-up"
                style={{
                    background: "linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderTop: "1px solid rgba(11,63,107,0.1)",
                    boxShadow: "0 -4px 24px rgba(11,63,107,0.1)",
                }}
                role="complementary"
                aria-label="Download mobile app"
            >
                <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)" }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                            <path d="M17,1H7A2,2 0 0,0 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3A2,2 0 0,0 17,1M17,19H7V5H17M12,17A1.5,1.5 0 0,0 13.5,15.5A1.5,1.5 0 0,0 12,14A1.5,1.5 0 0,0 10.5,15.5A1.5,1.5 0 0,0 12,17Z" />
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
                        className="shrink-0 px-4 py-2 rounded-xl text-white font-bold text-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63A8]"
                        style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)" }}
                    >
                        Download
                    </a>

                    {/* Dismiss */}
                    <button
                        onClick={handleDismiss}
                        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Dismiss app banner"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
