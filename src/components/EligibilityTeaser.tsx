"use client";

import { PLAY_STORE_URL } from "@/lib/api";

const FEATURES = [
    { icon: "🎯", text: "Instant AI eligibility check for 1000+ jobs" },
    { icon: "🔔", text: "Real-time alerts before deadlines close" },
    { icon: "📋", text: "Save jobs & track your applications" },
    { icon: "✅", text: "Know exactly why you qualify or not" },
];

export default function EligibilityTeaser() {
    return (
        <section
            className="py-8 border-b border-gray-100"
            style={{
                background:
                    "linear-gradient(135deg, #0B63A8 0%, #1a7fd4 50%, #0d4f87 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Left: Text content */}
                    <div className="flex-1 text-white">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                            style={{ background: "rgba(255,215,0,0.2)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.4)" }}>
                            🤖 AI-Powered Feature
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                            Know Which Govt Jobs<br />
                            <span style={{ color: "#FFD700" }}>You&apos;re Eligible For</span>
                        </h2>
                        <p className="text-sm md:text-base mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>
                            Our AI checks your age, qualification, and category against every live job — in seconds. Download the free app to get started.
                        </p>
                        <ul className="space-y-2 mb-6">
                            {FEATURES.map((f) => (
                                <li key={f.text} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                                    <span className="text-base leading-none mt-0.5">{f.icon}</span>
                                    <span>{f.text}</span>
                                </li>
                            ))}
                        </ul>
                        <a
                            href={PLAY_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                            style={{
                                background: "#FFD700",
                                color: "#0B3D6B",
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            Download Free App →
                        </a>
                    </div>

                    {/* Right: Blurred/locked form UI */}
                    <div className="flex-1 w-full max-w-sm lg:max-w-md">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}>
                            {/* Lock overlay */}
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl"
                                style={{ background: "rgba(11,63,107,0.55)", backdropFilter: "blur(3px)" }}>
                                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg"
                                    style={{ background: "rgba(255,215,0,0.2)", border: "2px solid #FFD700" }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFD700">
                                        <path d="M12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8H17V6A5,5 0 0,0 12,1M12,3A3,3 0 0,1 15,6V8H9V6A3,3 0 0,1 12,3M12,11A3,3 0 0,1 15,14A3,3 0 0,1 12,17A3,3 0 0,1 9,14A3,3 0 0,1 12,11Z" />
                                    </svg>
                                </div>
                                <p className="text-white font-bold text-base mb-1">Available on App</p>
                                <p className="text-xs text-center mb-4" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "180px" }}>
                                    AI Eligibility Check is exclusive to the Sarkari Scan app
                                </p>
                                <a
                                    href={PLAY_STORE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
                                    style={{ background: "#FFD700", color: "#0B3D6B" }}
                                >
                                    Get Free App
                                </a>
                            </div>

                            {/* Blurred form behind overlay */}
                            <div className="p-5 select-none pointer-events-none" style={{ filter: "blur(2px)", opacity: 0.5 }}>
                                <p className="text-white font-semibold text-sm mb-4">Check Your Eligibility</p>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-white/70 mb-1 block">Education Qualification</label>
                                        <div className="h-10 rounded-lg w-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <label className="text-xs text-white/70 mb-1 block">Age</label>
                                            <div className="h-10 rounded-lg" style={{ background: "rgba(255,255,255,0.2)" }} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs text-white/70 mb-1 block">Category</label>
                                            <div className="h-10 rounded-lg" style={{ background: "rgba(255,255,255,0.2)" }} />
                                        </div>
                                    </div>
                                    <div className="h-11 rounded-xl w-full mt-2" style={{ background: "rgba(255,215,0,0.6)" }} />
                                </div>
                                <div className="mt-4 space-y-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-12 rounded-lg w-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
