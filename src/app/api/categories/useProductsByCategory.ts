// app/api/categories/useProductsByCategory.ts
import { ProductInterface, ProductsResponse } from '@/interfaces/products.interface';
import { useQuery } from '@tanstack/react-query';


async function fetchProductsByCategory(categoryId: string): Promise<ProductsResponse> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['products', { category: categoryId }],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
  });
}