import { brand } from "@/types/brands";
import { getBrands } from "../api/brands/brands";
import BrandCard from "@/components/brands/BrandCard";

export const metadata = {
  title: "Shop by brand",
  description: "Browse all product brands",
};

export default async function BrandsPage() {
  const brands: brand[] = await getBrands();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <span className="mb-2 inline-block h-4 w-1 rounded-full bg-primary-500 align-middle" />
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Shop by brand
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Find what you're looking for, organized just for you.
        </p>
      </div>

      {brands.length === 0 && (
        <div className="rounded-card border border-neutral-200 bg-neutral-50 p-10 text-center">
          <p className="text-neutral-600">No brands available yet.</p>
        </div>
      )}

      {brands.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      )}
    </main>
  );
}