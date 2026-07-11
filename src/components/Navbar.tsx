import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../app/lib/nextAuth";
import NavbarClient from "./NavbarClient";
import ProductCategoriesDropdown from "./categories/ProductCategoriesDropdown";
import { getCategories } from "@/app/api/categories/categories";
import { getBrands } from "@/app/api/brands/brands";
import ProductBrandsDropdown from "./brands/ProductBrandsDropdown";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const categories = await getCategories();
  const brands = await getBrands();

  return (
    <header className="w-full border-b border-gray-200 bg-white" dir="ltr">
      <div className="mx-auto max-w-[1440px] px-4 py-3 lg:px-6 lg:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Logo */}
          <div className="order-2 flex items-center justify-between lg:order-3 lg:justify-end lg:gap-3">
            <Link href={"/"}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right">
                  <h1 className="text-[16px] font-extrabold text-purple-700 sm:text-[18px] lg:text-[20px]">
                    Techno Shop
                  </h1>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-200 sm:h-10 sm:w-10 lg:h-14 lg:w-14">
                  <svg
                    className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6 lg:h-10 lg:w-10"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 10V54" />
                    <path d="M20 10L40 2V18L20 10Z" />
                    <path d="M28 22H44" />
                    <path d="M28 30H48" />
                    <path d="M28 38H44" />
                    <circle cx="50" cy="22" r="2" fill="currentColor" />
                    <circle cx="54" cy="30" r="2" fill="currentColor" />
                    <circle cx="50" cy="38" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="order-1 w-full flex-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-full lg:max-w-[600px]">
              <input
                type="text"
                placeholder="search"
                className="h-11 w-full rounded-xl border border-gray-300 pr-11 pl-4 text-right text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 sm:h-12 sm:pr-12 sm:text-base"
              />
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 sm:left-4 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
          </div>

          {/* Pass session data to Client Component */}
          <NavbarClient
            userImage={session?.user?.image ?? null}
            userName={session?.user?.name ?? null}
            isAuthenticated={!!session}
          />
        </div>

        {/* Navigation Links */}
        <nav
          className="mt-4 flex items-center justify-between border-t pt-3 lg:mt-6 lg:pt-4"
          dir="ltr"
        >
          <div className="scrollbar-hide flex w-full items-center gap-4 overflow-x-auto whitespace-nowrap text-sm text-gray-800 sm:gap-6 sm:text-[15px] lg:w-auto lg:gap-8 lg:overflow-visible lg:text-[16px]">
            <ProductCategoriesDropdown categories={categories} />
            <ProductBrandsDropdown brands={brands} />

            <Link href="/blog" className="shrink-0 hover:text-purple-700">
              Blog
            </Link>
            <Link href="contact" className="shrink-0 hover:text-purple-700">
              Contact us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}