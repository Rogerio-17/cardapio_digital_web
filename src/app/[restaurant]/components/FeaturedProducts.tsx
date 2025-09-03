"use client";

import { Product } from "../types";
import ProductCard from "./ProductCard";
import Carousel from "./Carousel";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          🔥 Mais Pedidos
        </h2>
        <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 mx-auto rounded-full shadow-sm"></div>
        <p className="text-gray-600 mt-4 text-lg">
          Os favoritos dos nossos clientes
        </p>
      </div>

      <Carousel cardWidth={320}>
        {products.map((product) => (
          <ProductCard
            key={`featured-${product.id}`}
            product={product}
            isFeatured={true}
            className="flex-shrink-0 w-80"
          />
        ))}
      </Carousel>
    </section>
  );
}
