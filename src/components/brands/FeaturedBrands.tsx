// FeaturedCategories.tsx
'use client'

import { ProductInterface } from '@/interfaces/products.interface'
import ProductCard from '../products/Productcard';
import { useProductsByBrand } from '@/app/api/brands/useProductsByBrand';

export default function FeaturedBrands({ brandId }: { brandId: string }) {
  const { data, isLoading, error } = useProductsByBrand(brandId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong.</div>;
  if (!data?.data?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          dir="rtl"
        >
          {data.data.map((product: ProductInterface) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}