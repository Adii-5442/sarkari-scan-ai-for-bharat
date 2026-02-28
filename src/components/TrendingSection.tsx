"use client";

import Link from "next/link";
import { JobListItem, getDaysRemaining } from "@/lib/api";

interface TrendingSectionProps {
    jobs: JobListItem[];
}

export default function TrendingSection({ jobs }: TrendingSectionProps) {
    const trendingJobs = [...jobs]
        .filter((job) => {
            const num =
                typeof job.vacancies === "string"
                    ? parseInt(job.vacancies, 10)
                    : job.vacancies;
            return !isNaN(num) && num > 0;
        })
        .sort((a, b) => {
            const numA =
                typeof a.vacancies === "string"
                    ? parseInt(a.vacancies, 10)
                    : a.vacancies;
            const numB =
                typeof b.vacancies === "string"
                    ? parseInt(b.vacancies, 10)
                    : b.vacancies;
            return (numB as number) - (numA as number);
        })
        .slice(0, 6);

    if (trendingJobs.length === 0) return null;

    return (
        <section className="py-6 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        🔥 <span>Trending Vacancies</span>
                        <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "#FEF3C7", color: "#D97706" }}
                        >
                            High Vacancy
                        </span>
                    </h2>
                    <span className="text-xs text-gray-400">Scroll →</span>
                </div>

                {/* Horizontal scroll row */}
                <div
                    className="flex gap-3 overflow-x-auto pb-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {trendingJobs.map((job, idx) => {
                        const vacancyNum =
                            typeof job.vacancies === "string"
                                ? parseInt(job.vacancies, 10)
                                : job.vacancies;
                        const daysLeft = getDaysRemaining(job.deadline);
                        const isUrgent = daysLeft >= 0 && daysLeft <= 7;

                        const gradients = [
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                            "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                            "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                            "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                            "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
                        ];

                        return (
                            <Link
                                key={job.slug}
                                href={`/jobs/${job.slug}`}
                                className="shrink-0 flex flex-col justify-between rounded-2xl p-4 transition-all hover:scale-105 hover:shadow-xl"
                                style={{
                                    background: gradients[idx % gradients.length],
                                    width: "200px",
                                    minHeight: "140px",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                                }}
                            >
                                {/* Rank badge */}
                                <div className="flex items-start justify-between mb-2">
                                    <span
                                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                                        style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
                                    >
                                        #{idx + 1} Trend
                                    </span>
                                    {isUrgent && (
                                        <span
                                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                                            style={{ background: "rgba(220,38,38,0.5)", color: "white" }}
                                        >
                                            {daysLeft === 0 ? "Today!" : `${daysLeft}d left`}
                                        </span>
                                    )}
                                </div>

                                {/* Vacancy count */}
                                <div className="my-1">
                                    <p
                                        className="text-3xl font-black leading-none"
                                        style={{ color: "rgba(255,255,255,0.95)" }}
                                    >
                                        {vacancyNum >= 1000
                                            ? `${(vacancyNum / 1000).toFixed(1)}K`
                                            : vacancyNum}
                                    </p>
                                    <p
                                        className="text-xs font-semibold mt-0.5"
                                        style={{ color: "rgba(255,255,255,0.8)" }}
                                    >
                                        Vacancies
                                    </p>
                                </div>

                                {/* Job name */}
                                <p
                                    className="text-xs font-semibold leading-snug line-clamp-2 mt-auto"
                                    style={{ color: "rgba(255,255,255,0.95)" }}
                                >
                                    {job.postName}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
