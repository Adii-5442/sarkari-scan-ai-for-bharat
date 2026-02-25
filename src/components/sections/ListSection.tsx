import { ListSectionValue } from './types';

interface ListSectionProps {
  value: ListSectionValue | unknown;
  bulletColor?: string;
}

/**
 * Extracts items array from various list section value formats
 */
function extractItems(value: unknown): string[] {
  if (!value) return [];
  
  // Direct array format
  if (Array.isArray(value)) {
    return value.filter(item => typeof item === 'string' && item.length > 0);
  }
  
  // Object with items array: { items: [...] }
  if (typeof value === 'object' && value !== null && 'items' in value) {
    const items = (value as { items: unknown }).items;
    if (Array.isArray(items)) {
      return items.filter(item => typeof item === 'string' && item.length > 0);
    }
  }
  
  return [];
}

/**
 * ListSection - Renders list type sections
 * Handles both { items: [...] } format and direct arrays
 */
export function ListSection({ value, bulletColor = '#3B82F6' }: ListSectionProps) {
  const items = extractItems(value);
  
  if (items.length === 0) return null;

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          {/* Bullet point */}
          <span 
            className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
            style={{ backgroundColor: bulletColor }}
          />
          {/* Item text */}
          <span className="text-slate-700 leading-relaxed flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}
