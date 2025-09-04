"use client";

import Image from "next/image";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface MenuProps {
  categories: Category[];
  products: Product[];
}

export default function Menu({ categories, products }: MenuProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  // Adicionar categoria "Todas as categorias" no início
  const allCategories = [
    {
      id: "all",
      name: "Todas as categorias",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150&h=150&fit=crop",
    },
    ...categories,
  ];

  // Filtrar produtos baseado na categoria selecionada
  const filteredProducts =
    selectedCategoryId === "all"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

  // Obter nome da categoria selecionada
  const selectedCategoryName =
    allCategories.find((cat) => cat.id === selectedCategoryId)?.name ||
    "Todas as categorias";

  return (
    <div className="bg-gray-50">
      {/* Carrossel de Categorias */}
      <div className="bg-white px-4 py-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Categorias</h2>
        </div>

        <div
          className="flex gap-4 overflow-x-auto py-2 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {allCategories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col items-center min-w-fit cursor-pointer group ${
                selectedCategoryId === category.id
                  ? "opacity-100"
                  : "opacity-80"
              }`}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {/* Imagem da categoria */}
              <div
                className={`relative w-[72px] h-[72px] mb-2 group-hover:scale-105 transition-all duration-200 rounded-full ${
                  selectedCategoryId === category.id
                    ? "ring-2 ring-orange-500 ring-offset-2"
                    : ""
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover rounded-full shadow-md"
                />
              </div>

              {/* Nome da categoria */}
              <span
                className={`text-sm text-center font-medium max-w-[80px] truncate ${
                  selectedCategoryId === category.id
                    ? "text-orange-600"
                    : "text-gray-700"
                }`}
              >
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="px-4 pb-6">
        {/* Título da categoria */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 text-left">
            {selectedCategoryName}
          </h3>
        </div>

        {/* Grid de produtos */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Informações do produto (lado esquerdo) */}
              <div className="flex-1 mr-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-green-600">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
              </div>

              {/* Imagem do produto (lado direito) */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há produtos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
