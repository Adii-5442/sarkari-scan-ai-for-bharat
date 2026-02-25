"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getJobs,
  getCategories,
  searchJobs,
  CategoryItem,
  JobListItem,
  PLAY_STORE_URL,
} from "@/lib/api";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";

// Loading skeleton
const JobSkeleton = ({ index = 0 }: { index?: number }) => (
  <div
    className="bg-white rounded-xl border border-gray-100 p-4 animate-fade-in-up h-full"
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="w-12 h-12 rounded-full skeleton-shimmer shrink-0" />
      <div className="flex-1 min-w-0 mr-2">
        <div className="h-5 skeleton-shimmer w-4/5 mb-2" />
        <div className="h-4 skeleton-shimmer w-3/5 mb-1.5" />
        <div className="h-4 skeleton-shimmer w-20 rounded" />
      </div>
      <div className="w-[52px] h-[52px] rounded-lg skeleton-shimmer shrink-0" />
    </div>
    <div className="h-6 skeleton-shimmer w-28 rounded-xl mb-2" />
    <div className="flex gap-1.5 mb-3">
      <div className="h-6 skeleton-shimmer w-16 rounded-md" />
      <div className="h-6 skeleton-shimmer w-20 rounded-md" />
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
      <div className="h-4 skeleton-shimmer w-20" />
      <div className="h-7 skeleton-shimmer w-24 rounded-full" />
    </div>
  </div>
);

export default function HomePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "",
  );
  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get("page") || "1", 10),
    totalJobs: 0,
    totalPages: 1,
  });
  const [contentKey, setContentKey] = useState(0);
  const jobsGridRef = useRef<HTMLDivElement>(null);

  // Fetch categories once
  useEffect(() => {
    getCategories()
      .then((data) => {
        if (data?.data?.categories) setCategories(data.data.categories);
      })
      .catch(console.error);
  }, []);

  // Fetch jobs
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      let result;
      if (searchQuery) {
        result = await searchJobs(searchQuery, {
          page: pagination.page,
          limit: 12,
        });
      } else {
        result = await getJobs(pagination.page, 12);
      }

      if (result?.data) {
        setJobs(result.data.jobs || []);
        setPagination((prev) => ({
          ...prev,
          totalJobs: result.data.pagination?.totalJobs || 0,
          totalPages: result.data.pagination?.totalPages || 1,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
      setInitialLoad(false);
      setContentKey((prev) => prev + 1);
    }
  }, [searchQuery, activeCategory, pagination.page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (activeCategory) params.set("category", activeCategory);
    if (pagination.page > 1) params.set("page", String(pagination.page));
    const qs = params.toString();
    if (qs) {
      router.replace(`/?${qs}`, { scroll: false });
    } else if (window.location.search) {
      router.replace("/", { scroll: false });
    }
  }, [searchQuery, activeCategory, pagination.page, router]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const hasFilters = searchQuery || activeCategory;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-glass py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight animate-fade-in-up"
            style={{ color: "#FFFFFF" }}
          >
            Find Your Dream{" "}
            <span style={{ color: "#FFD700" }}>Sarkari Naukri</span>
          </h1>
          <p
            className="text-sm md:text-base max-w-xl mx-auto mb-6 animate-fade-in-up"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            Search across 1000+ active government job notifications
          </p>

          <div className="w-full px-4 md:px-16 lg:px-32 animate-fade-in-up">
            <SearchBar
              initialQuery={searchQuery}
              onSearch={handleSearch}
              placeholder="Search by job title, board, department..."
            />
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              {
                label: "Active Jobs",
                value:
                  pagination.totalJobs > 0
                    ? pagination.totalJobs.toLocaleString()
                    : "1000+",
                color: "#F59E0B",
              },
              {
                label: "Check Eligibility",
                value: "Get App →",
                color: "#10B981",
                href: PLAY_STORE_URL,
              },
              {
                label: "Free Alerts",
                value: "Never miss",
                color: "#3B82F6",
                href: PLAY_STORE_URL,
              },
            ].map((stat) => {
              const Wrapper = stat.href ? "a" : "div";
              const props = stat.href
                ? {
                    href: stat.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {};
              return (
                <Wrapper
                  key={stat.label}
                  {...props}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">{stat.value}</p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      {categories.length > 0 && (
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-base font-semibold text-gray-700 mb-3">
              Browse by Category
            </h2>
            <CategoryGrid
              categories={categories}
              selectedCategory={activeCategory}
            />
          </div>
        </section>
      )}

      {/* Jobs Section */}
      <section className="py-8 md:py-12 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 animate-fade-in-up">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : activeCategory
                    ? `${categories.find((c) => c.category === activeCategory)?.displayName || "Category"} Jobs`
                    : "Latest Government Jobs"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {loading
                  ? "Loading..."
                  : `${pagination.totalJobs.toLocaleString()} jobs found`}
              </p>
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#0B63A8] hover:underline font-medium"
              >
                ✕ Clear filters
              </button>
            )}
          </div>

          {loading && initialLoad ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <JobSkeleton key={i} index={i} />
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <>
              <div ref={jobsGridRef} className="relative">
                {loading && !initialLoad && (
                  <div className="absolute inset-0 bg-white/60 z-10 flex items-start justify-center pt-24 rounded-xl">
                    <div className="w-8 h-8 rounded-full border-2 border-[#0B63A8] border-t-transparent animate-spin" />
                  </div>
                )}
                <div
                  key={contentKey}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {jobs.map((job, index) => (
                    <div
                      key={job.slug || index}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.04}s` }}
                    >
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  {pagination.page > 1 && (
                    <button
                      onClick={() => {
                        setPagination((p) => ({ ...p, page: p.page - 1 }));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      ← Previous
                    </button>
                  )}
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      const p =
                        pagination.totalPages <= 5
                          ? i + 1
                          : pagination.page <= 3
                            ? i + 1
                            : pagination.page >= pagination.totalPages - 2
                              ? pagination.totalPages - 4 + i
                              : pagination.page - 2 + i;
                      return (
                        <button
                          key={p}
                          onClick={() => {
                            setPagination((prev) => ({ ...prev, page: p }));
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${p === pagination.page ? "bg-[#0B63A8] text-white shadow-md" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                        >
                          {p}
                        </button>
                      );
                    },
                  )}
                  {pagination.page < pagination.totalPages && (
                    <button
                      onClick={() => {
                        setPagination((p) => ({ ...p, page: p.page + 1 }));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Next →
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500">
                {searchQuery
                  ? `No jobs matching "${searchQuery}"`
                  : "No jobs available"}
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-[#0B63A8] font-medium hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
