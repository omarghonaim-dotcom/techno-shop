// lib/api/categories.ts
import { Category, CategoriesResponse } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        next: { revalidate: 3600 }, // ISR - revalidate every hour
      }
    );

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data: CategoriesResponse = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}