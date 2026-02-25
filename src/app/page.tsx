import { Suspense } from "react";
import { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title:
    "Sarkari Scan - Sarkari Naukri, Government Jobs 2026 | Latest Govt Job Notifications",
  description:
    "Sarkari Scan – India's trusted portal for latest sarkari naukri 2026, sarkari result, government job notifications. Find UPSC, SSC, Railway, Bank, Defence, Teaching govt jobs. Check eligibility, apply online & get free job alerts. Updated daily.",
  keywords: [
    "sarkari naukri",
    "sarkari naukri 2026",
    "sarkari result",
    "government jobs",
    "government jobs 2026",
    "govt jobs",
    "railway jobs 2026",
    "bank jobs 2026",
    "SSC recruitment 2026",
    "UPSC jobs 2026",
    "defense jobs",
    "police jobs",
    "teaching jobs",
    "free job alert",
    "sarkari vacancy",
    "central government jobs",
    "state government jobs",
    "10th pass govt jobs",
    "12th pass govt jobs",
  ].join(", "),
  alternates: { canonical: "https://sarkariscan.com" },
  openGraph: {
    title: "Sarkari Scan - Latest Sarkari Naukri & Government Jobs 2026",
    description:
      "Find latest sarkari naukri, sarkari result, govt job notifications. UPSC, SSC, Railway, Bank jobs. Check eligibility & apply online. Free job alerts.",
    url: "https://sarkariscan.com",
    type: "website",
  },
};

function HomePageSkeleton() {
  return (
    <div className="min-h-screen">
      <section className="hero-glass py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="h-10 rounded-lg w-80 mx-auto mb-4"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
          <div
            className="h-6 rounded w-64 mx-auto mb-6"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
          <div
            className="h-14 rounded-xl max-w-2xl mx-auto"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
        </div>
      </section>
      <section className="py-8 md:py-12 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 h-48 skeleton-shimmer"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SEOContent() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Sarkari Scan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Sarkari Scan is India's trusted portal for latest sarkari naukri (government job) notifications in ${currentYear}. It provides real-time updates on government job vacancies from UPSC, SSC, Railway, Banking, Defence, Teaching, and all other central and state government departments.`,
                },
              },
              {
                "@type": "Question",
                name: "How to check eligibility for sarkari naukri?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Download the Sarkari Scan app from Google Play Store. Enter your age, education qualification, and category. The app will instantly show you all government jobs you are eligible to apply for.",
                },
              },
              {
                "@type": "Question",
                name: "Is Sarkari Scan free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Sarkari Scan is completely free. Both the website and Android app provide free access to all government job notifications, eligibility checking, and job alerts.",
                },
              },
            ],
          }),
        }}
      />

      <section className="bg-[#F7FAFC] py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sarkari Scan – Your Trusted Source for Latest Sarkari Naukri &
              Government Jobs {currentYear}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Sarkari Scan</strong> is India&apos;s modern platform for
              discovering the latest <strong>sarkari naukri</strong> (government
              job) notifications. Whether you&apos;re looking for{" "}
              <strong>UPSC</strong>, <strong>SSC</strong>,{" "}
              <strong>Railway</strong>, <strong>Bank</strong>,{" "}
              <strong>Defence</strong>, or <strong>Teaching</strong> jobs — we
              bring all{" "}
              <strong>government job notifications {currentYear}</strong> to one
              place.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
              Latest Government Job Categories
            </h3>
            <ul className="text-gray-600 space-y-1.5 mb-4 list-disc list-inside">
              <li>
                <strong>UPSC Jobs</strong> – Civil Services (IAS/IPS/IFS),
                Engineering Services, CDS, NDA
              </li>
              <li>
                <strong>SSC Jobs</strong> – CGL, CHSL, MTS, GD Constable,
                Stenographer, JE
              </li>
              <li>
                <strong>Railway Jobs</strong> – RRB NTPC, Group D, ALP, JE, RPF
              </li>
              <li>
                <strong>Bank Jobs</strong> – SBI PO/Clerk, IBPS PO/Clerk/SO, RBI
                Grade B
              </li>
              <li>
                <strong>Defence Jobs</strong> – Indian Army, Navy, Air Force,
                BSF, CRPF
              </li>
              <li>
                <strong>Teaching Jobs</strong> – CTET, State TET, KVS, NVS,
                EMRS, DSSSB
              </li>
              <li>
                <strong>State Govt Jobs</strong> – UPPSC, BPSC, MPSC, RPSC,
                WBPSC & more
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HomePageSkeleton />}>
        <HomePageClient />
      </Suspense>
      <SEOContent />
    </>
  );
}
