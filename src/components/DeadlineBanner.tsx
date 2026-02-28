"use client";

import { JobListItem, getDaysRemaining, PLAY_STORE_URL } from "@/lib/api";

interface DeadlineBannerProps {
    jobs: JobListItem[];
}

export default function DeadlineBanner({ jobs }: DeadlineBannerProps) {
    const urgentJobs = jobs
        .filter((job) => {
            const days = getDaysRemaining(job.deadline);
            return days >= 0 && days <= 7;
        })
        .sort((a, b) => (a.deadline ?? 0) - (b.deadline ?? 0))
        .slice(0, 12);

    if (urgentJobs.length === 0) return null;

    return (
        <div
            className="py-2.5 px-4 flex items-center gap-3 overflow-hidden"
            style={{
                background: "linear-gradient(90deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)",
            }}
        >
            {/* Label */}
            <div className="shrink-0 flex items-center gap-1.5">
                <span className="text-sm animate-pulse">🔔</span>
                <span
                    className="text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                    style={{ color: "#FCA5A5" }}
                >
                    Closing Soon
                </span>
                <span className="text-red-400 text-xs font-bold">|</span>
            </div>

            {/* Scrolling ticker */}
            <div className="flex-1 overflow-hidden relative">
                <div
                    className="flex gap-3 items-center"
                    style={{
                        animation: "ticker-scroll 28s linear infinite",
                        width: "max-content",
                    }}
                >
                    {[...urgentJobs, ...urgentJobs].map((job, idx) => {
                        const days = getDaysRemaining(job.deadline);
                        const isVeryUrgent = days <= 3;
                        return (
                            <a
                                key={`${job.slug}-${idx}`}
                                href={PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold transition-all hover:scale-105 shrink-0"
                                style={{
                                    background: isVeryUrgent
                                        ? "rgba(220, 38, 38, 0.3)"
                                        : "rgba(245, 158, 11, 0.25)",
                                    border: `1px solid ${isVeryUrgent ? "rgba(252,165,165,0.5)" : "rgba(253,230,138,0.4)"}`,
                                    color: isVeryUrgent ? "#FCA5A5" : "#FDE68A",
                                }}
                            >
                                {isVeryUrgent ? "🔥" : "⏰"}{" "}
                                {job.postName.length > 40
                                    ? job.postName.slice(0, 40) + "…"
                                    : job.postName}
                                <span
                                    className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                                    style={{
                                        background: isVeryUrgent
                                            ? "rgba(220,38,38,0.5)"
                                            : "rgba(245,158,11,0.4)",
                                    }}
                                >
                                    {days === 0 ? "Today!" : days === 1 ? "1d left" : `${days}d left`}
                                </span>
                                <span
                                    className="text-[10px] underline underline-offset-2"
                                    style={{ color: isVeryUrgent ? "#FCA5A5" : "#FDE68A", opacity: 0.85 }}
                                >
                                    Set Alert →
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
