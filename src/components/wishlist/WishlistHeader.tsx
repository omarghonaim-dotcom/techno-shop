// src/components/wishlist/WishlistHeader.tsx
"use client";

import { Heart, RefreshCw, Package } from "lucide-react";

interface WishlistHeaderProps {
  count: number;
  availableCount: number;
  potentialSavings: number;
}

export default function WishlistHeader({
  count,
  availableCount,
  potentialSavings,
}: WishlistHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Heart
            size={28}
            className="fill-[#5E0A8E] text-[#5E0A8E]"
          />
          <h1 className="text-white text-3xl font-bold">My Wishlist</h1>
        </div>
        <p className="text-[#929292] text-sm ml-10">
          <span className="text-white font-medium">{count} items</span> saved
          {availableCount > 0 && (
            <>
              {" "}·{" "}
              <span className="text-white font-medium">{availableCount} available</span>{" "}
              to order
            </>
          )}
        </p>
      </div>

      {/* Stats Badges */}
      <div className="flex items-center gap-3 flex-wrap">
        {potentialSavings > 0 && (
          <div className="flex items-center gap-2 bg-[#151A44] border border-[#00C2A8]/30 
                         rounded-lg px-4 py-2 text-sm">
            <RefreshCw size={14} className="text-[#00C2A8]" />
            <span className="text-[#929292]">
              <span className="text-[#00C2A8] font-bold">
                ${potentialSavings.toFixed(2)}
              </span>{" "}
              potential savings
            </span>
          </div>
        )}
        {availableCount > 0 && (
          <div className="flex items-center gap-2 bg-[#151A44] border border-[#292D32] 
                         rounded-lg px-4 py-2 text-sm">
            <Package size={14} className="text-[#929292]" />
            <span className="text-[#929292]">
              <span className="text-white font-bold">{availableCount}</span>{" "}
              ready to ship
            </span>
          </div>
        )}
      </div>
    </div>
  );
}