import ProductDetailClient from "@/components/ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{
    restaurant: string;
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { restaurant, id } = await params;

  return <ProductDetailClient restaurant={restaurant} productId={id} />;
}
