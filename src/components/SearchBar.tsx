"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const POPULAR_SEARCHES = [
  "SSC CGL",
  "Railway Group D",
  "Bank PO",
  "UPSC Civil Services",
  "Police Constable",
  "Army Agniveer",
  "CTET",
  "SBI Clerk",
];

export default function SearchBar({
  initialQuery = "",
  onSearch,
  placeholder = "Search government jobs… e.g. SSC CGL, Railway, Bank PO",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on current query
  const filteredSuggestions = query.trim().length > 0
    ? POPULAR_SEARCHES.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : POPULAR_SEARCHES;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(query.trim());
    setShowSuggestions(false);
    inputRef.current?.blur();
  }

  function handleClear() {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  }

  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  }

  // Close suggestions when clicking outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Handle keyboard navigation in suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search government jobs"
      >
        <div
          className="relative flex items-center bg-white rounded-2xl overflow-hidden transition-shadow duration-200"
          style={{
            boxShadow: isFocused
              ? "0 8px 40px rgba(11,63,107,0.25), 0 2px 8px rgba(0,0,0,0.08)"
              : "0 8px 32px rgba(11,63,107,0.18), 0 2px 8px rgba(0,0,0,0.06)",
            border: isFocused
              ? "1.5px solid rgba(11, 99, 168, 0.4)"
              : "1.5px solid rgba(255,255,255,0.8)",
          }}
        >
          {/* Search Icon */}
          <div className="pl-4 pr-2 text-gray-400 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 py-4 px-2 text-gray-900 placeholder-gray-400 text-sm md:text-base outline-none bg-transparent"
            aria-label="Search jobs"
            aria-expanded={showSuggestions}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            autoComplete="off"
            enterKeyHint="search"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="m-2 px-5 py-2.5 font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg text-sm whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{
              background: "linear-gradient(135deg, #0B63A8 0%, #084B80 100%)",
              color: "white",
              boxShadow: "0 4px 12px rgba(11,63,107,0.3)",
            }}
            aria-label="Search"
          >
            🔍 Search
          </button>
        </div>
      </form>

      {/* Popular search suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fade-in-up"
          style={{ animationDuration: "0.2s" }}
          role="listbox"
          aria-label="Search suggestions"
        >
          <div className="px-3 py-2 border-b border-gray-50">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              {query.trim() ? "Suggestions" : "🔥 Popular Searches"}
            </p>
          </div>
          <div className="py-1">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0B63A8] transition-colors flex items-center gap-2.5 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={false}
              >
                <svg className="w-3.5 h-3.5 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
