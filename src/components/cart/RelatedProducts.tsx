// src/components/cart/RelatedProducts.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartProduct } from "@/types/cart.types";

interface RelatedProductsProps {
  products: CartProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { addToCart, isAddingToCart } = useCart();
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleAddToCart = async (productId: string) => {
    setAddingProductId(productId);
    await addToCart( productId );
    setAddingProductId(null);
  };

  const formatPrice = (price: number) => price.toLocaleString("en-US");

  if (!products || products.length === 0) return null;

  return (
    <div
      className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      dir="rtl"
    >
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-base font-bold text-purple-600 flex items-center gap-2">
          <span className="w-1 h-5 bg-purple-600 rounded-full" />
          Related Products{" "}
        </h2>
      </div>

      <div className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {products.slice(0, 6).map((product) => (
            <div
              key={product._id}
              className="min-w-[160px] max-w-[160px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 flex-shrink-0 group"
            >
              {/* Product Image */}
              <div className="relative h-36 bg-white">
                <Image
                  src={product.imageCover || "/placeholder-product.png"}
                  alt={product.title}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  sizes="160px"
                />
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="absolute top-2 left-2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <Heart
                    size={14}
                    className={
                      wishlist.has(product._id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="text-xs text-gray-700 font-medium line-clamp-2 mb-2 leading-relaxed min-h-[32px]">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">
                    {product.ratingsAverage}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({product.ratingsQuantity})
                  </span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-800">
                    {formatPrice(product.price || 0)}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      جنيه
                    </span>
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  disabled={isAddingToCart && addingProductId === product._id}
                  className="w-full py-1.5 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all flex items-center justify-center gap-1 disabled:opacity-60"
                >
                  {isAddingToCart && addingProductId === product._id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart size={12} />
                      Add to cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
