// src/components/wishlist/WishlistCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Star } from "lucide-react";
import { WishlistProduct } from "@/types/wishlist";

interface WishlistCardProps {
  product: WishlistProduct;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
  isRemoving: boolean;
  isAddingToCart: boolean;
}

export default function WishlistCard({
  product,
  onRemove,
  onAddToCart,
  isRemoving,
  isAddingToCart,
}: WishlistCardProps) {
  const [imgError, setImgError] = useState(false);
  const isOutOfStock = product.quantity === 0;
  const hasDiscount =
    product.priceAfterDiscount &&
    product.priceAfterDiscount < product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  const displayPrice = hasDiscount ? product.priceAfterDiscount! : product.price;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-600 text-gray-600"
        }
      />
    ));
  };

  return (
    <div
      className={`relative flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group
        ${isOutOfStock
          ? "border-[#5E0A8E]/40 bg-[#151A44]/60"
          : "border-[#292D32] bg-[#151A44] hover:border-[#5E0A8E]/60"
        }`}
    >
      {/* Discount Badge */}
      {hasDiscount && !isOutOfStock && (
        <div className="absolute top-3 left-3 z-10 bg-[#00C2A8] text-black text-xs font-bold px-2 py-1 rounded">
          -{discountPercent}%
        </div>
      )}

      {/* Remove Button */}
      <button
        onClick={() => onRemove(product._id)}
        disabled={isRemoving}
        className="absolute top-3 right-3 z-10 bg-[#292D32]/80 hover:bg-red-500/80 
                   text-[#929292] hover:text-white p-2 rounded-lg 
                   transition-all duration-200 backdrop-blur-sm
                   opacity-0 group-hover:opacity-100 disabled:opacity-50"
        aria-label="Remove from wishlist"
      >
        {isRemoving ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>

      {/* Product Image */}
      <div className="relative h-52 bg-[#292D32]/40 overflow-hidden">
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
            <span className="text-[#929292] text-sm font-medium tracking-wider uppercase">
              Out of Stock
            </span>
          </div>
        )}
        <Image
          src={imgError ? "/placeholder-product.png" : product.imageCover}
          alt={product.title}
          fill
          className={`object-contain p-4 transition-transform duration-300 group-hover:scale-105 ${
            isOutOfStock ? "grayscale opacity-50" : ""
          }`}
          onError={() => setImgError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Brand & Category */}
        <div className="flex items-center gap-2">
          <span className="text-[#5E0A8E] text-xs font-semibold uppercase tracking-wider">
            {product.brand?.name || "Brand"}
          </span>
          <span className="text-[#929292] text-xs">•</span>
          <span className="text-[#929292] text-xs font-medium uppercase tracking-wider">
            {product.category?.name || "Category"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Tags/Features */}
        <div className="flex flex-wrap gap-1.5">
          {product.description
            ?.split(" ")
            .slice(0, 3)
            .map((tag, i) => (
              <span
                key={i}
                className="text-[#929292] text-[10px] border border-[#292D32] rounded px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {renderStars(product.ratingsAverage || 0)}
          </div>
          <span className="text-yellow-400 text-xs font-bold">
            {(product.ratingsAverage || 0).toFixed(1)}
          </span>
          <span className="text-[#929292] text-xs">
            ({product.ratingsQuantity?.toLocaleString() || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-white text-xl font-bold">
            ${displayPrice?.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-[#929292] text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isOutOfStock
                  ? "bg-[#929292]"
                  : product.quantity <= 5
                  ? "bg-yellow-400"
                  : "bg-[#00C2A8]"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                isOutOfStock
                  ? "text-[#929292]"
                  : product.quantity <= 5
                  ? "text-yellow-400"
                  : "text-[#00C2A8]"
              }`}
            >
              {isOutOfStock
                ? "OUT OF STOCK"
                : product.quantity <= 5
                ? `${product.quantity} LEFT`
                : "IN STOCK"}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => !isOutOfStock && onAddToCart(product._id)}
          disabled={isOutOfStock || isAddingToCart}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg 
                     font-semibold text-sm transition-all duration-200 mt-1
                     ${
                       isOutOfStock
                         ? "bg-[#292D32] text-[#929292] cursor-not-allowed"
                         : "bg-[#00C2A8] hover:bg-[#00a892] text-black active:scale-95 disabled:opacity-70"
                     }`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              <span>{isOutOfStock ? "UNAVAILABLE" : "ADD TO CART"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}