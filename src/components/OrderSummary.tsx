"use client";

import {
  User,
  Phone,
  Clock,
  Edit,
  Car,
  Store,
  Home,
  QrCode,
  Banknote,
  CreditCard as CreditCardIcon,
} from "lucide-react";
import Image from "next/image";

interface Additional {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  additionals: Additional[];
  notes?: string;
  totalPrice: number;
}

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
  state: string;
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

interface OrderSummaryProps {
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  items: CartItem[];
  totalPrice: number;
  estimatedTime: number;
  onEditCustomerInfo: () => void;
  onEditDeliveryInfo: () => void;
  onEditPaymentInfo: () => void;
}

export default function OrderSummary({
  customerInfo,
  deliveryInfo,
  paymentInfo,
  items,
  totalPrice,
  estimatedTime,
  onEditCustomerInfo,
  onEditDeliveryInfo,
  onEditPaymentInfo,
}: OrderSummaryProps) {
  const getDeliveryTypeInfo = () => {
    switch (deliveryInfo.type) {
      case "delivery":
        return {
          icon: Car,
          title: "Entrega",
          description: deliveryInfo.address
            ? `${deliveryInfo.address.street}, ${deliveryInfo.address.number}${
                deliveryInfo.address.complement
                  ? `, ${deliveryInfo.address.complement}`
                  : ""
              }`
            : "Endereço não informado",
          subtitle: deliveryInfo.address
            ? `${deliveryInfo.address.neighborhood}, ${deliveryInfo.address.city}/${deliveryInfo.address.state}`
            : "",
        };
      case "pickup":
        return {
          icon: Store,
          title: "Retirar no Local",
          description: "Buscar o pedido no restaurante",
          subtitle: "",
        };
      case "dine-in":
        return {
          icon: Home,
          title: "Consumir no Local",
          description: deliveryInfo.tableNumber
            ? `Mesa ${deliveryInfo.tableNumber}`
            : "Comer no restaurante",
          subtitle: "",
        };
      default:
        return {
          icon: Store,
          title: "Não definido",
          description: "",
          subtitle: "",
        };
    }
  };

  const getPaymentInfo = () => {
    switch (paymentInfo.method) {
      case "pix":
        return {
          icon: QrCode,
          title: "PIX",
          description: "Pagamento via QR Code",
        };
      case "cash":
        return {
          icon: Banknote,
          title: "Dinheiro",
          description:
            paymentInfo.needsChange === false
              ? "Valor exato"
              : paymentInfo.changeFor
              ? `Troco para R$ ${paymentInfo.changeFor
                  .toFixed(2)
                  .replace(".", ",")}`
              : "Precisa de troco",
        };
      case "card":
        return {
          icon: CreditCardIcon,
          title: "Cartão",
          description: "Débito ou crédito",
        };
      default:
        return {
          icon: CreditCardIcon,
          title: "Não definido",
          description: "",
        };
    }
  };

  const deliveryTypeInfo = getDeliveryTypeInfo();
  const paymentInfoDetails = getPaymentInfo();
  const DeliveryIcon = deliveryTypeInfo.icon;
  const PaymentIcon = paymentInfoDetails.icon;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Resumo do Pedido
        </h2>
        <p className="text-gray-600">
          Confirme as informações antes de finalizar
        </p>
      </div>

      {/* Tempo estimado */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Clock size={20} className="text-orange-600" />
          <h3 className="font-semibold text-orange-800">Tempo Estimado</h3>
        </div>
        <p className="text-2xl font-bold text-orange-800">
          {estimatedTime} min
        </p>
        <p className="text-sm text-orange-600">
          {deliveryInfo.type === "delivery"
            ? "Para entrega"
            : deliveryInfo.type === "pickup"
            ? "Para retirada"
            : "Para preparo"}
        </p>
      </div>

      {/* Informações do cliente */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <User size={20} className="text-gray-600" />
            <h3 className="font-semibold text-gray-800">Dados do Cliente</h3>
          </div>
          <button
            onClick={onEditCustomerInfo}
            className="text-orange-500 hover:text-orange-600 p-1"
          >
            <Edit size={16} />
          </button>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-gray-800">{customerInfo.name}</p>
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone size={16} />
            <span>{customerInfo.phone}</span>
          </div>
        </div>
      </div>

      {/* Informações de entrega */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <DeliveryIcon size={20} className="text-gray-600" />
            <h3 className="font-semibold text-gray-800">Entrega</h3>
          </div>
          <button
            onClick={onEditDeliveryInfo}
            className="text-orange-500 hover:text-orange-600 p-1"
          >
            <Edit size={16} />
          </button>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-gray-800">{deliveryTypeInfo.title}</p>
          <p className="text-gray-600">{deliveryTypeInfo.description}</p>
          {deliveryTypeInfo.subtitle && (
            <p className="text-sm text-gray-500">{deliveryTypeInfo.subtitle}</p>
          )}
        </div>
      </div>

      {/* Informações de pagamento */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <PaymentIcon size={20} className="text-gray-600" />
            <h3 className="font-semibold text-gray-800">Pagamento</h3>
          </div>
          <button
            onClick={onEditPaymentInfo}
            className="text-orange-500 hover:text-orange-600 p-1"
          >
            <Edit size={16} />
          </button>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-gray-800">
            {paymentInfoDetails.title}
          </p>
          <p className="text-gray-600">{paymentInfoDetails.description}</p>
        </div>
      </div>

      {/* Itens do pedido */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <span>Itens do Pedido</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {items.length} {items.length === 1 ? "item" : "itens"}
          </span>
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 text-sm">
                  {item.name}
                </h4>
                {item.additionals.length > 0 && (
                  <p className="text-xs text-gray-600">
                    + {item.additionals.map((add) => add.name).join(", ")}
                  </p>
                )}
                {item.notes && (
                  <p className="text-xs text-gray-500">Obs: {item.notes}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">
                  {item.quantity}x
                </p>
                <p className="text-sm font-semibold text-green-600">
                  R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-green-800">
            Total do Pedido
          </h3>
          <p className="text-2xl font-bold text-green-600">
            R$ {totalPrice.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>
    </div>
  );
}
