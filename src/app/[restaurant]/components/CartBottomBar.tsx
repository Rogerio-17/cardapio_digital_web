"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartBottomBar() {
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeItem } =
    useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  if (getTotalItems() === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  return (
    <>
      {/* Overlay quando expandido */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Barra do carrinho */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Lista expandida de itens */}
        {isExpanded && (
          <div className="bg-white border-t border-purple-200 max-h-80 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4">
                Seu Pedido ({getTotalItems()}{" "}
                {getTotalItems() === 1 ? "item" : "itens"})
              </h3>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.price)} cada
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>

                      <span className="w-8 text-center font-medium text-gray-800">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors ml-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="text-right min-w-0">
                      <p className="font-bold text-gray-800">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Barra principal do carrinho */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Botão para expandir/recolher */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-3 flex-1"
            >
              <div className="bg-white/20 rounded-full p-2">
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>

              <div className="text-left">
                <p className="font-medium">
                  {getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"}{" "}
                  no carrinho
                </p>
                <p className="text-sm text-purple-200">
                  Toque para ver detalhes
                </p>
              </div>
            </button>

            {/* Total e botão finalizar */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-purple-200">Total</p>
                <p className="text-xl font-bold">
                  {formatPrice(getTotalPrice())}
                </p>
              </div>

              <button className="bg-white text-purple-700 font-bold py-3 px-6 rounded-2xl hover:bg-purple-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Espaçamento para não sobrepor conteúdo */}
      <div className="h-20" />
    </>
  );
}
