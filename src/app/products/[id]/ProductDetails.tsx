"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ShieldCheck,
  CreditCard,
  Star,
  Loader2,
  Check,
} from "lucide-react";
import { ProductInterface } from "@/interfaces/products.interface";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCart } from "@/hooks/useCart";


const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductDetails({
  product,
}: {
  product: ProductInterface;
}) {
  const allImages = [product.imageCover, ...(product.images || [])];
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors?.[0] ?? "#000000"
  );
  const [justAdded, setJustAdded] = useState(false);

  // ✅ Cart Mutation
  const {  addToCart,  isAddingToCart } = useCart();

  // ✅ Handle Add to Cart
  const handleAddToCart = () => {
    if (!product._id) return;

    addToCart(product._id, {
      onSuccess: () => {
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
      },
    });
  };

  const handlePrev = () =>
    setActiveImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  const handleNext = () =>
    setActiveImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

  const features = [
    { label: "category", value: product.category?.name },
    { label: "brand", value: product.brand?.name },
    {
      label: "subcategory",
      value: product.subcategory?.map((s) => s.name).join("، "),
    },
    { label: "quantity", value: `${product.quantity}` },
    { label: "sold", value: product.sold ? `${product.sold}` : "—" },
    { label: "shipping", value: product.freeShipping ? "" : "free" },
  ].filter((f) => f.value);

  const isOutOfStock = product.quantity === 0;

  return (
    <section dir="rtl" className="mx-auto w-full max-w-[1280px] px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center justify-end gap-2 text-xs text-zinc-500 md:text-sm">
        <Link href="/products">products</Link>
        <ChevronLeft className="h-3 w-3" />
        <Link href={`/#/${product.category?.slug}`}>
          {product.category?.name}
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <Link href={`/#/${product.brand?.slug}`}>{product.brand?.name}</Link>
        <ChevronLeft className="h-3 w-3" />
        <span className="text-zinc-800">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Features Panel */}
        <aside className="order-3 rounded-2xl border border-dashed border-purple-300 p-4 lg:order-1 lg:col-span-3">
          <h2 className="mb-4 text-left text-lg font-bold text-zinc-800">
            Details
          </h2>
          <ul className="space-y-3">
            {features.map((f, idx) => (
              <li
                key={f.label}
                className={`flex items-center justify-between gap-2 pb-3 text-sm ${
                  idx !== features.length - 1
                    ? "border-b border-dashed border-purple-200"
                    : ""
                }`}
              >
                <span className="text-zinc-800">{f.value}</span>
                <span className="text-zinc-500">:{f.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Info Panel */}
        <div className="order-2 lg:col-span-5">
          <h1 className="text-right text-lg font-extrabold leading-7 text-zinc-900 md:text-2xl">
            {product.title}
          </h1>
          <p className="mt-2 text-right text-sm text-zinc-500" dir="ltr">
            {product.description?.slice(0, 80)}
          </p>

          {/* Rating */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <RatingStars rating={product.ratingsAverage || 0} />
            <span className="text-sm text-zinc-600">: ratingsAverage</span>
          </div>

          {/* Color */}
          {product.availableColors && product.availableColors.length > 0 && (
            <div className="mt-4 text-right">
              <div className="mb-2 text-sm font-bold text-zinc-800">
                رنگ: {selectedColor}
              </div>
              <div className="flex flex-row-reverse gap-2">
                {product.availableColors.map((color: string) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`h-7 w-7 rounded border-2 transition ${
                      selectedColor === color
                        ? "border-purple-600"
                        : "border-zinc-200"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Warranty */}
          <div className="mt-4 flex items-center justify-end gap-2 text-sm text-zinc-700">
            <span>Warranty: 1 month</span>
            <ShieldCheck className="h-5 w-5 text-purple-600" />
          </div>

          {/* Price */}
          <div className="mt-4 text-right">
            {product.priceAfterDiscount ? (
              <>
                <span className="ml-2 text-sm text-zinc-400 line-through">
                  {formatPrice(product.price)} جنيه
                </span>
                <span className="text-2xl font-extrabold text-zinc-900">
                  {formatPrice(product.priceAfterDiscount)}
                  <span className="mr-1 text-sm font-normal">جنيه</span>
                </span>
              </>
            ) : (
              <span className="text-2xl font-extrabold text-zinc-900">
                {formatPrice(product.price)}
                <span className="mr-1 text-sm font-normal">جنيه</span>
              </span>
            )}
          </div>

          {/* ✅ Actions - Add to Cart Button with Mutation */}
          <div className="mt-4 flex flex-row-reverse items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAddingToCart || isOutOfStock || justAdded}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 md:text-base ${
                justAdded
                  ? "bg-green-600 hover:bg-green-700"
                  : isOutOfStock
                  ? "cursor-not-allowed bg-gray-400"
                  : isAddingToCart
                  ? "cursor-wait bg-purple-400"
                  : "bg-[#6A0DAD] hover:bg-[#5a0b94] hover:shadow-lg hover:shadow-purple-200"
              } disabled:opacity-90`}
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : justAdded ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Added to cart ✓</span>
                </>
              ) : isOutOfStock ? (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>Out of Stock</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to cart</span>
                </>
              )}
            </button>
          </div>

          {/* Stock + Installment */}
          <div className="mt-4 flex flex-row-reverse items-center justify-between text-xs text-red-500">
            <span>{product.quantity} : Left </span>
            <Link
              href="/installment"
              className="flex items-center gap-1 text-purple-600"
            >
              <CreditCard className="h-4 w-4" />
              installment
            </Link>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="order-1 lg:order-3 lg:col-span-4">
          <div className="relative rounded-2xl bg-zinc-50 p-4">
            <button
              type="button"
              onClick={handlePrev}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-zinc-50"
              aria-label="Previous image"
            >
              <ChevronRight className="h-5 w-5 text-zinc-700" />
            </button>

            <div className="relative mx-auto aspect-square w-full max-w-[360px]">
              <Image
                src={allImages[activeImage]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-zinc-50"
              aria-label="Next image"
            >
              <ChevronLeft className="h-5 w-5 text-zinc-700" />
            </button>
          </div>

          {allImages.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {allImages.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-zinc-50 p-1 transition ${
                    activeImage === idx
                      ? "border-purple-600"
                      : "border-zinc-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}