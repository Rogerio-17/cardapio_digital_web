import { Restaurant } from "./types";

export const mockRestaurantData: Restaurant = {
  name: "Bistro Gourmet",
  description:
    "Experiência gastronômica única com pratos autorais e ambiente acolhedor",
  banner:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop&crop=center",
  logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop&crop=center",
  contact: {
    phone: "(11) 99999-9999",
    email: "contato@bistrogourmet.com",
    address: "Rua das Flores, 123 - Centro",
  },
  hours: {
    weekdays: "11:00 - 22:00",
    weekend: "11:00 - 23:00",
  },
  featuredProducts: [
    {
      id: 10,
      name: "Hambúrguer Artesanal",
      description:
        "Blend especial 180g, queijo artesanal, bacon e molho da casa",
      price: 38.9,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 11,
      name: "Pizza Margherita Premium",
      description:
        "Massa fermentada, tomate San Marzano, mussarela de búfala e manjericão",
      price: 45.9,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 12,
      name: "Pasta Carbonara Tradicional",
      description:
        "Espaguete al dente com bacon, ovos, queijo pecorino e pimenta preta",
      price: 42.9,
      image:
        "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Salmão Grelhado",
      description: "Filé de salmão com legumes refogados e molho de ervas",
      price: 52.9,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 8,
      name: "Petit Gateau",
      description: "Bolinho de chocolate com sorvete de baunilha",
      price: 18.9,
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&crop=center",
    },
  ],
  categories: [
    {
      id: "entradas",
      name: "Entradas",
      products: [
        {
          id: 1,
          name: "Bruschetta Especial",
          description:
            "Pão artesanal com tomate, manjericão fresco e queijo de cabra",
          price: 24.9,
          image:
            "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop&crop=center",
        },
        {
          id: 2,
          name: "Carpaccio de Salmão",
          description:
            "Fatias finas de salmão com alcaparras e molho de mostarda",
          price: 32.9,
          image:
            "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center",
        },
      ],
    },
    {
      id: "pratos-principais",
      name: "Pratos Principais",
      products: [
        {
          id: 3,
          name: "Risotto de Cogumelos",
          description:
            "Arroz arbóreo com mix de cogumelos selvagens e parmesão",
          price: 45.9,
          image:
            "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop&crop=center",
        },
        {
          id: 4,
          name: "Salmão Grelhado",
          description: "Filé de salmão com legumes refogados e molho de ervas",
          price: 52.9,
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center",
        },
        {
          id: 5,
          name: "Picanha na Brasa",
          description: "Picanha maturada acompanha farofa e vinagrete",
          price: 65.9,
          image:
            "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&crop=center",
        },
      ],
    },
    {
      id: "bebidas",
      name: "Bebidas",
      products: [
        {
          id: 6,
          name: "Vinho Tinto Reserva",
          description: "Cabernet Sauvignon argentino safra 2020",
          price: 89.9,
          image:
            "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&fit=crop&crop=center",
        },
        {
          id: 7,
          name: "Suco Natural",
          description: "Laranja, limão ou acerola - 300ml",
          price: 12.9,
          image:
            "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop&crop=center",
        },
      ],
    },
    {
      id: "sobremesas",
      name: "Sobremesas",
      products: [
        {
          id: 8,
          name: "Petit Gateau",
          description: "Bolinho de chocolate com sorvete de baunilha",
          price: 18.9,
          image:
            "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&crop=center",
        },
        {
          id: 9,
          name: "Cheesecake de Frutas Vermelhas",
          description: "Cremoso cheesecake com calda de frutas vermelhas",
          price: 16.9,
          image:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&crop=center",
        },
      ],
    },
  ],
};
