import RestaurantCover from "@/components/RestaurantCover";
import RestaurantInfo from "@/components/RestaurantInfo";
import Menu from "@/components/Menu";

interface RestaurantPageProps {
  params: {
    restaurant: string;
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  // Dados exemplo - posteriormente serão carregados dinamicamente
  const restaurantData = {
    name: "Holy Pizza",
    coverImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop", // Pizza background
    profileImage:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop", // Pizza logo circular
  };

  // Categorias exemplo
  const categories = [
    {
      id: "1",
      name: "Pizzas",
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=150&h=150&fit=crop",
    },
    {
      id: "2",
      name: "Bebidas",
      image:
        "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=150&h=150&fit=crop",
    },
    {
      id: "3",
      name: "Sobremesas",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=150&h=150&fit=crop",
    },
    {
      id: "4",
      name: "Massas",
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=150&h=150&fit=crop",
    },
    {
      id: "5",
      name: "Saladas",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&h=150&fit=crop",
    },
    {
      id: "6",
      name: "Lanches",
      image:
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=150&h=150&fit=crop",
    },
    {
      id: "7",
      name: "Entradas",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=150&h=150&fit=crop",
    },
    {
      id: "8",
      name: "Carnes",
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?w=150&h=150&fit=crop",
    },
  ];

  // Produtos exemplo
  const products = [
    // Pizzas
    {
      id: "1",
      name: "Pizza Margherita",
      description:
        "Molho de tomate, mussarela, manjericão fresco e azeite extra virgem",
      price: 32.9,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop",
      categoryId: "1",
    },
    {
      id: "2",
      name: "Pizza Calabresa",
      description: "Molho de tomate, mussarela, calabresa fatiada e cebola",
      price: 35.9,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop",
      categoryId: "1",
    },
    {
      id: "3",
      name: "Pizza Quatro Queijos",
      description:
        "Molho de tomate, mussarela, provolone, parmesão e gorgonzola",
      price: 39.9,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop",
      categoryId: "1",
    },
    // Bebidas
    {
      id: "4",
      name: "Coca-Cola 350ml",
      description: "Refrigerante tradicional gelado",
      price: 5.5,
      image:
        "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop",
      categoryId: "2",
    },
    {
      id: "5",
      name: "Suco de Laranja Natural",
      description: "Suco natural de laranja, sem conservantes",
      price: 8.9,
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop",
      categoryId: "2",
    },
    // Sobremesas
    {
      id: "6",
      name: "Tiramisù",
      description: "Sobremesa italiana com café, mascarpone e cacau",
      price: 16.9,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop",
      categoryId: "3",
    },
    {
      id: "7",
      name: "Cannoli Siciliano",
      description: "Massa crocante recheada com ricota doce e chocolate",
      price: 14.9,
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop",
      categoryId: "3",
    },
    // Massas
    {
      id: "8",
      name: "Spaghetti Carbonara",
      description: "Massa com molho cremoso, bacon, ovo e parmesão",
      price: 28.9,
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&h=200&fit=crop",
      categoryId: "4",
    },
    // Saladas
    {
      id: "9",
      name: "Salada Caesar",
      description: "Alface americana, croutons, parmesão e molho caesar",
      price: 22.9,
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop",
      categoryId: "5",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com capa e informações */}
      <div>
        <RestaurantCover coverImage={restaurantData.coverImage} />

        <RestaurantInfo
          profileImage={restaurantData.profileImage}
          restaurantName={restaurantData.name}
        />
      </div>

      {/* Menu com categorias e produtos */}
      <Menu categories={categories} products={products} />
    </div>
  );
}
