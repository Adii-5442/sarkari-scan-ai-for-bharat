import Link from "next/link";

interface Category {
  category: string;
  displayName: string;
  icon: string;
  color: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
  selectedCategory?: string;
}

const CategorySVG: Record<string, React.FC<{ color: string }>> = {
  ADMINISTRATIVE_SERVICES: ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
      <path d="M5,3V21H11V17.5H13V21H19V3H5M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M7,9H9V11H7V9M11,9H13V11H11V9M15,9H17V11H15V9M7,13H9V15H7V13M11,13H13V15H11V13M15,13H17V15H15V13M7,17H9V19H7V17M15,17H17V19H15V17Z" />
    </svg>
  ),
  CLERICAL_AND_DEPARTMENTAL: ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
      <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14M4,8V19H20V8H4Z" />
    </svg>
  ),
  DEFENSE_AND_POLICE: ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9" />
    </svg>
  ),
  MEDICAL_AND_HEALTHCARE: ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
      <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M18,14H14V18H10V14H6V10H10V6H14V10H18V14Z" />
    </svg>
  ),
  TEACHING_AND_EDUCATION: ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
      <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
    </svg>
  ),
  BANKING_AND_INSURANCE: ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
      <path d="M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z" />
    </svg>
  ),
  OTHER: ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
      <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14M4,8V19H20V8H4Z" />
    </svg>
  ),
};

export default function CategoryGrid({ categories, selectedCategory }: CategoryGridProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <>
      {/* Desktop / Tablet: full-width responsive grid */}
      <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.category;
          const Icon = CategorySVG[cat.category] || CategorySVG["OTHER"];

          return (
            <Link
              key={cat.category}
              href={`/?category=${cat.category}`}
              className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5 group"
              style={{
                backgroundColor: isSelected ? cat.color : "white",
                borderColor: isSelected ? cat.color : "#E5E7EB",
                boxShadow: isSelected ? `0 4px 16px ${cat.color}30` : undefined,
              }}
              aria-label={`Browse ${cat.displayName} jobs`}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.25)" : `${cat.color}18` }}
              >
                <Icon color={isSelected ? "white" : cat.color} />
              </div>
              <div className="text-center">
                <p
                  className="text-xs font-bold leading-snug"
                  style={{ color: isSelected ? "white" : "#1F2937" }}
                >
                  {cat.displayName}
                </p>
                <p
                  className="text-[11px] font-medium mt-0.5"
                  style={{ color: isSelected ? "rgba(255,255,255,0.8)" : "#9CA3AF" }}
                >
                  {cat.count.toLocaleString()} jobs
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: horizontal pill scroll */}
      <div
        className="flex sm:hidden gap-2.5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.category;
          const Icon = CategorySVG[cat.category] || CategorySVG["OTHER"];

          return (
            <Link
              key={cat.category}
              href={`/?category=${cat.category}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all shrink-0 hover:shadow-md"
              style={{
                backgroundColor: isSelected ? cat.color : "white",
                borderColor: isSelected ? cat.color : "#E5E7EB",
              }}
              aria-label={`Browse ${cat.displayName} jobs`}
            >
              <div
                className="flex items-center justify-center w-6 h-6 rounded-full shrink-0"
                style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : `${cat.color}20` }}
              >
                <Icon color={isSelected ? "white" : cat.color} />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-xs font-bold whitespace-nowrap"
                  style={{ color: isSelected ? "white" : "#374151" }}
                >
                  {cat.displayName}
                </span>
                <span
                  className="text-[10px] font-medium mt-0.5"
                  style={{ color: isSelected ? "rgba(255,255,255,0.8)" : "#9CA3AF" }}
                >
                  {cat.count} jobs
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
