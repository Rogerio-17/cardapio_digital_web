export interface Restaurant {
  id?: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  profileImage: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    complement?: string;
  };
  cuisine: string;
  openingHours: {
    monday?: { open: string; close: string };
    tuesday?: { open: string; close: string };
    wednesday?: { open: string; close: string };
    thursday?: { open: string; close: string };
    friday?: { open: string; close: string };
    saturday?: { open: string; close: string };
    sunday?: { open: string; close: string };
  };
  deliveryFee: number;
  minimumOrder: number;
  estimatedDeliveryTime: {
    min: number;
    max: number;
  };
  paymentMethods: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RestaurantFormData {
  name: string;
  slug: string;
  description: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement: string;
  cuisine: string;
  deliveryFee: string;
  minimumOrder: string;
  estimatedDeliveryTimeMin: string;
  estimatedDeliveryTimeMax: string;
  paymentMethods: string[];
  openingHours: {
    monday: { open: string; close: string; isOpen: boolean };
    tuesday: { open: string; close: string; isOpen: boolean };
    wednesday: { open: string; close: string; isOpen: boolean };
    thursday: { open: string; close: string; isOpen: boolean };
    friday: { open: string; close: string; isOpen: boolean };
    saturday: { open: string; close: string; isOpen: boolean };
    sunday: { open: string; close: string; isOpen: boolean };
  };
}

// Order types
export enum OrderStatus {
  RECEIVED = "RECEIVED", // Pedido recebido
  CONFIRMED = "CONFIRMED", // Confirmado pelo restaurante
  PREPARING = "PREPARING", // Em preparo
  READY = "READY", // Pronto para entrega/retirada
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY", // Saiu para entrega
  DELIVERED = "DELIVERED", // Entregue
  CANCELLED = "CANCELLED", // Cancelado
}

export enum DeliveryType {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}

export enum PaymentMethod {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PIX = "PIX",
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  notes?: string;
  additionals: {
    id: string;
    name: string;
    price: number;
  }[];
  size?: {
    id: string;
    name: string;
    price: number;
  };
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  restaurantId: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  deliveryType: DeliveryType;
  deliveryAddress?: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zipCode: string;
    complement?: string;
  };
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  estimatedDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  deliveredAt?: Date;
}
