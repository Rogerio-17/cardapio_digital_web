"use client";

import { useState, useMemo } from "react";
import { Order, OrderStatus, DeliveryType } from "@/types/restaurant";
import OrderCard from "./OrderCard";
import {
  Search,
  Filter,
  RefreshCw,
  Calendar,
  ShoppingBag,
  Clock,
  Package,
  DollarSign,
} from "lucide-react";

interface OrdersListProps {
  orders: Order[];
}

const statusOptions = [
  { value: "", label: "Todos os status" },
  { value: OrderStatus.RECEIVED, label: "Recebido" },
  { value: OrderStatus.CONFIRMED, label: "Confirmado" },
  { value: OrderStatus.PREPARING, label: "Preparando" },
  { value: OrderStatus.READY, label: "Pronto" },
  { value: OrderStatus.OUT_FOR_DELIVERY, label: "Saiu para entrega" },
  { value: OrderStatus.DELIVERED, label: "Entregue" },
  { value: OrderStatus.CANCELLED, label: "Cancelado" },
];

const deliveryTypeOptions = [
  { value: "", label: "Todos os tipos" },
  { value: DeliveryType.DELIVERY, label: "Entrega" },
  { value: DeliveryType.PICKUP, label: "Retirada" },
];

const timeFilterOptions = [
  { value: "", label: "Todos os períodos" },
  { value: "today", label: "Hoje" },
  { value: "yesterday", label: "Ontem" },
  { value: "week", label: "Última semana" },
  { value: "month", label: "Último mês" },
];

export default function OrdersList({ orders }: OrdersListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "value">("newest");

  // Função para filtrar por período de tempo
  const filterByTime = (order: Order, filter: string) => {
    if (!filter) return true;

    const now = new Date();
    const orderDate = order.createdAt;

    switch (filter) {
      case "today":
        return orderDate.toDateString() === now.toDateString();
      case "yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        return orderDate.toDateString() === yesterday.toDateString();
      case "week":
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return orderDate >= weekAgo;
      case "month":
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return orderDate >= monthAgo;
      default:
        return true;
    }
  };

  // Filtrar e ordenar pedidos
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      // Filtro de busca (nome do cliente, número do pedido, telefone)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.orderNumber.toString().includes(searchLower) ||
        order.customer.phone.includes(searchTerm);

      // Filtro de status
      const matchesStatus = !statusFilter || order.status === statusFilter;

      // Filtro de tipo de entrega
      const matchesDeliveryType =
        !deliveryTypeFilter || order.deliveryType === deliveryTypeFilter;

      // Filtro de tempo
      const matchesTime = filterByTime(order, timeFilter);

      return (
        matchesSearch && matchesStatus && matchesDeliveryType && matchesTime
      );
    });

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime();
        case "value":
          return b.total - a.total;
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    orders,
    searchTerm,
    statusFilter,
    deliveryTypeFilter,
    timeFilter,
    sortBy,
  ]);

  // Função para atualizar status do pedido
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // Aqui você implementaria a lógica para atualizar o status no backend
    console.log(`Updating order ${orderId} to status ${newStatus}`);

    // Por enquanto, apenas mostra um alerta
    alert(
      `Pedido #${
        orders.find((o) => o.id === orderId)?.orderNumber
      } atualizado para: ${
        statusOptions.find((s) => s.value === newStatus)?.label
      }`
    );
  };

  // Estatísticas rápidas
  const stats = useMemo(() => {
    return {
      total: filteredAndSortedOrders.length,
      pending: filteredAndSortedOrders.filter((o) =>
        [
          OrderStatus.RECEIVED,
          OrderStatus.CONFIRMED,
          OrderStatus.PREPARING,
        ].includes(o.status)
      ).length,
      ready: filteredAndSortedOrders.filter(
        (o) => o.status === OrderStatus.READY
      ).length,
      totalValue: filteredAndSortedOrders.reduce(
        (sum, order) => sum + order.total,
        0
      ),
    };
  }, [filteredAndSortedOrders]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between sm:items-center">
            <div className="flex-1 min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {stats.total}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                Total de Pedidos
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full ml-2 flex-shrink-0">
              <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between sm:items-center">
            <div className="flex-1 min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-orange-600 truncate">
                {stats.pending}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Pendentes</div>
            </div>
            <div className="p-2 sm:p-3 bg-orange-100 rounded-full ml-2 flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between sm:items-center">
            <div className="flex-1 min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-purple-600 truncate">
                {stats.ready}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Prontos</div>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 rounded-full ml-2 flex-shrink-0">
              <Package className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between sm:items-center">
            <div className="flex-1 min-w-0">
              <div className="text-lg sm:text-2xl font-bold text-green-600 truncate">
                {formatCurrency(stats.totalValue)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                Valor Total
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-full ml-2 flex-shrink-0">
              <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Busca */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por cliente, telefone ou número..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filtro de Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Tipo de Entrega */}
          <div>
            <select
              value={deliveryTypeFilter}
              onChange={(e) => setDeliveryTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {deliveryTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Período */}
          <div>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {timeFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "oldest" | "value")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
              <option value="value">Maior valor</option>
            </select>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {filteredAndSortedOrders.length} de {orders.length} pedidos
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setDeliveryTypeFilter("");
                setTimeFilter("");
                setSortBy("newest");
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Limpar Filtros
            </button>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {filteredAndSortedOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum pedido encontrado
            </h3>
            <p className="text-gray-500">
              {orders.length === 0
                ? "Ainda não há pedidos para este restaurante."
                : "Tente ajustar os filtros para encontrar os pedidos desejados."}
            </p>
          </div>
        ) : (
          filteredAndSortedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
