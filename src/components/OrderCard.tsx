"use client";

import {
  Order,
  OrderStatus,
  DeliveryType,
  PaymentMethod,
} from "@/types/restaurant";
import {
  Clock,
  Phone,
  MapPin,
  CreditCard,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Timer,
  User,
} from "lucide-react";

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

const statusConfig = {
  [OrderStatus.RECEIVED]: {
    label: "Recebido",
    color: "bg-blue-100 text-blue-800",
    icon: AlertCircle,
    nextActions: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  },
  [OrderStatus.CONFIRMED]: {
    label: "Confirmado",
    color: "bg-yellow-100 text-yellow-800",
    icon: CheckCircle,
    nextActions: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  },
  [OrderStatus.PREPARING]: {
    label: "Preparando",
    color: "bg-orange-100 text-orange-800",
    icon: Timer,
    nextActions: [OrderStatus.READY],
  },
  [OrderStatus.READY]: {
    label: "Pronto",
    color: "bg-purple-100 text-purple-800",
    icon: Package,
    nextActions: (order: Order) =>
      order.deliveryType === DeliveryType.DELIVERY
        ? [OrderStatus.OUT_FOR_DELIVERY]
        : [OrderStatus.DELIVERED],
  },
  [OrderStatus.OUT_FOR_DELIVERY]: {
    label: "Saiu para entrega",
    color: "bg-indigo-100 text-indigo-800",
    icon: Truck,
    nextActions: [OrderStatus.DELIVERED],
  },
  [OrderStatus.DELIVERED]: {
    label: "Entregue",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
    nextActions: [],
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
    nextActions: [],
  },
};

const paymentMethodLabels = {
  [PaymentMethod.CASH]: "Dinheiro",
  [PaymentMethod.CREDIT_CARD]: "Cartão de Crédito",
  [PaymentMethod.DEBIT_CARD]: "Cartão de Débito",
  [PaymentMethod.PIX]: "PIX",
};

export default function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Agora";
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  const getNextActions = () => {
    const nextActions = config.nextActions;
    if (typeof nextActions === "function") {
      return nextActions(order);
    }
    return nextActions;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Header do pedido */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Pedido #{order.orderNumber}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
              >
                <StatusIcon className="w-3 h-3 mr-1" />
                {config.label}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{getTimeAgo(order.createdAt)}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(order.total)}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do cliente */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Cliente
            </h4>
            <div className="space-y-2 text-sm">
              <div className="font-medium">{order.customer.name}</div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-1" />
                {order.customer.phone}
              </div>
              {order.customer.email && (
                <div className="text-gray-600">{order.customer.email}</div>
              )}
            </div>

            {/* Tipo de entrega */}
            <div className="pt-2">
              <div className="text-sm font-medium text-gray-900">
                {order.deliveryType === DeliveryType.DELIVERY
                  ? "Entrega"
                  : "Retirada"}
              </div>
              {order.deliveryAddress && (
                <div className="mt-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {order.deliveryAddress.street}, {order.deliveryAddress.number}
                  <br />
                  {order.deliveryAddress.neighborhood} -{" "}
                  {order.deliveryAddress.city}
                  {order.deliveryAddress.complement && (
                    <>
                      <br />
                      {order.deliveryAddress.complement}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Método de pagamento */}
            <div className="flex items-center text-sm">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="font-medium">
                {paymentMethodLabels[order.paymentMethod]}
              </span>
            </div>
          </div>

          {/* Itens do pedido */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Itens do Pedido</h4>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {item.quantity}x {item.name}
                    </div>
                    {item.additionals.length > 0 && (
                      <div className="text-xs text-gray-500">
                        + {item.additionals.map((add) => add.name).join(", ")}
                      </div>
                    )}
                    {item.notes && (
                      <div className="text-xs text-gray-500 italic">
                        "{item.notes}"
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.totalPrice)}
                  </div>
                </div>
              ))}
            </div>

            {order.notes && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">
                  Observações:
                </div>
                <div className="text-sm text-yellow-700">{order.notes}</div>
              </div>
            )}
          </div>

          {/* Ações e resumo financeiro */}
          <div className="space-y-4">
            {/* Resumo financeiro */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Taxa de entrega:</span>
                  <span>{formatCurrency(order.deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
                <span>Total:</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>

            {/* Ações */}
            {getNextActions().length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900">Ações:</div>
                {getNextActions().map((status) => (
                  <button
                    key={status}
                    onClick={() => onStatusChange(order.id, status)}
                    className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      status === OrderStatus.CANCELLED
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {statusConfig[status].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
