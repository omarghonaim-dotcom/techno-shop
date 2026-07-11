"use client";

import Image from "next/image";
import Link from "next/link";

interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  href: string;
}

// Dummy data for brands - Replace these image paths with your actual public directory or external assets.
const BRANDS_DATA: Brand[] = [
  {
    id: "lenovo",
    name: "Lenovo",
    logoUrl: "/images/lenovo.png",
    href: "https://www.lenovo.com/",
  },
  {
    id: "huawei",
    name: "Huawei",
    logoUrl: "/images/huawei.png",
    href: "https://consumer.huawei.com/",
  },
  {
    id: "samsung",
    name: "Samsung",
    logoUrl: "/images/samsung.png",
    href: "https://www.samsung.com/",
  },
  {
    id: "sony",
    name: "Sony",
    logoUrl: "/images/sony.png",
    href: "https://www.sony.com/en/",
  },
  {
    id: "apple",
    name: "Apple",
    logoUrl: "/images/apple.png",
    href: "https://www.apple.com/",
  },
];

export default function BrandsAndPromo() {
  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 py-8 select-none"
      dir="rtl"
    >
      {/* --- Section Header --- */}
      <div className="flex items-center justify-between border-b-2 border-purple-800 pb-2 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-purple-950">
          The most popular brands
        </h2>
        <Link
          href="/brands"
          className="flex items-center gap-1.5 text-sm md:text-base font-semibold text-purple-800 hover:text-purple-600 transition-colors duration-200"
        >
          <span>view all</span>
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
      </div>

      {/* --- Brands Grid/Row --- */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center mb-10 px-2">
        {BRANDS_DATA.map((brand) => (
          <Link
            key={brand.id}
            href={brand.href}
            className="group w-full flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            title={brand.name}
          >
            {/* If using SVGs locally in public/brands/ folder */}
            <div className="relative w-24 h-12 md:w-32 md:h-16 flex items-center justify-center filter grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              <Image
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                fill
                sizes="(max-width: 768px) 100px, 150px"
                className="object-contain"
                priority
              />
            </div>
          </Link>
        ))}
      </div>

      {/* --- Promo Smartwatch Banner --- */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-l from-purple-800 via-purple-900 to-indigo-950 text-white min-h-[220px] md:min-h-[340px] flex items-center shadow-lg">
        {/* Background Subtle Mesh Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.15),transparent_50%)]" />

        <div className="container mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 items-center w-full relative z-10 gap-6">
          {/* Left: Product Images Stack (Rendered on top for mobile/desktop layouts) */}
          <div className="relative order-2 md:order-1 flex justify-center items-center h-48 md:h-80 w-full">
            <div className="relative w-full max-w-[340px] md:max-w-[480px] h-full transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/banner.png" // Put your combined smartwatches transparent png here
                alt="Smart watches
"
                fill
                sizes="(max-width: 768px) 340px, 480px"
                className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
                priority
              />
            </div>
          </div>

          {/* Right: Text & Call To Action */}
          <div className="order-1 md:order-2 flex flex-col items-center md:items-start text-center md:text-right space-y-3 md:space-y-5 py-6 md:py-0">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Smart watches
            </h3>
            <p className="text-purple-200/90 text-sm md:text-lg font-light tracking-wide">
              Fascinating experience
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-purple-900 font-semibold px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-xs md:text-sm hover:bg-purple-100 active:scale-95 transition-all duration-200 shadow-md shadow-black/10"
            >
              <span>View products</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
