import Link from "next/link";
import { JobListItem, getDaysRemaining } from "@/lib/api";

interface JobCardProps {
  job: JobListItem;
}

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

const CategoryIcons: Record<string, React.FC<{ color: string }>> = {
  "office-building": ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M5,3V21H11V17.5H13V21H19V3H5M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M7,9H9V11H7V9M11,9H13V11H11V9M15,9H17V11H15V9M7,13H9V15H7V13M11,13H13V15H11V13M15,13H17V15H15V13M7,17H9V19H7V17M15,17H17V19H15V17Z" />
    </svg>
  ),
  "shield-account": ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
    </svg>
  ),
  "hospital-box": ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M18,14H14V18H10V14H6V10H10V6H14V10H18V14Z" />
    </svg>
  ),
  school: ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
    </svg>
  ),
  bank: ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z" />
    </svg>
  ),
  "briefcase-outline": ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14M4,8V19H20V8H4Z" />
    </svg>
  ),
};

const ClockIcon = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={color}>
    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
  </svg>
);

function formatDateFriendly(postDate: number | null): string {
  if (!postDate) return "";
  const diff = Date.now() - postDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

function getDeadlineBadge(daysRemaining: number): {
  text: string;
  bgColor: string;
  textColor: string;
} {
  if (daysRemaining < 0)
    return { text: "Expired", bgColor: "#F3F4F6", textColor: "#6B7280" };
  if (daysRemaining === 0)
    return { text: "Today", bgColor: "#FEE2E2", textColor: "#DC2626" };
  if (daysRemaining === 1)
    return { text: "Tomorrow", bgColor: "#FEE2E2", textColor: "#DC2626" };
  if (daysRemaining <= 3)
    return {
      text: `${daysRemaining}d left`,
      bgColor: "#FEE2E2",
      textColor: "#DC2626",
    };
  if (daysRemaining <= 7)
    return {
      text: `${daysRemaining}d left`,
      bgColor: "#FEF3C7",
      textColor: "#D97706",
    };
  return {
    text: `${daysRemaining}d left`,
    bgColor: "#DCFCE7",
    textColor: "#16A34A",
  };
}

export default function JobCard({ job }: JobCardProps) {
  const daysRemaining = getDaysRemaining(job.deadline);
  const deadlineInfo = getDeadlineBadge(daysRemaining);
  const category = getCategoryConfig(job.jobCategory);
  const postedText = formatDateFriendly(job.postDate);
  const vacancyNum =
    typeof job.vacancies === "string"
      ? parseInt(job.vacancies, 10)
      : job.vacancies;
  const IconComponent =
    CategoryIcons[category.icon] || CategoryIcons["briefcase-outline"];

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="flex flex-col bg-white rounded-xl border border-gray-200 p-4 card-hover-lift h-full"
      style={{ boxShadow: "0 2px 8px rgba(12,24,36,0.04)" }}
    >
      {/* Top Row: Category Icon, Title, Org, Posts Badge */}
      <div className="flex items-start gap-3 mb-2">
        <div
          className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center mt-1"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <IconComponent color={category.color} />
        </div>

        <div className="flex-1 min-w-0 mr-2">
          <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-2 mb-1">
            {job.postName}
          </h3>
          <p className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
            {job.organization?.name || job.recruitmentBoard}
          </p>
          <span
            className="inline-block px-1.5 py-0.5 text-[10px] font-medium rounded"
            style={{ backgroundColor: "#0B63A815", color: "#0B63A8" }}
          >
            {job.organization?.type || "Government"}
          </span>
        </div>

        {/* Posts Badge */}
        <div className="shrink-0 flex flex-col items-center">
          <div
            className="flex flex-col items-center justify-center px-3 py-2 rounded-lg min-w-[52px]"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <span
              className="text-xl font-bold leading-none"
              style={{ color: category.color }}
            >
              {isNaN(vacancyNum) || vacancyNum <= 0 ? "—" : vacancyNum}
            </span>
            <span
              className="text-[10px] font-medium mt-0.5"
              style={{ color: category.color }}
            >
              {isNaN(vacancyNum) || vacancyNum <= 0
                ? "Various"
                : vacancyNum === 1
                  ? "Post"
                  : "Posts"}
            </span>
          </div>
        </div>
      </div>

      {/* Deadline Badge */}
      {daysRemaining >= -1 && (
        <div className="flex items-center mb-2">
          <span
            className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-semibold"
            style={{
              backgroundColor: deadlineInfo.bgColor,
              color: deadlineInfo.textColor,
            }}
          >
            <ClockIcon color={deadlineInfo.textColor} />
            Deadline: {deadlineInfo.text}
          </span>
        </div>
      )}

      {/* Qualification Chips */}
      <div
        className="flex flex-wrap gap-1.5"
        style={{ maxHeight: "52px", overflow: "hidden" }}
      >
        {job.qualification && job.qualification.length > 0 ? (
          job.qualification.map((qual, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-[11px] font-semibold rounded-md border border-gray-200"
            >
              {qual}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        )}
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        {postedText ? (
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#6B7280">
              <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
            </svg>
            <span>{postedText}</span>
          </div>
        ) : (
          <div />
        )}
        <span className="text-[11px] font-semibold text-[#0B63A8] hover:underline">
          View Details →
        </span>
      </div>
    </Link>
  );
}
