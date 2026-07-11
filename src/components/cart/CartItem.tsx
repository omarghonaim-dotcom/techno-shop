"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Shield, RotateCcw, Send, Truck, Loader2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart.types";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
  onUpdateCount: (itemId: string, count: number) => void;
  onRemove: (itemId: string) => void;
  isUpdating: boolean;
  isRemoving: boolean;
  updatingItemId?: string;
  removingItemId?: string;
}

const features = [
  { icon: Shield, label: "Warranty" },
  { icon: RotateCcw, label: "Rare specimen" },
  { icon: Send, label: "Free shipping" },
  { icon: Truck, label: "Ships today" },
];

const PLACEHOLDER_PRODUCT_IMAGE = "/images/accescories.png";

function resolveProductImage(product: CartItemType["product"]): string | null {
  const cover = product.imageCover?.trim();
  if (cover && cover !== "undefined") return cover;

  const fromGallery = product.images?.find(
    (image) => image?.trim() && image !== "undefined",
  );
  return fromGallery ?? null;
}

export default function CartItemComponent({
  item,
  onUpdateCount,
  onRemove,
  isUpdating,
  isRemoving,
  updatingItemId,
  removingItemId,
}: CartItemProps) {
  const [imageError, setImageError] = useState(false);

  // Use product._id consistently — matches what onUpdateCount/onRemove are called with
  const isThisItemUpdating =
    isUpdating && updatingItemId === item.product._id;
  const isThisItemRemoving =
    isRemoving && removingItemId === item.product._id;

  const resolvedImageSrc = resolveProductImage(item.product);
  const imageSrc =
    imageError || !resolvedImageSrc
      ? PLACEHOLDER_PRODUCT_IMAGE
      : resolvedImageSrc;
  const imageAlt = item.product.title?.trim() || "Product image";
  const productTitle = item.product.title?.trim() || "Untitled product";

  useEffect(() => {
    setImageError(false);
  }, [resolvedImageSrc, item.product._id]);

  const handleIncrement = () => {
    if (isThisItemUpdating) return;
    onUpdateCount(item.product._id, item.count + 1);
  };

  const handleDecrement = () => {
    if (isThisItemUpdating) return;
    if (item.count > 1) {
      onUpdateCount(item.product._id, item.count - 1);
    }
  };

  const handleRemove = () => {
    if (isThisItemRemoving) return;
    // ✅ Use product._id to stay consistent with removingItemId comparison
    onRemove(item.product._id);
  };

  const formatPrice = (price: number) => price.toLocaleString("en-US");

  const discountedPrice = item.price * item.count;
  const originalPrice = Math.round(discountedPrice * 1.1);

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
        isThisItemRemoving ? "opacity-50 pointer-events-none" : ""
      }`}
      dir="rtl"
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Product Image */}
          <div className="relative w-32 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
            {isThisItemRemoving && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            )}
            <Link href={`products/${item.product._id}`}>
              <Image
                key={imageSrc}
                src={imageSrc}
                alt={imageAlt}
                width={100}
                height={100}
                className="object-contain p-2"
                onError={() => setImageError(true)}
                sizes="128px"
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 leading-relaxed">
              {productTitle}
            </h3>

            <div className="grid grid-cols-2 gap-1 mb-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 text-xs text-gray-500"
                >
                  <feature.icon
                    size={12}
                    className="text-purple-400 flex-shrink-0"
                  />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price and Controls Row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={isThisItemRemoving || isThisItemUpdating}
              className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
              title="Deleting"
            >
              {isThisItemRemoving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>

            {/* Counter */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={handleDecrement}
                disabled={item.count === 1 || isThisItemUpdating}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-medium"
              >
                −
              </button>

              <div className="w-10 h-8 flex items-center justify-center border-x border-gray-200">
                {isThisItemUpdating ? (
                  <Loader2 size={14} className="animate-spin text-purple-600" />
                ) : (
                  <span className="text-sm font-semibold text-gray-800">
                    {item.count}
                  </span>
                )}
              </div>

              <button
                onClick={handleIncrement}
                disabled={isThisItemUpdating}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="text-left" dir="ltr">
            <div className="text-xs text-gray-400 line-through text-right">
              {formatPrice(originalPrice)} جنيه
            </div>
            <div className="text-base font-bold text-gray-900 text-right">
              {formatPrice(discountedPrice)}{" "}
              <span className="text-xs font-normal text-gray-500">جنيه</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}