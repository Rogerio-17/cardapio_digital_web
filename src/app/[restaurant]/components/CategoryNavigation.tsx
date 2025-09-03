"use client";

import { Category } from "../types";

interface CategoryNavigationProps {
  categories: Category[];
}

export default function CategoryNavigation({
  categories,
}: CategoryNavigationProps) {
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
        Nosso Cardápio
      </h2>
      <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 mx-auto rounded-full shadow-sm mb-8"></div>

      {/* Tabs de Categorias */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="px-6 py-3 bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 rounded-2xl font-semibold text-purple-700 hover:text-purple-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => scrollToCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
