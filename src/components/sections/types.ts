/**
 * Section Types for Job Detail Page
 * These match the backend MongoDB schema and handle ChatGPT-normalized data variations
 */

export type SectionType = 'text' | 'list' | 'simple_table' | 'complex_table';

/**
 * Text section value can be:
 * - Direct string: "Some content..."
 * - Object with content field: { content: "Some content..." }
 * - Object with text field: { text: "Some content..." }
 * - Key-value pairs: { "Stage 1": "Description...", "Stage 2": "..." }
 */
export type TextSectionValue = 
  | string 
  | { content: string }
  | { text: string }
  | Record<string, string>;

/**
 * List section value:
 * - Object with items array: { items: ["item1", "item2"] }
 * - Direct array (fallback): ["item1", "item2"]
 */
export type ListSectionValue = 
  | { items: string[] }
  | string[];

/**
 * Simple table value can be:
 * - Direct object key-value: { "Key": "Value", ... }
 * - Object with rows as array of tuples: { rows: [["Key", "Value"], ...] }
 * - Object with rows as array of single-key objects: { rows: [{ "Key": "Value" }, ...] }
 * - Object with rows as array of multi-key objects (table format): { rows: [{ "Post": "...", "Salary": "..." }, ...] }
 */
export type SimpleTableSectionValue = 
  | Record<string, string | number>
  | { rows: Array<[string, string]> }
  | { rows: Array<Record<string, string | number>> };

/**
 * Complex table value:
 * - Object with headers/header and rows arrays
 */
export interface ComplexTableSectionValue {
  header?: string[];
  headers?: string[];
  rows: string[][];
}

/**
 * Base Section interface
 */
export interface Section {
  sectionName: string;
  sectionType: SectionType;
  value: TextSectionValue | ListSectionValue | SimpleTableSectionValue | ComplexTableSectionValue | unknown;
}

/**
 * Icon configuration for sections
 */
export interface SectionIconConfig {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}
