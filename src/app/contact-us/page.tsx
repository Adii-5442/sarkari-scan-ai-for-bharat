"use client";



export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-[#F7FAFC]">

            {/* Header Banner */}
            <div
                className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-center text-white relative"
                style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)" }}
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10mix-blend-overlay"></div>
                <div className="relative z-10 max-w-2xl mx-auto animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Get in Touch</h1>
                    <p className="text-lg text-blue-100 font-medium">Have an issue or a suggestion? We&apos;d love to hear from you.</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">

                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row animate-fade-in-up" style={{ animationDelay: "0.1s" }}>

                    {/* Contact Information Side */}
                    <div className="bg-gray-900 text-white p-10 md:w-5/12 relative overflow-hidden">
                        {/* Background design elements */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full border border-gray-800 opacity-50"></div>
                        <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full border-4 border-gray-800 opacity-30"></div>

                        <h2 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h2>

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                                    <span className="text-lg">📧</span>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm font-medium mb-1">Email Support</h3>
                                    <a href="mailto:adi.sh5442@gmail.com" className="text-white hover:text-blue-400 transition-colors font-medium text-lg">
                                        adi.sh5442@gmail.com
                                    </a>
                                    <p className="text-gray-500 text-xs mt-1">We aim to reply within 48 hours.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                                    <span className="text-lg">⏱️</span>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm font-medium mb-1">Support Hours</h3>
                                    <p className="text-white font-medium">Monday - Friday</p>
                                    <p className="text-gray-500 text-sm">10:00 AM - 6:00 PM (IST)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                                    <span className="text-lg">📱</span>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm font-medium mb-1">App Support</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        For faster resolution regarding app issues, please use the in-app support option in the Profile section.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Side */}
                    <div className="p-10 md:w-7/12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

                        <form className="space-y-5" action={() => { }} onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B63A8]/20 focus:border-[#0B63A8] outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B63A8]/20 focus:border-[#0B63A8] outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B63A8]/20 focus:border-[#0B63A8] outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B63A8]/20 focus:border-[#0B63A8] outline-none transition-all bg-white"
                                >
                                    <option>General Inquiry</option>
                                    <option>Bug Report</option>
                                    <option>App Support</option>
                                    <option>Feature Request</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B63A8]/20 focus:border-[#0B63A8] outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="w-full py-3 px-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-2"
                                style={{ background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)" }}
                                onClick={(e) => {
                                    const target = e.currentTarget;
                                    target.innerText = "Sent!";
                                    target.style.background = "#10B981";
                                    setTimeout(() => {
                                        target.innerText = "Send Message";
                                        target.style.background = "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)";
                                    }, 3000);
                                }}
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQs Section */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                q: "Is Sarkari Scan an official government app?",
                                a: "No, Sarkari Scan is a private platform. We collect information from publicly available official government websites to help candidates discover jobs easily."
                            },
                            {
                                q: "How do I check my eligibility?",
                                a: "You can download our Android app and create a profile with your details. The app will automatically tell you which jobs you qualify for."
                            },
                            {
                                q: "Are the job updates reliable?",
                                a: "Yes! Every job listed on our platform includes a direct link to the original, official government notification for you to verify."
                            },
                            {
                                q: "Is the service free to use?",
                                a: "Yes, browsing jobs and getting alerts is completely free."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in-up" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
