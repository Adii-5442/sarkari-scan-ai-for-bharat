/**
 * API Client for Sarkari Scan Web
 * Communicates with backend /api/web endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ============ TYPES ============

export interface Organization {
  name: string;
  type: string;
  sector?: string;
}

export interface AgeRequirement {
  minimumAge: number;
  maximumAge: number | null;
}

export interface Section {
  sectionName: string;
  sectionType: 'text' | 'list' | 'simple_table' | 'complex_table';
  value: Record<string, unknown>;
}

export interface ImportantLinks {
  officialWebsite?: string;
  applyOnline?: string;
  notification?: string;
  extendedNotification?: string;
}

export interface JobListItem {
  slug: string;
  postName: string;
  recruitmentBoard: string;
  organization: Organization;
  vacancies: string | number;
  qualification: string[];
  deadline: number | null;
  postDate: number | null;
  jobCategory?: string;
  ageRequirement?: AgeRequirement;
  overview?: string;
  multiplePostsAvailable?: boolean;
}

export interface JobDetail extends JobListItem {
  sections?: Section[];
  importantLinks?: ImportantLinks;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalJobs: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface JobsListResponse {
  success: boolean;
  message: string;
  data: {
    jobs: JobListItem[];
    pagination: Pagination;
  };
}

export interface JobDetailResponse {
  success: boolean;
  message: string;
  data: JobDetail;
}

export interface SitemapSlug {
  slug: string;
  updatedAt?: string;
}

export interface SitemapResponse {
  success: boolean;
  message: string;
  data: {
    slugs: SitemapSlug[];
  };
}

export interface CategoryItem {
  category: string;
  displayName: string;
  icon: string;
  color: string;
  count: number;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: CategoryItem[];
    totalJobs: number;
  };
}

// ============ API FUNCTIONS ============

/**
 * Fetch paginated job listings
 */
export async function getJobs(page: number = 1, limit: number = 30): Promise<JobsListResponse> {
  const response = await fetch(`${API_BASE_URL}/api/web/jobs?page=${page}&limit=${limit}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch a single job by slug
 */
export async function getJobBySlug(slug: string): Promise<JobDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/api/web/jobs/${slug}`, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Job not found');
    }
    throw new Error(`Failed to fetch job: ${response.status}`);
  }

  return response.json();
}

/**
 * Search jobs by keyword with optional category filter
 */
export async function searchJobs(
  query: string,
  options: { category?: string; page?: number; limit?: number } = {}
): Promise<JobsListResponse> {
  const { category, page = 1, limit = 30 } = options;
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    limit: limit.toString(),
  });
  if (category) params.append('category', category);

  const response = await fetch(
    `${API_BASE_URL}/api/web/jobs/search?${params.toString()}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Get job counts by category
 */
export async function getCategories(): Promise<CategoriesResponse> {
  const response = await fetch(`${API_BASE_URL}/api/web/categories`, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  return response.json();
}

/**
 * Get jobs filtered by category
 */
export async function getJobsByCategory(
  category: string,
  page: number = 1,
  limit: number = 30
): Promise<JobsListResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/web/jobs?category=${encodeURIComponent(category)}&page=${page}&limit=${limit}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs by category: ${response.status}`);
  }

  return response.json();
}

/**
 * Get all job slugs for sitemap generation
 */
export async function getAllJobSlugs(): Promise<SitemapSlug[]> {
  const response = await fetch(`${API_BASE_URL}/api/web/jobs/sitemap`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap slugs: ${response.status}`);
  }

  const data: SitemapResponse = await response.json();
  return data.data.slugs;
}

// ============ UTILITY FUNCTIONS ============

/**
 * Format a Unix timestamp to a human-readable date string (Indian locale)
 */
export function formatDate(timestamp: number | null): string {
  if (!timestamp) return 'N/A';
  return new Date(timestamp).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Calculate how many days remain until a deadline
 */
export function getDaysRemaining(deadline: number | null): number {
  if (!deadline) return -1;
  const diff = deadline - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Get deadline display info for badge / banner colouring
 */
export function getDeadlineInfo(daysRemaining: number): {
  text: string;
  variant: 'urgent' | 'active' | 'new' | 'expired';
  icon: string;
} {
  if (daysRemaining < 0) return { text: 'Expired', variant: 'expired', icon: '⏱️' };
  if (daysRemaining === 0) return { text: 'Today!', variant: 'urgent', icon: '🔥' };
  if (daysRemaining <= 3) return { text: `${daysRemaining}d left`, variant: 'urgent', icon: '⚠️' };
  if (daysRemaining <= 7) return { text: `${daysRemaining}d left`, variant: 'active', icon: '📅' };
  return { text: `${daysRemaining}d left`, variant: 'new', icon: '📆' };
}

/**
 * Format vacancy count for display
 */
export function formatVacancies(vacancies: string | number): string {
  const num = typeof vacancies === 'string' ? parseInt(vacancies, 10) : vacancies;
  if (isNaN(num) || num <= 0) return 'Various';
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
  return `${num} Posts`;
}

// Play Store URL
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.sarkariscan';
