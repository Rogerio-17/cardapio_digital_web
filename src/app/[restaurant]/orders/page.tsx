import OrdersList from "@/components/OrdersList";
import {
  Order,
  OrderStatus,
  DeliveryType,
  PaymentMethod,
} from "@/types/restaurant";

interface OrdersPageProps {
  params: Promise<{
    restaurant: string;
  }>;
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { restaurant } = await params;

  // Dados exemplo - posteriormente serão carregados dinamicamente via API
  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: 1001,
      restaurantId: restaurant,
      status: OrderStatus.RECEIVED,
      items: [
        {
          id: "1",
          productId: "1",
          name: "Pizza Margherita",
          price: 32.9,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop",
          additionals: [{ id: "1", name: "Borda recheada", price: 5.0 }],
          totalPrice: 75.8,
        },
        {
          id: "2",
          productId: "4",
          name: "Coca-Cola 350ml",
          price: 5.5,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop",
          additionals: [],
          totalPrice: 11.0,
        },
      ],
      customer: {
        name: "João Silva",
        phone: "(11) 99999-9999",
        email: "joao@email.com",
      },
      deliveryType: DeliveryType.DELIVERY,
      deliveryAddress: {
        street: "Rua das Flores",
        number: "123",
        neighborhood: "Centro",
        city: "São Paulo",
        zipCode: "01234-567",
        complement: "Apto 45",
      },
      paymentMethod: PaymentMethod.PIX,
      subtotal: 86.8,
      deliveryFee: 5.0,
      total: 91.8,
      notes: "Entregar no portão azul",
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60 * 1000),
      createdAt: new Date(Date.now() - 10 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: "2",
      orderNumber: 1002,
      restaurantId: restaurant,
      status: OrderStatus.PREPARING,
      items: [
        {
          id: "3",
          productId: "2",
          name: "Pizza Calabresa",
          price: 35.9,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop",
          additionals: [],
          totalPrice: 35.9,
        },
        {
          id: "4",
          productId: "8",
          name: "Spaghetti Carbonara",
          price: 28.9,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&h=200&fit=crop",
          additionals: [],
          totalPrice: 28.9,
        },
      ],
      customer: {
        name: "Maria Santos",
        phone: "(11) 88888-8888",
      },
      deliveryType: DeliveryType.PICKUP,
      paymentMethod: PaymentMethod.CASH,
      subtotal: 64.8,
      deliveryFee: 0,
      total: 64.8,
      estimatedDeliveryTime: new Date(Date.now() + 25 * 60 * 1000),
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 60 * 1000),
      confirmedAt: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
      id: "3",
      orderNumber: 1003,
      restaurantId: restaurant,
      status: OrderStatus.READY,
      items: [
        {
          id: "5",
          productId: "9",
          name: "Salada Caesar",
          price: 22.9,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop",
          additionals: [{ id: "2", name: "Frango grelhado", price: 8.0 }],
          totalPrice: 30.9,
        },
      ],
      customer: {
        name: "Carlos Oliveira",
        phone: "(11) 77777-7777",
      },
      deliveryType: DeliveryType.PICKUP,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      subtotal: 30.9,
      deliveryFee: 0,
      total: 30.9,
      estimatedDeliveryTime: new Date(Date.now() + 5 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 1000),
      confirmedAt: new Date(Date.now() - 25 * 60 * 1000),
    },
    {
      id: "4",
      orderNumber: 1004,
      restaurantId: restaurant,
      status: OrderStatus.OUT_FOR_DELIVERY,
      items: [
        {
          id: "6",
          productId: "3",
          name: "Pizza Quatro Queijos",
          price: 39.9,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop",
          additionals: [],
          totalPrice: 39.9,
        },
        {
          id: "7",
          productId: "6",
          name: "Tiramisù",
          price: 16.9,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop",
          additionals: [],
          totalPrice: 33.8,
        },
      ],
      customer: {
        name: "Ana Paula",
        phone: "(11) 66666-6666",
      },
      deliveryType: DeliveryType.DELIVERY,
      deliveryAddress: {
        street: "Av. Paulista",
        number: "1000",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        zipCode: "01310-100",
      },
      paymentMethod: PaymentMethod.DEBIT_CARD,
      subtotal: 73.7,
      deliveryFee: 8.0,
      total: 81.7,
      estimatedDeliveryTime: new Date(Date.now() + 15 * 60 * 1000),
      createdAt: new Date(Date.now() - 40 * 60 * 1000),
      updatedAt: new Date(Date.now() - 8 * 60 * 1000),
      confirmedAt: new Date(Date.now() - 35 * 60 * 1000),
    },
    {
      id: "5",
      orderNumber: 1005,
      restaurantId: restaurant,
      status: OrderStatus.DELIVERED,
      items: [
        {
          id: "8",
          productId: "7",
          name: "Cannoli Siciliano",
          price: 14.9,
          quantity: 3,
          image:
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop",
          additionals: [],
          totalPrice: 44.7,
        },
      ],
      customer: {
        name: "Roberto Lima",
        phone: "(11) 55555-5555",
      },
      deliveryType: DeliveryType.DELIVERY,
      deliveryAddress: {
        street: "Rua Augusta",
        number: "500",
        neighborhood: "Consolação",
        city: "São Paulo",
        zipCode: "01305-000",
      },
      paymentMethod: PaymentMethod.PIX,
      subtotal: 44.7,
      deliveryFee: 6.0,
      total: 50.7,
      estimatedDeliveryTime: new Date(Date.now() - 15 * 60 * 1000),
      createdAt: new Date(Date.now() - 90 * 60 * 1000),
      updatedAt: new Date(Date.now() - 20 * 60 * 1000),
      confirmedAt: new Date(Date.now() - 85 * 60 * 1000),
      deliveredAt: new Date(Date.now() - 20 * 60 * 1000),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Gerenciar Pedidos
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Acompanhe e gerencie todos os pedidos do seu restaurante
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrdersList orders={mockOrders} />
      </div>
    </div>
  );
}
