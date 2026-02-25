import { ReactNode } from 'react';
import { getSectionIcon } from './sectionIcons';

interface SectionWrapperProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * SectionWrapper - Container component for job detail sections
 * Provides consistent styling with icon, title, and content area
 */
export function SectionWrapper({ title, children, className = '' }: SectionWrapperProps) {
  const iconConfig = getSectionIcon(title);

  return (
    <div className={`bg-white rounded-xl border border-slate-100 overflow-hidden ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
        <div 
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconConfig.bgColor}`}
          style={{ color: iconConfig.color }}
        >
          {iconConfig.icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      
      {/* Section Content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
