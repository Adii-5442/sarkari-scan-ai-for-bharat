import { Metadata } from "next";
import Link from "next/link";
import { getJobs, PLAY_STORE_URL, JobListItem } from "@/lib/api";
import JobCard from "@/components/JobCard";
import { generateBreadcrumbJsonLd } from "@/lib/structured-data";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Police Jobs ${currentYear} | Sarkari Naukri | Sarkari Scan`,
  description: `State Police Constable, Head Constable, SI, Inspector, CISF, BSF recruitment ${currentYear}. Find latest vacancies, eligibility, salary, and apply online. Updated daily.`,
  alternates: { canonical: `https://sarkariscan.com/police-jobs` },
  openGraph: {
    title: `Police Jobs ${currentYear} – Sarkari Scan`,
    description: `State Police Constable, Head Constable, SI, Inspector, CISF, BSF recruitment. Latest notifications ${currentYear}.`,
    url: `https://sarkariscan.com/police-jobs`, type: "website",
  },
};

export const revalidate = 300;

export default async function CategoryPage() {
  let jobs: JobListItem[] = [];
  let totalJobs = 0;
  try {
    const res = await getJobs(1, 15);
    if (res.success) { jobs = res.data.jobs; totalJobs = res.data.pagination.totalJobs; }
  } catch { /* */ }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateBreadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: `Police Jobs ${currentYear}`, href: "/police-jobs" },
          ]),
        }}
      />
      <section className="hero-glass py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 animate-fade-in-up" style={{ color: "#FFFFFF" }}>
            👮 <span style={{ color: "#FFD700" }}>Police Jobs</span> {currentYear}
          </h1>
          <p className="text-sm md:text-base max-w-xl mx-auto mb-6 animate-fade-in-up" style={{ color: "rgba(255,255,255,0.9)" }}>
            State Police Constable, Head Constable, SI, Inspector, CISF, BSF recruitment
          </p>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex bg-[#10B981] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#059669] transition-all shadow-md">
            Check Eligibility Free →
          </a>
        </div>
      </section>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-[#0B63A8]">Home</Link></li>
          <li className="before:content-['/'] before:mx-1.5 before:text-gray-300 text-gray-700 font-medium">Police Jobs</li>
        </ol>
      </nav>

      <section className="py-8 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Latest Police Jobs Notifications {currentYear}</h2>
          <p className="text-sm text-gray-500 mb-6">{totalJobs}+ active government vacancies</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job, i) => (
              <div key={job.slug} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/?category=DEFENSE_AND_POLICE" className="inline-flex items-center gap-2 bg-[#0B63A8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#084B80] transition-colors">
              View All Police Jobs →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
