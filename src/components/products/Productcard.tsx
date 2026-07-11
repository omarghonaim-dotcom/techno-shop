// src/components/ProductCard.tsx
"use client";

import { useAddToCart } from "@/hooks/useAddToCart";
import { useWishlistToggle } from "@/hooks/useWishlistToggle";
import { ProductInterface } from "@/interfaces/products.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── Wishlist Button ──────────────────────────────────────────────────────────
function WishlistButton({ productId }: { productId: string }) {
  const { isWishlisted, toggle, isPending } = useWishlistToggle(productId);

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`
        absolute top-3 left-3 z-20
        w-8 h-8
        flex items-center justify-center
        rounded-full
        border
        shadow-sm
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[#4c1d95]/50
        disabled:opacity-60 disabled:cursor-not-allowed
        ${
          isWishlisted
            ? // ── filled state ──────────────────────────────────────────────
              "bg-red-500 border-red-500 text-white scale-110 shadow-red-200"
            : // ── empty state ───────────────────────────────────────────────
              "bg-white border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-400 hover:scale-110"
        }
      `}
    >
      {isPending ? (
        /* Spinner while mutating */
        <svg
          className="w-3.5 h-3.5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        /* Heart icon — filled or outline */
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 transition-transform duration-200"
          fill={isWishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}
    </button>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
export default function ProductCard({ product }: { product: ProductInterface }) {
  const [justAdded, setJustAdded] = useState(false);

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product._id) return;
    addToCart(product._id, {
      onSuccess: () => {
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
      },
    });
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative block bg-white border border-gray-200 px-3 py-3 md:px-4 md:py-4 hover:shadow-sm transition"
    >
      <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">

        {/* ── Wishlist Button ── top-left ─────────────────────────────────── */}
        <WishlistButton productId={product._id} />

        {/* ── Image Section ──────────────────────────────────────────────── */}
        <div className="p-6 flex justify-center items-center h-48">
          <Image
            width={100}
            height={100}
            src={product.imageCover}
            alt={product.title}
            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* ── Content Section ─────────────────────────────────────────────── */}
        <div className="px-4 pb-4 flex flex-col flex-grow">

          {/* Title */}
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-3 leading-7">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-between mb-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-700">
                <i className="fa-solid fa-star text-yellow-300" />
                {product.ratingsAverage}
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            {product.priceAfterDiscount && (
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {product.priceAfterDiscount}
                </span>
                <span className="text-gray-400 text-xs line-through decoration-gray-400">
                  {product.price}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-2">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`
                  hidden md:flex items-center justify-center gap-1.5
                  px-3 py-1.5 rounded-lg text-sm font-bold
                  w-full transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-[#4c1d95]/40
                  disabled:opacity-60 disabled:cursor-not-allowed
                  ${
                    justAdded
                      ? "bg-green-500 text-white"
                      : "bg-[#4c1d95] text-white hover:bg-[#3b1677] active:scale-95"
                  }
                `}
              >
                {isAddingToCart ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>Adding…</span>
                  </>
                ) : justAdded ? (
                  <>
                    {/* checkmark */}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    {/* cart icon */}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add to cart</span>
                  </>
                )}
              </button>

              {/* Price Badge */}
              <div className="bg-[#4c1d95] text-white px-3 py-1.5 rounded-lg text-sm font-bold w-full md:w-auto text-center">
                <span className="text-xs font-normal opacity-80 ms-1">
                  {product.priceAfterDiscount
                    ? product.priceAfterDiscount
                    : product.price}
                  جنيه
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}