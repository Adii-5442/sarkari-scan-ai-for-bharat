'use client';

import { useState } from 'react';
import { TextSectionValue } from './types';

interface TextSectionProps {
  value: TextSectionValue | unknown;
}

/**
 * Extracts content from various text section value formats
 * Handles ChatGPT's inconsistent data normalization
 */
function extractContent(value: unknown): {
  type: 'plain' | 'keyValue';
  content: string | Array<{ key: string; value: string }>;
} {
  // Handle null/undefined
  if (!value) {
    return { type: 'plain', content: '' };
  }

  // Direct string value
  if (typeof value === 'string') {
    return { type: 'plain', content: value };
  }

  // Object with 'content' field (backward compatibility)
  if (typeof value === 'object' && value !== null && 'content' in value) {
    const content = (value as { content: unknown }).content;
    if (typeof content === 'string') {
      return { type: 'plain', content };
    }
  }

  // Object with 'text' field (backward compatibility)
  if (typeof value === 'object' && value !== null && 'text' in value) {
    const text = (value as { text: unknown }).text;
    if (typeof text === 'string') {
      return { type: 'plain', content: text };
    }
  }

  // Object with key-value pairs (e.g., { "Stage 1 - Written Examination": "..." })
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length > 0) {
      // Check if this looks like key-value content pairs (not metadata)
      const keyValuePairs = entries
        .filter(([, val]) => typeof val === 'string' && (val as string).length > 0)
        .map(([key, val]) => ({ key, value: val as string }));

      if (keyValuePairs.length > 0) {
        return { type: 'keyValue', content: keyValuePairs };
      }
    }
  }

  return { type: 'plain', content: '' };
}

/**
 * Format text with proper line breaks (replace \n with actual newlines)
 */
function formatTextWithLineBreaks(text: string): string {
  return text.replace(/\\n/g, '\n');
}

/**
 * TextSection - Renders text type sections
 * Handles plain text and key-value pair formats with expand/collapse for long content
 */
export function TextSection({ value }: TextSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const extracted = extractContent(value);

  if (extracted.type === 'plain') {
    const content = formatTextWithLineBreaks(extracted.content as string);
    
    if (!content) return null;

    const isLong = content.length > 400;
    const displayText = isLong && !expanded ? content.substring(0, 400) + '...' : content;

    return (
      <div className="space-y-3">
        {/* Render content with preserved line breaks */}
        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
          {displayText}
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            {expanded ? 'Show Less' : 'Show More'}
            <svg 
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  // Render key-value pairs as formatted text blocks
  const keyValuePairs = extracted.content as Array<{ key: string; value: string }>;
  
  // Calculate total content length for expand/collapse
  const totalContent = keyValuePairs.map(kv => `${kv.key}\n${kv.value}`).join('\n\n');
  const isLong = totalContent.length > 600;
  
  // For collapsed state, show limited pairs
  const displayPairs = isLong && !expanded ? keyValuePairs.slice(0, 2) : keyValuePairs;

  return (
    <div className="space-y-5">
      {displayPairs.map((pair, index) => {
        const formattedValue = formatTextWithLineBreaks(pair.value);
        const isValueLong = formattedValue.length > 500 && !expanded;
        const displayValue = isValueLong ? formattedValue.substring(0, 500) + '...' : formattedValue;

        return (
          <div key={index} className="space-y-2">
            {/* Key as header */}
            <h4 className="font-semibold text-slate-900 text-base">{pair.key}</h4>
            
            {/* Value as content - properly formatted with line breaks */}
            <div className="text-slate-700 leading-relaxed">
              {displayValue.split('\n').map((line, lineIndex) => {
                const isBulletOrNumber = line.startsWith('•') || /^\d+\./.test(line.trim());
                return (
                  <p 
                    key={lineIndex} 
                    className={`${isBulletOrNumber ? 'pl-4' : ''} ${lineIndex > 0 ? 'mt-1.5' : ''}`}
                  >
                    {line || '\u00A0'}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          {expanded ? 'Show Less' : `Show More (${keyValuePairs.length - displayPairs.length} more sections)`}
          <svg 
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}
