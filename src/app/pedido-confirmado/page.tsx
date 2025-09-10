"use client";

import { useRouter } from "next/navigation";
import { CheckCircle, Clock, MenuSquare } from "lucide-react";

export default function OrderConfirmedPage() {
  const router = useRouter();
  const restaurantSlug = "test";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          {/* Ícone de sucesso */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={48} className="text-green-500" />
          </div>

          {/* Título */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-gray-600">
              Seu pedido foi recebido com sucesso e já está sendo preparado.
            </p>
          </div>

          {/* Número do pedido */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800 mb-1">Número do Pedido</p>
            <p className="text-2xl font-bold text-orange-600">
              #
              {Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}
            </p>
          </div>

          {/* Tempo estimado */}
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Clock size={20} />
            <span>Tempo estimado: 30-45 minutos</span>
          </div>

          {/* Instruções */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-800 mb-2">
              O que acontece agora?
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Seu pedido está sendo preparado</li>
              <li>• Você receberá atualizações por WhatsApp</li>
              <li>• Em caso de dúvidas, entre em contato conosco</li>
            </ul>
          </div>

          {/* Botão */}
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/${restaurantSlug}`)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {/* Ícone de cardápio do lucide-react */}
              <MenuSquare size={20} />
              <span>Voltar ao cardápio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
