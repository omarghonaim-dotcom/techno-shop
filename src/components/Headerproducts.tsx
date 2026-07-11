 "use client"

import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

export default function Headerproducts() {
    const categories = [
  { title: "Laptop", image: "/images/laptop.png" },
  { title: "Mobile", image: "/images/mobile.png" },
  { title: "Gaming", image: "/images/gaming.png" },
  { title: "Watch", image: "/images/watch.png" },
  { title: "Pc", image: "/images/pc.png" },
  { title: "Accessories", image: "/images/accescories.png" },
];
  return (
    <div dir="rtl" className="w-full">
      {/* Mobile: Swiper */}
      <div className="md:hidden overflow-hidden" dir="rtl">
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        spaceBetween={8}
        slidesPerView="auto"
        slidesOffsetBefore={12}
        slidesOffsetAfter={12}
        className="category-swiper"
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index} className="w-23!">
            <div className="rounded-md bg-[#fafafa] p-3 text-center">
              <Image
                src={item.image}
                alt={item.title}
                width={55}
                height={55}
                quality={100}
                className="mx-auto object-contain"
                priority
              />
              <span className="mt-2 block text-sm font-medium text-center">
                {item.title}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      {/* Tablet and Desktop */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 justify-items-center">
        {categories.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-[160px] p-5 rounded-lg bg-white hover:shadow-xl transition duration-300 hover:scale-105 text-center"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={117}
              height={117}
              quality={100}
              className="mx-auto transition-transform duration-300 hover:scale-110"
              priority
            />
            <span className="mt-2 block font-bold text-center">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
