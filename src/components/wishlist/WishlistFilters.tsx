// src/components/wishlist/WishlistFilters.tsx
"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface WishlistFiltersProps {
  categories: string[];
  activeFilter: string;
  sortBy: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const SORT_OPTIONS = ["Date Added", "Price: Low to High", "Price: High to Low", "Rating"];

export default function WishlistFilters({
  categories,
  activeFilter,
  sortBy,
  onFilterChange,
  onSortChange,
}: WishlistFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      {/* Category Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <button className="p-2 rounded-lg bg-[#151A44] border border-[#292D32] 
                          text-[#929292] hover:text-white transition-colors">
          <SlidersHorizontal size={16} />
        </button>

        <button
          onClick={() => onFilterChange("ALL")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
            ${activeFilter === "ALL"
              ? "bg-[#00C2A8] text-black"
              : "bg-[#151A44] border border-[#292D32] text-[#929292] hover:text-white hover:border-[#5E0A8E]/50"
            }`}
        >
          ALL
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 uppercase
              ${activeFilter === cat
                ? "bg-[#5E0A8E] text-white"
                : "bg-[#151A44] border border-[#292D32] text-[#929292] hover:text-white hover:border-[#5E0A8E]/50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-[#151A44] border border-[#292D32] text-[#929292] 
                     text-sm rounded-lg px-4 py-2 pr-8 cursor-pointer
                     hover:border-[#5E0A8E]/50 focus:outline-none focus:border-[#5E0A8E]
                     transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-[#151A44]">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#929292] pointer-events-none"
        />
      </div>
    </div>
  );
}