import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Sarkari Scan",
    description:
        "Learn more about Sarkari Scan, India's trusted AI-powered platform for discovering government job notifications.",
    alternates: {
        canonical: "https://sarkariscan.com/about-us",
    },
};

export default function AboutUsPage() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-[#F7FAFC]">
            {/* Hero Section */}
            <div
                className="relative py-20 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)" }}
            >
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                        Empowering Bharat&apos;s Job Seekers
                    </h1>
                    <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto font-medium" style={{ lineHeight: 1.6 }}>
                        Sarkari Scan simplifies the government job discovery process, bringing clarity and structure to fragmented notifications.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">

                {/* Mission Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-12 mb-12 border border-gray-100 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4 bg-blue-50 text-[#0B63A8]">
                                🎯 Our Mission
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                Making Sarkari Naukri Accessible to Everyone
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                For decades, finding suitable government jobs meant sifting through complex PDFs, confusing newspaper clippings, and scattered websites.
                                We built Sarkari Scan to solve this problem using technology. Our platform bridges the gap between aspirants and opportunities.
                            </p>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <div className="bg-gradient-to-br from-[#0B63A8] to-[#084B80] rounded-2xl p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                                <div className="relative z-10">
                                    <div className="text-5xl mb-4">🇮🇳</div>
                                    <h3 className="text-2xl font-bold mb-2">Built for Bharat</h3>
                                    <p className="text-blue-100 font-medium">We aggregate, normalize, and distribute job data so you can focus on preparing for the exam, not searching for it.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What We Do grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">What We Do</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "🔍",
                                title: "Aggregate Notifications",
                                desc: "We scan official government websites daily to bring all active job notifications onto one single platform."
                            },
                            {
                                icon: "🤖",
                                title: "AI-Powered Analysis",
                                desc: "Our AI systems read through complex PDF notifications to extract precise eligibility criteria instantly."
                            },
                            {
                                icon: "⚡",
                                title: "Smart Matching",
                                desc: "Our Android app checks your profile against job requirements, telling you exactly which jobs you can apply for."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${0.1 + (i * 0.1)}s` }}>
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    {/* Decorative lines */}
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent right-1/4 opacity-50"></div>
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent right-2/4 opacity-50"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-5/12">
                            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We believe that finding a government job should be free, simple, and reliable. That&apos;s why we maintain strict standards for our platform.
                            </p>
                        </div>

                        <div className="md:w-7/12 grid sm:grid-cols-2 gap-6 w-full">
                            {[
                                { title: "Ad-Free", desc: "No distracting ads. We keep the platform clean so you can focus." },
                                { title: "Authentic", desc: "Every job has a direct link to the official government notification." },
                                { title: "Privacy First", desc: "Your personal data is encrypted and never shared with third parties." },
                                { title: "Fast", desc: "Our platform is optimized to load instantly, even on slower networks." }
                            ].map((val, i) => (
                                <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 hover:bg-gray-750 transition-colors">
                                    <h4 className="text-lg font-bold text-gray-100 mb-2">{val.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}
