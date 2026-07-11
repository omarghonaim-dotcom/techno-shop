"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Category } from "@/types/category";

interface ProductCategoriesDropdownProps {
  categories: Category[];
}

export default function ProductCategoriesDropdown({
  categories,
}: ProductCategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* On small screens this only navigates to /categories */}
      <Link
        href="/categories"
        className="group flex items-center gap-2 rounded-lg border border-gray-200
                   bg-white/80 px-3 py-2 text-sm font-semibold shadow-sm
                   backdrop-blur-sm transition-all duration-200
                   hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
      >
        <svg
          className="h-4 w-4 text-purple-600 group-hover:text-purple-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>

        Categories

        {/* Only show dropdown icon on medium and larger screens */}
        <svg
          className={`ml-1 hidden h-4 w-4 transition-transform duration-300 ease-out md:block ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="m6 9 6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </Link>

      {/* Hidden on small screens; dropdown starts at md */}
      <div
        className={`absolute left-0 top-full z-50 mt-3 hidden w-72 transform
                    transition-all duration-300 ease-out md:block ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
      >
        <div className="absolute left-6 top-0 h-3 w-3 -translate-y-full rotate-45 border-l border-t border-gray-100 bg-white" />

        <div
          className="max-h-80 overflow-y-auto rounded-xl border border-gray-100
                     bg-white py-3 shadow-xl ring-1 ring-black/5"
        >
          {categories.length > 0 ? (
            <>
              <div className="px-4 pb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                Browse by category
              </div>

              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  onClick={() => setIsOpen(false)}
                  className="group mx-2 flex items-center gap-3 rounded-lg px-4 py-2.5
                             text-sm text-gray-700 transition-colors duration-150
                             hover:bg-purple-50 hover:text-purple-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 transition-colors group-hover:bg-purple-600" />
                  {category.name}
                </Link>
              ))}
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              No categories available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}