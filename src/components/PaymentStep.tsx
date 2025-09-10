"use client";

import { useState } from "react";
import {
  Smartphone,
  Banknote,
  CreditCard as CreditCardIcon,
  DollarSign,
  QrCode,
} from "lucide-react";

interface PaymentInfo {
  method: "pix" | "cash" | "card";
  needsChange?: boolean;
  changeFor?: number;
}

interface PaymentStepProps {
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  deliveryType: "delivery" | "pickup" | "dine-in";
}

export default function PaymentStep({
  paymentInfo,
  setPaymentInfo,
  deliveryType,
}: PaymentStepProps) {
  const [changeAmount, setChangeAmount] = useState("");

  const paymentMethods = [
    {
      id: "pix" as const,
      icon: QrCode,
      title: "PIX",
      description: "Pagamento instantâneo via QR Code",
      available: true,
      badge: "Recomendado",
    },
    {
      id: "cash" as const,
      icon: Banknote,
      title: "Dinheiro",
      description:
        deliveryType === "delivery"
          ? "Pagamento na entrega"
          : deliveryType === "pickup"
          ? "Pagamento na retirada"
          : "Pagamento no local",
      available: deliveryType !== "dine-in", // Não disponível para consumo no local
    },
    {
      id: "card" as const,
      icon: CreditCardIcon,
      title: "Cartão",
      description:
        deliveryType === "delivery"
          ? "Cartão na maquininha do estabelecimento (na entrega)"
          : deliveryType === "pickup"
          ? "Cartão na maquininha do estabelecimento (na retirada)"
          : "Cartão na maquininha do estabelecimento",
      available: true, // Disponível para todas as opções
    },
  ];

  const handlePaymentMethodChange = (method: "pix" | "cash" | "card") => {
    setPaymentInfo({
      method,
      needsChange: method === "cash" ? false : undefined,
      changeFor: undefined,
    });
    setChangeAmount("");
  };

  const handleNeedsChangeToggle = (needsChange: boolean) => {
    setPaymentInfo({
      ...paymentInfo,
      needsChange,
      changeFor: needsChange ? undefined : undefined,
    });
    if (!needsChange) {
      setChangeAmount("");
    }
  };

  const handleChangeAmountChange = (value: string) => {
    // Remove caracteres não numéricos exceto vírgula e ponto
    const numbers = value.replace(/[^\d.,]/g, "");
    setChangeAmount(numbers);

    // Converte para número
    const numericValue = parseFloat(numbers.replace(",", "."));
    if (!isNaN(numericValue)) {
      setPaymentInfo({
        ...paymentInfo,
        changeFor: numericValue,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Forma de Pagamento
        </h2>
        <p className="text-gray-600">Escolha como você gostaria de pagar</p>
      </div>

      {/* Métodos de pagamento */}
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          if (!method.available) return null;

          const Icon = method.icon;
          const isSelected = paymentInfo.method === method.id;

          return (
            <button
              key={method.id}
              onClick={() => handlePaymentMethodChange(method.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">
                      {method.title}
                    </h3>
                    {method.badge && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Opções para pagamento em dinheiro */}
      {paymentInfo.method === "cash" && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-gray-800">Opções de Troco</h3>

          <div className="space-y-3">
            <button
              onClick={() => handleNeedsChangeToggle(false)}
              className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                paymentInfo.needsChange === false
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    paymentInfo.needsChange === false
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <DollarSign size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Não preciso de troco
                  </h4>
                  <p className="text-sm text-gray-600">
                    Pagamento com valor exato
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleNeedsChangeToggle(true)}
              className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                paymentInfo.needsChange === true
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    paymentInfo.needsChange === true
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Banknote size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Preciso de troco
                  </h4>
                  <p className="text-sm text-gray-600">
                    Informe o valor para o troco
                  </p>
                </div>
              </div>
            </button>
          </div>

          {paymentInfo.needsChange === true && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Troco para quanto?
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input
                  type="text"
                  value={changeAmount}
                  onChange={(e) => handleChangeAmountChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="0,00"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Informações do PIX */}
      {paymentInfo.method === "pix" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <QrCode size={20} className="text-blue-600" />
            <h3 className="font-semibold text-blue-800">PIX</h3>
          </div>
          <p className="text-sm text-blue-700">
            Após confirmar o pedido, você receberá um QR Code para efetuar o
            pagamento instantaneamente.
          </p>
        </div>
      )}

      {/* Informações do cartão */}
      {paymentInfo.method === "card" && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CreditCardIcon size={20} className="text-purple-600" />
            <h3 className="font-semibold text-purple-800">
              Cartão de Débito ou Crédito
            </h3>
          </div>
          <p className="text-sm text-purple-700">
            {deliveryType === "delivery"
              ? "O pagamento será processado na maquininha do estabelecimento no momento da entrega. Tenha seu cartão em mãos quando o entregador chegar."
              : deliveryType === "pickup"
              ? "O pagamento será processado na maquininha do estabelecimento no momento da retirada do pedido."
              : "O pagamento será processado na maquininha do estabelecimento quando você for pagar a conta."}
          </p>
          <div className="mt-3 p-3 bg-white rounded-md border border-purple-200">
            <p className="text-xs text-purple-800 font-medium">
              ⚠️ Importante: Aceitos cartões de débito e crédito das principais
              bandeiras
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
