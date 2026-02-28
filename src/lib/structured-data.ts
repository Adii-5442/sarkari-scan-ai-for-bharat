/**
 * Generates JSON-LD BreadcrumbList structured data for Google rich results.
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://sarkariscan.com${item.href}`,
    })),
  });
}

/**
 * Generates JSON-LD JobPosting structured data for individual job pages.
 * @see https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export function generateJobPostingJsonLd(job: {
  title: string;
  description: string;
  organization: string;
  deadline?: number | null;
  postDate?: number | null;
  slug: string;
  vacancies?: string | number;
  qualification?: string[];
}): string {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    hiringOrganization: {
      "@type": "Organization",
      name: job.organization,
      sameAs: "https://sarkariscan.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    employmentType: "FULL_TIME",
    url: `https://sarkariscan.com/jobs/${job.slug}`,
  };

  if (job.postDate) {
    jsonLd.datePosted = new Date(job.postDate).toISOString().split("T")[0];
  }

  if (job.deadline) {
    jsonLd.validThrough = new Date(job.deadline).toISOString().split("T")[0];
  }

  if (job.qualification && job.qualification.length > 0) {
    jsonLd.educationRequirements = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: job.qualification.join(", "),
    };
  }

  const vacancyNum =
    typeof job.vacancies === "string"
      ? parseInt(job.vacancies, 10)
      : job.vacancies;
  if (vacancyNum && !isNaN(vacancyNum) && vacancyNum > 0) {
    jsonLd.totalJobOpenings = vacancyNum;
  }

  return JSON.stringify(jsonLd);
}
