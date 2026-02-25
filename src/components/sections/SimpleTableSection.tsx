import { SimpleTableSectionValue } from './types';

interface SimpleTableSectionProps {
  value: SimpleTableSectionValue | unknown;
}

interface ParsedData {
  isMultiColumnTable: boolean;
  headers: string[];
  tableData: string[][];
  rows: Array<{ key: string; value: string }>;
}

/**
 * Parses the simple table value into a normalized format
 * Handles 4 different data formats from ChatGPT normalization:
 * 1. Direct object: { "Key": "Value", ... }
 * 2. Rows with single key object: { rows: [{ "Key": "Value" }, ...] }
 * 3. Rows with arrays: { rows: [["Key", "Value"], ...] }
 * 4. Rows with multi-key objects (table format): { rows: [{ "Post": "...", "Salary": "..." }, ...] }
 */
function parseSimpleTableData(value: unknown): ParsedData {
  const result: ParsedData = {
    isMultiColumnTable: false,
    headers: [],
    tableData: [],
    rows: [],
  };

  if (!value || typeof value !== 'object') return result;

  // Check if value has 'rows' array
  if ('rows' in value && Array.isArray((value as { rows: unknown }).rows)) {
    const rows = (value as { rows: unknown[] }).rows;
    
    if (rows.length === 0) return result;
    
    const firstRow = rows[0];
    
    // Check if this is a multi-column table (Format 4)
    if (firstRow && typeof firstRow === 'object' && !Array.isArray(firstRow)) {
      const keys = Object.keys(firstRow as Record<string, unknown>);
      
      if (keys.length > 1) {
        // Multi-column table!
        result.isMultiColumnTable = true;
        result.headers = keys;
        result.tableData = rows.map((row) => 
          result.headers.map(header => String((row as Record<string, unknown>)[header] || ''))
        );
        return result;
      }
    }

    // Format 2 or 3: has rows array (single key-value pairs)
    result.rows = rows
      .map((row): { key: string; value: string } | null => {
        if (Array.isArray(row)) {
          // Format 3: row is ["Key", "Value"]
          return { key: String(row[0] || ''), value: String(row[1] || '') };
        } else if (typeof row === 'object' && row !== null) {
          // Format 2: row is { "Key": "Value" } (single entry)
          const entries = Object.entries(row as Record<string, unknown>);
          if (entries.length > 0) {
            return { key: entries[0][0], value: String(entries[0][1] || '') };
          }
        }
        return null;
      })
      .filter((row): row is { key: string; value: string } => row !== null);

  } else if (!Array.isArray(value)) {
    // Format 1: Direct object { "Key": "Value", ... }
    result.rows = Object.entries(value as Record<string, unknown>)
      .filter(([, val]) => val !== null && val !== undefined)
      .map(([key, val]) => ({
        key,
        value: String(val),
      }));
  }

  return result;
}

/**
 * SimpleTableSection - Renders simple_table type sections
 * Handles key-value pairs and multi-column tables
 */
export function SimpleTableSection({ value }: SimpleTableSectionProps) {
  const parsed = parseSimpleTableData(value);

  // Render multi-column table
  if (parsed.isMultiColumnTable && parsed.tableData.length > 0) {
    return (
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full min-w-full border-collapse">
          {/* Header Row */}
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {parsed.headers.map((header, index) => (
                <th 
                  key={index}
                  className={`py-3 px-4 text-left text-sm font-semibold text-slate-700 ${
                    index === 0 ? 'rounded-tl-lg' : ''
                  } ${index === parsed.headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Data Rows */}
          <tbody>
            {parsed.tableData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`border-b border-slate-100 last:border-0 ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex}
                    className={`py-3 px-4 text-sm text-slate-700 ${
                      cellIndex === 0 ? 'font-medium' : ''
                    }`}
                  >
                    {cell || '–'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Render key-value pairs
  if (parsed.rows.length === 0) return null;

  return (
    <div className="divide-y divide-slate-100">
      {parsed.rows.map((row, index) => (
        <div 
          key={index}
          className={`py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 ${
            index === 0 ? 'pt-0' : ''
          } ${index === parsed.rows.length - 1 ? 'pb-0' : ''}`}
        >
          {/* Key */}
          <span className="text-sm font-medium text-slate-500 sm:w-1/3 sm:shrink-0">
            {row.key}
          </span>
          {/* Value */}
          <span className="text-sm text-slate-800 sm:flex-1">
            {row.value || '–'}
          </span>
        </div>
      ))}
    </div>
  );
}
