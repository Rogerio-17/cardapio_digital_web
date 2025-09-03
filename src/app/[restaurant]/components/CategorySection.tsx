"use client";

import { Category } from "../types";
import ProductCard from "./ProductCard";
import Carousel from "./Carousel";

interface CategorySectionProps {
  category: Category;
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <section id={category.id} className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
          {category.name}
        </h3>
        <div className="hidden md:block text-sm text-gray-500 font-medium">
          Deslize para ver mais →
        </div>
      </div>

      <Carousel cardWidth={288}>
        {category.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFeatured={false}
            className="flex-shrink-0 w-72"
          />
        ))}
      </Carousel>
    </section>
  );
}
