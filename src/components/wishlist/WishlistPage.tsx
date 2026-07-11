// src/components/wishlist/WishlistPage.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Heart,
  AlertCircle,
  RefreshCw,
  ShoppingCart,
  Trash2,
  Star,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useWishlist, WishlistProduct } from "@/hooks/useWishlist";
import { getToken } from "@/app/lib/token";

// ─── Not Logged In ────────────────────────────────────────────────────────────
function NotLoggedIn() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 rounded-full bg-[#5E0A8E]/20 border border-[#5E0A8E]/40 flex items-center justify-center mx-auto">
          <Heart size={28} className="text-[#5E0A8E]" />
        </div>
        <h2 className="text-white text-xl font-bold">
          Login to view your wishlist
        </h2>
        <p className="text-[#929292] text-sm">
          You need to be logged in to see your saved products.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="inline-block bg-[#5E0A8E] hover:bg-[#7B0AB8] text-white
                     px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl bg-[#151A44] border border-[#292D32] overflow-hidden animate-pulse">
      <div className="h-52 bg-[#292D32]" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-32 bg-[#292D32] rounded" />
        <div className="h-4 w-full bg-[#292D32] rounded" />
        <div className="h-4 w-3/4 bg-[#292D32] rounded" />
        <div className="flex gap-1 pt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-14 bg-[#292D32] rounded" />
          ))}
        </div>
        <div className="h-6 w-24 bg-[#292D32] rounded" />
        <div className="h-10 w-full bg-[#292D32] rounded-lg mt-2" />
      </div>
    </div>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={11}
          className={
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-[#292D32] text-[#292D32]"
          }
        />
      ))}
    </div>
  );
}

// ─── Wishlist Card ────────────────────────────────────────────────────────────
function WishlistCard({
  product,
  onRemove,
  onAddToCart,
  isRemoving,
  isAddingToCart,
}: {
  product: WishlistProduct;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
  isRemoving: boolean;
  isAddingToCart: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  const isOutOfStock = product.quantity === 0;
  const hasDiscount =
    !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPct = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;
  const displayPrice = hasDiscount
    ? product.priceAfterDiscount!
    : product.price;

  return (
    <div
      className={`relative flex flex-col rounded-xl overflow-hidden border
        transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group
        ${
          isOutOfStock
            ? "border-[#292D32]/60 bg-[#151A44]/60"
            : "border-[#292D32] bg-[#151A44] hover:border-[#5E0A8E]/50"
        }`}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-[#00C2A8] text-black text-xs font-bold px-2 py-1 rounded">
          -{discountPct}%
        </div>
      )}

      {/* Remove Button */}
      <button
        onClick={() => onRemove(product._id)}
        disabled={isRemoving}
        aria-label="Remove from wishlist"
        className="absolute top-3 right-3 z-10 bg-[#292D32]/80 hover:bg-red-500/80
                   text-[#929292] hover:text-white p-2 rounded-lg
                   backdrop-blur-sm transition-all duration-200
                   opacity-0 group-hover:opacity-100 disabled:opacity-40"
      >
        {isRemoving ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Trash2 size={15} />
        )}
      </button>

      {/* Image */}
      <div className="relative h-52 bg-[#1a1f3a] overflow-hidden">
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
            <span className="text-[#929292] text-xs font-semibold tracking-widest uppercase">
              Out of Stock
            </span>
          </div>
        )}
        <Image
          src={imgError ? "/placeholder.png" : product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-contain p-4 transition-transform duration-300
            group-hover:scale-105
            ${isOutOfStock ? "grayscale opacity-40" : ""}`}
          onError={() => setImgError(true)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Brand · Category */}
        <div className="flex items-center gap-2">
          <span className="text-[#5E0A8E] text-[11px] font-bold uppercase tracking-wider">
            {product.brand?.name ?? "—"}
          </span>
          <span className="text-[#929292] text-[11px]">·</span>
          <span className="text-[#929292] text-[11px] uppercase tracking-wider">
            {product.category?.name ?? "—"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Stars rating={product.ratingsAverage ?? 0} />
          <span className="text-yellow-400 text-xs font-bold">
            {(product.ratingsAverage ?? 0).toFixed(1)}
          </span>
          <span className="text-[#929292] text-xs">
            ({(product.ratingsQuantity ?? 0).toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-white text-xl font-bold">
            ${displayPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-[#929292] text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock */}
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
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isOutOfStock
                ? "text-[#929292]"
                : product.quantity <= 5
                ? "text-yellow-400"
                : "text-[#00C2A8]"
            }`}
          >
            {isOutOfStock
              ? "Out of Stock"
              : product.quantity <= 5
              ? `${product.quantity} Left`
              : "In Stock"}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => !isOutOfStock && onAddToCart(product._id)}
          disabled={isOutOfStock || isAddingToCart}
          className={`mt-auto w-full flex items-center justify-center gap-2
            py-2.5 rounded-lg text-sm font-bold transition-all duration-200
            ${
              isOutOfStock
                ? "bg-[#292D32] text-[#929292] cursor-not-allowed"
                : "bg-[#00C2A8] hover:bg-[#00a892] text-black active:scale-95 disabled:opacity-60"
            }`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={15} />
              {isOutOfStock ? "Unavailable" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WishlistPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("Default");

  // ✅ Track token on client only — start as null (unknown)
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken(); // ✅ await it
      setHasToken(!!token);
    };
    checkToken();
  }, []);

  const {
    wishlist,
    count,
    isLoading,
    isError,
    error,
    refetch,
    removeFromWishlist,
    isRemoving,
    removingId,
    addToCart,
    isAddingToCart,
    addingToCartId,
  } = useWishlist();

  // ── Derived data ─────────────────────────────────────────────────────────────
  const categories = useMemo(() => {
    const names = wishlist
      .map((p) => p.category?.name)
      .filter(Boolean) as string[];
    return [...new Set(names)];
  }, [wishlist]);

  const availableCount = useMemo(
    () => wishlist.filter((p) => p.quantity > 0).length,
    [wishlist]
  );

  const potentialSavings = useMemo(
    () =>
      wishlist.reduce((acc, p) => {
        if (p.priceAfterDiscount && p.priceAfterDiscount < p.price) {
          return acc + (p.price - p.priceAfterDiscount);
        }
        return acc;
      }, 0),
    [wishlist]
  );

  const filtered = useMemo(() => {
    let list =
      activeFilter === "ALL"
        ? [...wishlist]
        : wishlist.filter((p) => p.category?.name === activeFilter);

    if (sortBy === "Price ↑")
      list.sort(
        (a, b) =>
          (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price)
      );
    else if (sortBy === "Price ↓")
      list.sort(
        (a, b) =>
          (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price)
      );
    else if (sortBy === "Rating")
      list.sort((a, b) => (b.ratingsAverage ?? 0) - (a.ratingsAverage ?? 0));

    return list;
  }, [wishlist, activeFilter, sortBy]);

  // ── 1. Still checking token (waiting for useEffect) ───────────────────────
  if (hasToken === null) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#5E0A8E]/30 border-t-[#5E0A8E] rounded-full animate-spin" />
      </div>
    );
  }

  // ── 2. No token → show login prompt ──────────────────────────────────────
  if (!hasToken) return <NotLoggedIn />;

  // ── 3. Loading skeleton ───────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F1117] px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 rounded-full bg-[#292D32] animate-pulse" />
            <div className="h-8 w-48 bg-[#292D32] rounded animate-pulse" />
          </div>
          <div className="h-4 w-64 bg-[#292D32] rounded animate-pulse mb-8 ml-10" />
          <div className="flex gap-2 mb-8 flex-wrap">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-24 bg-[#151A44] rounded-lg animate-pulse"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── 4. Error ──────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto">
            <AlertCircle size={28} className="text-red-400" />
          </div>
          <h2 className="text-white text-xl font-bold">
            Failed to load wishlist
          </h2>
          <p className="text-[#929292] text-sm">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 mx-auto bg-[#5E0A8E] hover:bg-[#7B0AB8]
                       text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── 5. Empty ──────────────────────────────────────────────────────────────
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex flex-col px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-1">
            <Heart size={28} className="fill-[#5E0A8E] text-[#5E0A8E]" />
            <h1 className="text-white text-3xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-[#929292] text-sm ml-10 mb-10">0 items saved</p>
          <div className="flex flex-col items-center justify-center mt-24 gap-4">
            <div className="w-24 h-24 rounded-full bg-[#151A44] border-2 border-[#292D32] flex items-center justify-center">
              <Heart size={40} className="text-[#292D32]" />
            </div>
            <h2 className="text-white text-2xl font-bold">
              Your wishlist is empty
            </h2>
            <p className="text-[#929292] text-sm">
              Save products you love by clicking the heart icon.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="bg-[#5E0A8E] hover:bg-[#7B0AB8] text-white px-8 py-3
                         rounded-lg font-semibold transition-colors mt-2"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── 6. Main render ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0F1117] px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Heart size={28} className="fill-[#5E0A8E] text-[#5E0A8E]" />
              <h1 className="text-white text-3xl font-bold">My Wishlist</h1>
            </div>
            <p className="text-[#929292] text-sm ml-10">
              <span className="text-white font-medium">{count} items</span>{" "}
              saved
              {availableCount > 0 && (
                <>
                  {" · "}
                  <span className="text-white font-medium">
                    {availableCount} available
                  </span>{" "}
                  to order
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {potentialSavings > 0 && (
              <div className="flex items-center gap-2 bg-[#151A44] border border-[#00C2A8]/30 rounded-lg px-4 py-2 text-sm">
                <RefreshCw size={13} className="text-[#00C2A8]" />
                <span className="text-[#929292]">
                  <span className="text-[#00C2A8] font-bold">
                    ${potentialSavings.toFixed(2)}
                  </span>{" "}
                  potential savings
                </span>
              </div>
            )}
            {availableCount > 0 && (
              <div className="flex items-center gap-2 bg-[#151A44] border border-[#292D32] rounded-lg px-4 py-2 text-sm">
                <Package size={13} className="text-[#929292]" />
                <span className="text-[#929292]">
                  <span className="text-white font-bold">{availableCount}</span>{" "}
                  ready to ship
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter("ALL")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                ${
                  activeFilter === "ALL"
                    ? "bg-[#00C2A8] text-black"
                    : "bg-[#151A44] border border-[#292D32] text-[#929292] hover:text-white"
                }`}
            >
              ALL
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all uppercase
                  ${
                    activeFilter === cat
                      ? "bg-[#5E0A8E] text-white"
                      : "bg-[#151A44] border border-[#292D32] text-[#929292] hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#151A44] border border-[#292D32]
                         text-[#929292] text-sm rounded-lg px-4 py-2 pr-8
                         focus:outline-none focus:border-[#5E0A8E] cursor-pointer"
            >
              {["Default", "Price ↑", "Price ↓", "Rating"].map((o) => (
                <option key={o} value={o} className="bg-[#151A44]">
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#929292] text-lg">
              No items in{" "}
              <span className="text-white font-semibold">{activeFilter}</span>
            </p>
            <button
              onClick={() => setActiveFilter("ALL")}
              className="text-[#00C2A8] text-sm mt-2 hover:underline"
            >
              Show all items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <WishlistCard
                key={product._id}
                product={product}
                onRemove={removeFromWishlist}
                onAddToCart={addToCart}
                isRemoving={isRemoving && removingId === product._id}
                isAddingToCart={isAddingToCart && addingToCartId === product._id}
              />
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-center mt-10 text-[#929292] text-sm">
            Showing{" "}
            <span className="text-white font-medium">{filtered.length}</span> of{" "}
            <span className="text-white font-medium">{count}</span> items
          </p>
        )}
      </div>
    </div>
  );
}