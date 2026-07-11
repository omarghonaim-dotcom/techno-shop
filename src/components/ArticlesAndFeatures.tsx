"use client";

import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  href: string;
}

interface Feature {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const ARTICLES_DATA: Article[] = [
  {
    id: "1",
    title: "Can the Galaxy A05s run heavy games smoothly?",
    imageUrl: "/images/camera.png", // Replace with your image path
    href: "/blog",
  },
  {
    id: "2",
    title: "AKG K361 vs. Sennheiser HD 280 Pro: Which should you buy?",
    imageUrl: "/images/headphones.png", // Replace with your image path
    href: "/blog",
  },
  {
    id: "3",
    title: "Harman Kardon Onyx Studio 8 Review: A space-age speaker!",
    imageUrl: "/images/ring.png", // Replace with your image path
    href: "/blog",
  },
  {
    id: "4",
    title: "Classic Review of the Samsung Galaxy S24",
    imageUrl: "/images/mobileShow.png", // Replace with your image path
    href: "/blog",
  },
];

const FEATURES_DATA: Feature[] = [
  {
    id: "tech",
    title: "Latest Technology",
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    id: "guarantee",
    title: "Product Guarantee",
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    id: "delivery",
    title: "Fast Delivery",
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.088-1.41a1.125 1.125 0 00-1.09-1.056h-2.181a1.125 1.125 0 01-1.122-1.12V8.25c0-.621-.504-1.125-1.125-1.125H9.75M16.5 13.5H20.25m-15 0h1.5m.75-9h3.375c.621 0 1.125.504 1.125 1.125v1.5a3.375 3.375 0 003.375 3.375h1.5a1.125 1.125 0 011.125 1.125v1.5a1.125 1.125 0 01-1.125 1.125H9.75a1.125 1.125 0 01-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125z" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "24/7 Support",
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 10.5a8.25 8.25 0 11-15.536-4.243c.277-.552.887-.852 1.48-.684L4.93 10.29a1.5 1.5 0 001.285 1.285l2.452.408c.593.1 1.07-.384 1.07-.98v-2.31c0-.495-.31-.926-.783-1.065L7.33 7.14a1.5 1.5 0 00-1.285-1.285L3.593 5.447" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    ),
  },
];

export default function ArticlesAndFeatures() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      
      {/* ================= ARTICLES SECTION ================= */}
      <div className="space-y-6">
        {/* Header (Left-to-Right layout) */}
        <div className="flex items-center justify-between border-b border-purple-800 pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-purple-950">
            Articles
          </h2>
          <Link
            href="/blog"
            className="group flex items-center gap-1 text-sm md:text-base font-semibold text-purple-800 hover:text-purple-600 transition-colors duration-200"
          >
            <span>Read More</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES_DATA.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 hover:border-purple-200 bg-white transition-all duration-300 hover:shadow-lg"
            >
              {/* Image Area */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              {/* Text Area */}
              <div className="flex flex-grow flex-col justify-between p-4 min-h-[96px]">
                <h3 className="text-sm font-semibold leading-relaxed text-gray-800 group-hover:text-purple-900 transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <div className="border-t border-dashed border-gray-300 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {FEATURES_DATA.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center space-y-3 p-4 group"
            >
              <div className="p-3 rounded-full bg-purple-50 group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <span className="text-sm md:text-base font-bold text-gray-700 group-hover:text-purple-950 transition-colors duration-200">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}