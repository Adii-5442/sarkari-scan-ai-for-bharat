import { Section } from './types';
import { SectionWrapper } from './SectionWrapper';
import { TextSection } from './TextSection';
import { ListSection } from './ListSection';
import { SimpleTableSection } from './SimpleTableSection';
import { ComplexTableSection } from './ComplexTableSection';
import { getSectionIcon } from './sectionIcons';

interface SectionRendererProps {
  section: Section;
  className?: string;
}

/**
 * SectionRenderer - Main component for rendering job detail sections
 * Automatically handles different section types (text, list, simple_table, complex_table)
 * with proper error handling for malformed data
 */
export function SectionRenderer({ section, className = '' }: SectionRendererProps) {
  // Skip sections without proper data
  if (!section || !section.sectionName || !section.sectionType) {
    return null;
  }

  // Skip if value is empty/null/undefined
  if (section.value === null || section.value === undefined) {
    return null;
  }

  // For objects, check if they have any meaningful content
  if (typeof section.value === 'object' && !Array.isArray(section.value)) {
    const entries = Object.entries(section.value as Record<string, unknown>);
    if (entries.length === 0) {
      return null;
    }
  }

  // Get icon color for list bullet
  const iconConfig = getSectionIcon(section.sectionName);

  // Render the appropriate section component based on type
  const renderContent = () => {
    switch (section.sectionType) {
      case 'text':
        return <TextSection value={section.value} />;
      
      case 'list':
        return <ListSection value={section.value} bulletColor={iconConfig.color} />;
      
      case 'simple_table':
        return <SimpleTableSection value={section.value} />;
      
      case 'complex_table':
        return <ComplexTableSection value={section.value} />;
      
      default:
        // Fallback: try to render as text if we don't recognize the type
        console.warn(`Unknown section type: ${section.sectionType}`);
        return <TextSection value={section.value} />;
    }
  };

  const content = renderContent();
  
  // Skip rendering if the section component returned null
  if (!content) {
    return null;
  }

  return (
    <SectionWrapper title={section.sectionName} className={className}>
      {content}
    </SectionWrapper>
  );
}

/**
 * SectionsContainer - Renders multiple sections with proper spacing
 */
interface SectionsContainerProps {
  sections: Section[] | undefined | null;
  className?: string;
}

export function SectionsContainer({ sections, className = '' }: SectionsContainerProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {sections.map((section, index) => (
        <SectionRenderer key={`${section.sectionName}-${index}`} section={section} />
      ))}
    </div>
  );
}
