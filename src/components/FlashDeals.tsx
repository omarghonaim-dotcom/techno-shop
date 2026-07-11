"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

type Product = {
  id: number;
  title: string;
  image: string;
  discount: number;
  oldPrice: number;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    title: "مانیتور سامسونگ مدل LS19A سایز 19 اینچ",
    image: "/images/monitor.png",
    discount: 10,
    oldPrice: 8900,
    price: 8200,
  },
  {
    id: 2,
    title: "کیبورد مکانیکال ریزر BlackWidow Essential Green",
    image: "/images/keyboard.png",
    discount: 10,
    oldPrice: 2100,
    price: 1939,
  },
  {
    id: 3,
    title: "هدست کولر مستر CH331",
    image: "/images/headset.png",
    discount: 10,
    oldPrice: 2100,
    price: 1939,
  },
  {
    id: 4,
    title: "موس کولر مستر CM110",
    image: "/images/mouse.png",
    discount: 10,
    oldPrice: 1439,
    price: 1339,
  },
  {
    id: 5,
    title: "لپ تاپ ایسوس Notebook X1605i7",
    image: "/images/laptop.png",
    discount: 10,
    oldPrice: 2950,
    price: 2849,
  },
  {
    id: 6,
    title: "اسپیکر بلوتوثی قابل حمل",
    image: "/images/speaker.png",
    discount: 12,
    oldPrice: 3500,
    price: 3000,
  },
];

const timer = [
  { value: "40", label: "ثانیه" },
  { value: "32", label: "دقیقه" },
  { value: "2", label: "ساعت" },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-3 md:p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white md:text-xs">
          {product.discount}%
        </span>

        <button type="button" className="text-[#6A0DAD]">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="relative mx-auto mb-3 aspect-square w-full max-w-[110px] md:max-w-[150px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 110px, 150px"
          className="object-contain"
        />
      </div>

      <h3 className="min-h-[42px] text-[13px] leading-5 text-zinc-800 md:min-h-[48px] md:text-sm">
        {product.title}
      </h3>

      <div className="mt-auto pt-3">
        <p className="text-xs text-zinc-400 line-through">
          {formatPrice(product.oldPrice)} جنيه
        </p>

        <div className="mt-2 inline-flex rounded-md bg-[#6A0DAD] px-3 py-2 text-sm font-bold text-white">
          {formatPrice(product.price)} جنيه
        </div>
      </div>
    </article>
  );
}

export default function FlashDeals() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section dir="" className="mx-auto w-full max-w-[1280px] px-2 py-6">
      <div className="rounded-2xl bg-[#6A0DAD] p-2 md:p-4">
        <div className="flex flex-row-reverse gap-2 md:gap-4">
          {/* Right promo panel */}
          <aside className="flex w-[138px] shrink-0 flex-col justify-between rounded-2xl px-2 py-4 text-white md:w-[290px] md:px-6 md:py-8">
            <div>
              <h2 className="text-center text-2xl font-extrabold leading-tight md:text-right md:text-5xl md:leading-[1.35]">
                Amazing
                <br />
                Deals
              </h2>

              <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl bg-white text-[#6A0DAD] md:mt-8">
                {timer.map((item, index) => (
                  <div
                    key={item.label}
                    className="relative py-2 text-center md:py-3"
                  >
                    {index !== 0 && (
                      <span className="absolute left-0 top-1/2 h-8 -translate-y-1/2 border-l border-[#e8d7f3]" />
                    )}

                    <div className="text-lg font-black md:text-4xl">
                      {item.value}
                    </div>
                    <div className="text-[10px] md:text-xs">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/products"
              className="mt-4 inline-flex items-center justify-center gap-1 self-center text-xs md:mt-8 md:self-end md:text-lg"
            >
              View all
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </aside>

          {/* Slider */}
          <div className="relative min-w-0 flex-1">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              className="absolute left-3 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#6A0DAD] shadow-lg md:flex"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              className="absolute right-3 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#6A0DAD] shadow-lg md:flex"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            <Swiper
              dir="rtl"
              onSwiper={setSwiper}
              grabCursor
              breakpoints={{
                0: {
                  slidesPerView: 1.15,
                  spaceBetween: 8,
                },
                360: {
                  slidesPerView: 2.05,
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: 2.6,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3.2,
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: 4.1,
                  spaceBetween: 12,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 14,
                },
              }}
            >
              <Link href={"/products"}>
                {products.map((product) => (
                  <SwiperSlide key={product.id} className="!h-auto">
                    {/* <ProductCard product={product} /> */}
                    <Link
                      href={`/products`}
                      className="block h-full"
                    >
                      <ProductCard product={product} />
                    </Link>
                  </SwiperSlide>
                ))}
              </Link>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
