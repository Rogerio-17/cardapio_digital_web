export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

export interface Contact {
  phone: string;
  email: string;
  address: string;
}

export interface Hours {
  weekdays: string;
  weekend: string;
}

export interface Restaurant {
  name: string;
  description: string;
  banner: string;
  logo: string;
  contact: Contact;
  hours: Hours;
  featuredProducts: Product[];
  categories: Category[];
}
