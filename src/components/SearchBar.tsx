"use client";

import { useState, useRef } from "react";

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  initialQuery = "",
  onSearch,
  placeholder = "Search government jobs… e.g. SSC CGL, Railway, Bank PO",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(query.trim());
  }

  function handleClear() {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto"
      role="search"
      aria-label="Search government jobs"
    >
      <div className="relative flex items-center bg-white rounded-2xl shadow-lg overflow-hidden border border-white/20">
        {/* Search Icon */}
        <div className="pl-4 pr-2 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 py-3.5 px-2 text-gray-900 placeholder-gray-400 text-base outline-none bg-transparent"
          aria-label="Search jobs"
          autoComplete="off"
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="m-1.5 px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </form>
  );
}
