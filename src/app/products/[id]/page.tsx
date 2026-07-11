import { ProductInterface } from "@/interfaces/products.interface"; // adjust path
import ProductDetails from "./ProductDetails";
import { notFound } from "next/navigation";

async function getProduct(id: string): Promise<ProductInterface | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data as ProductInterface;
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}