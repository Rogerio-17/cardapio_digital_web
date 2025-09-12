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
