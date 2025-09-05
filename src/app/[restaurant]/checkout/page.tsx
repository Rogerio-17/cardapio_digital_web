"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  CreditCard,
  Phone,
  User,
  Home,
  Car,
  Store,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CheckoutSteps from "@/components/CheckoutSteps";
import CustomerInfoStep from "@/components/CustomerInfoStep";
import DeliveryTypeStep from "@/components/DeliveryTypeStep";
import PaymentStep from "@/components/PaymentStep";
import OrderSummary from "@/components/OrderSummary";

interface CustomerInfo {
  name: string;
  phone: string;
}

interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

interface DeliveryInfo {
  type: "delivery" | "pickup" | "dine-in";
  address?: Address;
  tableNumber?: string;
}

interface PaymentInfo {
  method: "pix" | "cash" | "card";
  needsChange?: boolean;
  changeFor?: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
  });
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    type: "pickup",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "pix",
  });
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [tableNumber, setTableNumber] = useState<string | null>(null);

  // Verificar se há número de mesa na URL (QR Code)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const table = urlParams.get("mesa");
    if (table) {
      setTableNumber(table);
      setDeliveryInfo({ type: "dine-in", tableNumber: table });
    }
  }, []);

  // Verificar se o carrinho está vazio e redirecionar
  useEffect(() => {
    if (items.length === 0) {
      router.back();
    }
  }, [items, router]);

  const totalPrice = getTotalPrice();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishOrder = () => {
    // Aqui você implementaria a lógica para enviar o pedido
    console.log("Pedido finalizado:", {
      customerInfo,
      deliveryInfo,
      paymentInfo,
      items,
      totalPrice,
      estimatedTime,
    });

    // Limpar carrinho
    clearCart();

    // Redirecionar para página de confirmação
    router.push("/pedido-confirmado");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return customerInfo.name.trim() && customerInfo.phone.trim();
      case 2:
        if (deliveryInfo.type === "delivery") {
          return (
            deliveryInfo.address &&
            deliveryInfo.address.street &&
            deliveryInfo.address.number
          );
        }
        return true;
      case 3:
        return paymentInfo.method;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              Finalizar Pedido
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Steps Indicator */}
        <CheckoutSteps currentStep={currentStep} />

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {currentStep === 1 && (
            <CustomerInfoStep
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          )}

          {currentStep === 2 && (
            <DeliveryTypeStep
              deliveryInfo={deliveryInfo}
              setDeliveryInfo={setDeliveryInfo}
              tableNumber={tableNumber}
              setEstimatedTime={setEstimatedTime}
            />
          )}

          {currentStep === 3 && (
            <PaymentStep
              paymentInfo={paymentInfo}
              setPaymentInfo={setPaymentInfo}
              deliveryType={deliveryInfo.type}
            />
          )}

          {currentStep === 4 && (
            <OrderSummary
              customerInfo={customerInfo}
              deliveryInfo={deliveryInfo}
              paymentInfo={paymentInfo}
              items={items}
              totalPrice={totalPrice}
              estimatedTime={estimatedTime}
              onEditCustomerInfo={() => setCurrentStep(1)}
              onEditDeliveryInfo={() => setCurrentStep(2)}
              onEditPaymentInfo={() => setCurrentStep(3)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-3">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ChevronLeft size={20} />
              <span>Voltar</span>
            </button>
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                canProceed()
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>Continuar</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleFinishOrder}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Confirmar Pedido
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
