import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getJobBySlug,
  formatDate,
  getDaysRemaining,
  getDeadlineInfo,
  PLAY_STORE_URL,
} from "@/lib/api";
import { SectionsContainer } from "@/components/sections";

// Category config
const CATEGORY_CONFIG: Record<
  string,
  { color: string; icon: string; name: string }
> = {
  ADMINISTRATIVE_SERVICES: {
    color: "#7C3AED",
    icon: "office-building",
    name: "UPSC",
  },
  CLERICAL_AND_DEPARTMENTAL: {
    color: "#EA580C",
    icon: "office-building",
    name: "SSC",
  },
  DEFENSE_AND_POLICE: {
    color: "#15803d",
    icon: "shield-account",
    name: "Defence",
  },
  MEDICAL_AND_HEALTHCARE: {
    color: "#0891B2",
    icon: "hospital-box",
    name: "Medical",
  },
  TEACHING_AND_EDUCATION: {
    color: "#DB2777",
    icon: "school",
    name: "Teaching",
  },
  BANKING_AND_INSURANCE: { color: "#3B82F6", icon: "bank", name: "Banking" },
  OTHER: { color: "#1F2937", icon: "briefcase-outline", name: "Others" },
};
const DEFAULT_CATEGORY = {
  color: "#1F2937",
  icon: "briefcase-outline",
  name: "Others",
};
function getCategoryConfig(jobCategory?: string) {
  if (!jobCategory) return DEFAULT_CATEGORY;
  return CATEGORY_CONFIG[jobCategory] || DEFAULT_CATEGORY;
}

// Category Icons
const CategoryIcons: Record<
  string,
  React.FC<{ color: string; size?: number }>
> = {
  "office-building": ({ color, size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M5,3V21H11V17.5H13V21H19V3H5M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M7,9H9V11H7V9M11,9H13V11H11V9M15,9H17V11H15V9M7,13H9V15H7V13M11,13H13V15H11V13M15,13H17V15H15V13M7,17H9V19H7V17M15,17H17V19H15V17Z" />
    </svg>
  ),
  "shield-account": ({ color, size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
    </svg>
  ),
  "hospital-box": ({ color, size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M18,14H14V18H10V14H6V10H10V6H14V10H18V14Z" />
    </svg>
  ),
  school: ({ color, size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
    </svg>
  ),
  bank: ({ color, size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z" />
    </svg>
  ),
  "briefcase-outline": ({ color, size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14M4,8V19H20V8H4Z" />
    </svg>
  ),
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await getJobBySlug(slug);
    if (!response.success || !response.data) {
      return { title: "Job Not Found | Sarkari Scan" };
    }
    const job = response.data;
    const currentYear = new Date().getFullYear();
    const vacancyText =
      job.vacancies && job.vacancies !== "N/A"
        ? `${job.vacancies} posts`
        : "Multiple posts";
    const deadlineText = job.deadline
      ? formatDate(job.deadline)
      : "Check notification";
    const orgName = job.organization?.name || job.recruitmentBoard;

    return {
      title: `${job.postName} – ${job.recruitmentBoard} Recruitment ${currentYear} | ${vacancyText} | Sarkari Naukri`,
      description: `${job.postName} Recruitment ${currentYear} by ${orgName}. ${vacancyText} available. Last date: ${deadlineText}. Check eligibility, qualification, age limit & apply online.`,
      openGraph: {
        title: `${job.postName} – ${job.recruitmentBoard} | ${vacancyText}`,
        description: `${job.postName} ${currentYear} by ${orgName}. ${vacancyText}. Last date: ${deadlineText}.`,
        type: "article",
        url: `https://sarkariscan.com/jobs/${slug}`,
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: `${job.postName} – ${job.recruitmentBoard}`,
          },
        ],
      },
      alternates: { canonical: `https://sarkariscan.com/jobs/${slug}` },
    };
  } catch {
    return { title: "Job Details | Sarkari Scan" };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateJobPostingSchema(job: any, slug: string) {
  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.postName,
    description:
      job.overview || `${job.postName} recruitment by ${job.recruitmentBoard}`,
    datePosted: job.postDate
      ? new Date(job.postDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    validThrough: job.deadline
      ? new Date(job.deadline).toISOString()
      : undefined,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.organization?.name || job.recruitmentBoard,
      sameAs: job.importantLinks?.officialWebsite || undefined,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    applicantLocationRequirements: { "@type": "Country", name: "India" },
    directApply: !!job.importantLinks?.applyOnline,
    url: `https://sarkariscan.com/jobs/${slug}`,
    identifier: {
      "@type": "PropertyValue",
      name: job.recruitmentBoard,
      value: slug,
    },
  };
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  let job;
  try {
    const response = await getJobBySlug(slug);
    if (!response.success || !response.data) notFound();
    job = response.data;
  } catch {
    notFound();
  }

  const daysRemaining = getDaysRemaining(job.deadline);
  const deadlineInfo = getDeadlineInfo(daysRemaining);
  const jsonLd = generateJobPostingSchema(job, slug);
  const category = getCategoryConfig(job.jobCategory);
  const IconComponent =
    CategoryIcons[category.icon] || CategoryIcons["briefcase-outline"];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sarkariscan.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name + " Jobs",
        item: `https://sarkariscan.com/?category=${job.jobCategory || "OTHER"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.postName,
        item: `https://sarkariscan.com/jobs/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#0B63A8] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="before:content-['/'] before:mx-1.5 before:text-gray-300">
                <Link
                  href={`/?category=${job.jobCategory || "OTHER"}`}
                  className="hover:text-[#0B63A8] transition-colors"
                >
                  {category.name} Jobs
                </Link>
              </li>
              <li className="before:content-['/'] before:mx-1.5 before:text-gray-300 text-gray-700 font-medium truncate max-w-[200px] sm:max-w-none">
                {job.postName}
              </li>
            </ol>
          </nav>

          {/* Job Header Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in-up mb-6">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${category.color}12` }}
                >
                  <IconComponent color={category.color} size={40} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2">
                    {job.postName}
                  </h1>
                  <p className="text-base md:text-lg text-slate-600">
                    {job.organization?.name || job.recruitmentBoard}
                  </p>
                </div>
              </div>

              {job.overview && (
                <p className="text-slate-600 leading-relaxed text-[15px] mb-6">
                  {job.overview}
                </p>
              )}

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 py-5 px-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500 mb-0.5">Vacancies</p>
                  <p className="font-bold text-slate-900 text-lg">
                    {job.vacancies || "—"}
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center ${deadlineInfo.variant === "urgent" ? "bg-red-100" : deadlineInfo.variant === "active" ? "bg-amber-100" : "bg-blue-100"}`}
                  >
                    <svg
                      className="w-5 h-5 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500 mb-0.5">Deadline</p>
                  <p
                    className={`font-bold text-lg ${deadlineInfo.variant === "urgent" ? "text-red-600" : "text-slate-900"}`}
                  >
                    {job.deadline ? formatDate(job.deadline) : "—"}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-violet-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-violet-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500 mb-0.5">Age Limit</p>
                  <p className="font-bold text-slate-900 text-lg">
                    {job.ageRequirement
                      ? `${job.ageRequirement.minimumAge}-${job.ageRequirement.maximumAge || "∞"}`
                      : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Deadline Banner */}
            {daysRemaining >= 0 && (
              <div
                className={`px-6 md:px-8 py-3 flex items-center gap-2 ${deadlineInfo.variant === "urgent" ? "bg-red-50 text-red-700" : deadlineInfo.variant === "active" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold text-sm">
                  {daysRemaining === 0
                    ? "Last day to apply!"
                    : `${daysRemaining} days remaining to apply`}
                </span>
              </div>
            )}

            {/* Apply Button */}
            {job.importantLinks?.applyOnline && (
              <div className="px-6 md:px-8 py-4 border-t border-slate-100">
                <a
                  href={job.importantLinks.applyOnline}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0B63A8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#084B80] transition-colors"
                >
                  Apply Online
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}
          </section>

          {/* App CTA */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative overflow-hidden bg-gradient-to-br from-[#0B63A8] via-[#084B80] to-[#063560] rounded-2xl px-5 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] group animate-fade-in-up mb-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-bold text-base text-white leading-tight">
                  Want to check if you&apos;re eligible to apply?
                </span>
                <span
                  className="block text-sm mt-0.5"
                  style={{ color: "#FFD900" }}
                >
                  See all Sarkari jobs you can apply for based on your age,
                  education & category
                </span>
              </div>
              <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </a>

          {/* Job Sections */}
          <SectionsContainer sections={job.sections} />

          {/* Important Links */}
          {job.importantLinks &&
            Object.values(job.importantLinks).some(Boolean) && (
              <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Important Links
                </h2>
                <div className="flex flex-wrap gap-3">
                  {job.importantLinks.applyOnline && (
                    <a
                      href={job.importantLinks.applyOnline}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#0B63A8] text-white rounded-lg text-sm font-semibold hover:bg-[#084B80] transition-colors"
                    >
                      Apply Online
                    </a>
                  )}
                  {job.importantLinks.notification && (
                    <a
                      href={job.importantLinks.notification}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Official Notification
                    </a>
                  )}
                  {job.importantLinks.officialWebsite && (
                    <a
                      href={job.importantLinks.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Official Website
                    </a>
                  )}
                </div>
              </section>
            )}
        </div>
      </main>
    </>
  );
}
