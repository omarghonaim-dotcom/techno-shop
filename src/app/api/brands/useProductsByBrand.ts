// app/api/categories/useProductsByCategory.ts
import { ProductInterface, ProductsResponse } from '@/interfaces/products.interface';
import { useQuery } from '@tanstack/react-query';


async function fetchProductsByBrand(brandId: string): Promise<ProductsResponse> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}

export function useProductsByBrand(brandId: string) {
  return useQuery({
    queryKey: ['products', { brand: brandId }],
    queryFn: () => fetchProductsByBrand(brandId),
    enabled: !!brandId,
  });
}