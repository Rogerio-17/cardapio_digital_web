"use client";

import Image from "next/image";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  isFeatured = false,
  className = "",
}: ProductCardProps) {
  const baseClasses =
    "group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-purple-100/50";

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Preço */}
        <div className="absolute top-4 right-4">
          <span
            className={`text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm ${
              isFeatured
                ? "bg-gradient-to-r from-orange-500 to-red-500"
                : "bg-gradient-to-r from-purple-600 to-indigo-600"
            }`}
          >
            {isFeatured ? "🔥 " : ""}R${" "}
            {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        {/* Badge Popular (apenas para featured) */}
        {isFeatured && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              POPULAR
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>

        <button
          className={`w-full text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] ${
            isFeatured
              ? "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600"
              : "bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800"
          }`}
        >
          {isFeatured ? "🔥 Pedir Agora" : "Adicionar ao Pedido"}
        </button>
      </div>
    </div>
  );
}
