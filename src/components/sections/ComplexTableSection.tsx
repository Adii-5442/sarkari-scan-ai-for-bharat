import { ComplexTableSectionValue } from './types';

interface ComplexTableSectionProps {
  value: ComplexTableSectionValue | unknown;
}

/**
 * Extracts headers and rows from complex table value
 * Handles both 'header' and 'headers' field names
 */
function extractTableData(value: unknown): { headers: string[]; rows: string[][] } {
  if (!value || typeof value !== 'object') {
    return { headers: [], rows: [] };
  }

  const obj = value as Record<string, unknown>;
  
  // Handle both 'header' and 'headers' field names
  let headers: string[] = [];
  if (Array.isArray(obj.headers)) {
    headers = obj.headers.map(h => String(h));
  } else if (Array.isArray(obj.header)) {
    headers = obj.header.map(h => String(h));
  }

  // Extract rows
  let rows: string[][] = [];
  if (Array.isArray(obj.rows)) {
    rows = obj.rows
      .filter(row => Array.isArray(row))
      .map(row => (row as unknown[]).map(cell => String(cell || '')));
  }

  return { headers, rows };
}

/**
 * ComplexTableSection - Renders complex_table type sections
 * Full table with headers and multiple data rows
 */
export function ComplexTableSection({ value }: ComplexTableSectionProps) {
  const { headers, rows } = extractTableData(value);

  if (headers.length === 0 || rows.length === 0) return null;

  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full min-w-full border-collapse">
        {/* Header Row */}
        <thead>
          <tr className="bg-slate-100 border-b-2 border-slate-200">
            {headers.map((header, index) => (
              <th 
                key={index}
                className={`py-3 px-4 text-left text-sm font-semibold text-slate-800 ${
                  index === 0 ? 'rounded-tl-lg' : ''
                } ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Data Rows */}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={`border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors ${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
              }`}
            >
              {/* Ensure we render cells for all headers, even if row has fewer cells */}
              {headers.map((_, cellIndex) => (
                <td 
                  key={cellIndex}
                  className={`py-3 px-4 text-sm text-slate-700 ${
                    cellIndex === 0 ? 'font-medium text-slate-900' : ''
                  }`}
                >
                  {row[cellIndex] || '–'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Mobile hint */}
      {headers.length > 3 && (
        <p className="text-xs text-slate-400 mt-2 text-center sm:hidden">
          ← Scroll horizontally to see more →
        </p>
      )}
    </div>
  );
}
