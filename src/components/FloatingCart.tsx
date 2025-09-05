"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

export default function FloatingCart() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    items,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeItem,
    isOpen,
    setIsOpen,
  } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Verificar se deve mostrar o carrinho baseado na URL atual
  useEffect(() => {
    // Ocultar carrinho em:
    // - Tela inicial (apenas "/")
    // - Páginas de checkout ("/[restaurant]/checkout")
    // - Página de pedido confirmado ("/pedido-confirmado")
    const hideOnRoutes = ["/", "/checkout", "/pedido-confirmado"];

    const isCheckoutPage = pathname.includes("/checkout");
    const isHomePage = pathname === "/";
    const isConfirmationPage = pathname.includes("/pedido-confirmado");

    setShouldShow(!isCheckoutPage && !isHomePage && !isConfirmationPage);
  }, [pathname]);

  const handleFinalizarPedido = () => {
    // Obter o pathname atual para extrair o nome do restaurante
    const pathname = window.location.pathname;
    const restaurantMatch = pathname.match(/^\/([^\/]+)/);
    const restaurantName = restaurantMatch ? restaurantMatch[1] : "";

    // Construir a URL do checkout mantendo os parâmetros da URL atual
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams.toString();
    const checkoutUrl = `/${restaurantName}/checkout${
      searchParams ? `?${searchParams}` : ""
    }`;

    router.push(checkoutUrl);
  };

  // Não mostrar o carrinho se estiver em páginas específicas ou se estiver vazio
  if (totalItems === 0 || !shouldShow) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Carrinho expandido */}
      {isExpanded && (
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-hidden">
          {/* Header do carrinho expandido */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Seu carrinho ({totalItems} {totalItems === 1 ? "item" : "itens"})
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Lista de itens */}
          <div className="overflow-y-auto max-h-96 p-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                >
                  {/* Imagem do produto */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Informações do produto */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm truncate">
                      {item.name}
                    </h4>

                    {/* Adicionais */}
                    {item.additionals.length > 0 && (
                      <p className="text-xs text-gray-600 truncate">
                        + {item.additionals.map((add) => add.name).join(", ")}
                      </p>
                    )}

                    {/* Observações */}
                    {item.notes && (
                      <p className="text-xs text-gray-500 truncate">
                        Obs: {item.notes}
                      </p>
                    )}

                    <p className="text-sm font-semibold text-green-600">
                      R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                    </p>
                  </div>

                  {/* Controles de quantidade */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={12} className="text-gray-600" />
                    </button>
                    <span className="font-medium text-sm w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={12} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Botão remover */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    <X size={12} className="text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer com total e botão de finalizar */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">
                Total:
              </span>
              <span className="text-xl font-bold text-green-600">
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <button
              onClick={handleFinalizarPedido}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}

      {/* Carrinho minimizado */}
      {!isExpanded && (
        <div
          className="bg-orange-500 mx-4 mb-4 rounded-2xl shadow-lg cursor-pointer hover:bg-orange-600 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ShoppingCart size={24} className="text-white" />
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems > 99 ? "99+" : totalItems}
                  </div>
                )}
              </div>
              <div>
                <p className="text-white font-semibold">
                  {totalItems} {totalItems === 1 ? "item" : "itens"}
                </p>
                <p className="text-orange-100 text-sm">
                  Toque para ver detalhes
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-white font-bold text-lg">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <ChevronUp size={20} className="text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
