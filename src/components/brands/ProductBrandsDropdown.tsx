"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { brand } from "@/types/brands";

interface ProductBrandsDropdownProps {
  brands: brand[];
}

export default function ProductBrandsDropdown({
  brands,
}: ProductBrandsDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      {/* Trigger button */}
      <Link href="/brands">
        <button
          className="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold 
                     bg-white/80 backdrop-blur-sm border border-gray-200 
                     hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 
                     transition-all duration-200 shadow-sm"
        >
          <svg
            className="w-4 h-4 text-purple-600 group-hover:text-purple-700"
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
           Brands
          <svg
            className={`ml-1 hidden h-4 w-4 transition-transform duration-300 ease-out md:block ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </Link>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-0 mt-3 w-72 transform transition-all duration-300 ease-out z-50 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {/* Small notch arrow */}
        <div className="absolute top-0 left-6 -translate-y-full w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />

        <div
          className="bg-white rounded-xl shadow-xl border border-gray-100 
                      py-3 max-h-80 overflow-y-auto backdrop-blur-md 
                      ring-1 ring-black/5"
        >
          {brands.length > 0 ? (
            <>
              {/* Optional: header */}
              <div className="px-4 pb-2 text-xs uppercase tracking-wider text-gray-400 font-medium">
                Browse by brand
              </div>
              {brands.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/brands/${brand._id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm 
                             text-gray-700 hover:bg-purple-50 hover:text-purple-700 
                             transition-colors duration-150 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-purple-600 transition-colors" />
                  {brand.name}
                </Link>
              ))}
            </>
          ) : (
            <div className="px-4 py-6 text-sm text-gray-400 text-center">
              No brands available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}