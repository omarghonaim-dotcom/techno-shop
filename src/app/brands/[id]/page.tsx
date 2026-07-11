import FeaturedBrands from "@/components/brands/FeaturedBrands";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FeaturedBrands brandId={id} />;
}