"use client";

import Image from "next/image";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoriesCarouselProps {
  categories: Category[];
}

export default function CategoriesCarousel({
  categories,
}: CategoriesCarouselProps) {
  return (
    <div className="bg-white px-4 py-2">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Categorias</h2>
      </div>

      {/* Carrossel de categorias */}
      <div
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center min-w-fit cursor-pointer group"
          >
            {/* Imagem da categoria (72px = 24px menor que 96px da imagem de perfil) */}
            <div className="relative w-[72px] h-[72px] mb-2 group-hover:scale-105 transition-transform">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover rounded-full shadow-md"
              />
            </div>

            {/* Nome da categoria */}
            <span className="text-sm text-gray-700 text-center font-medium max-w-[80px] truncate">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
