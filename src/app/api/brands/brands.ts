import { brand, brandsResponse } from "@/types/brands";


export async function getBrands(): Promise<brand[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      {
        next: { revalidate: 3600 }, // ISR - revalidate every hour
      }
    );

    if (!res.ok) throw new Error("Failed to fetch brands");

    const data: brandsResponse = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}