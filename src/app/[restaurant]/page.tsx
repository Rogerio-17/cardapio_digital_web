import RestaurantCover from "@/components/RestaurantCover";
import RestaurantInfo from "@/components/RestaurantInfo";
import CategoriesCarousel from "@/components/CategoriesCarousel";

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

      {/* Carrossel de Categorias */}
      <CategoriesCarousel categories={categories} />

      {/* Conteúdo do cardápio será adicionado aqui */}
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Cardápio</h2>
          <p className="text-gray-600">O cardápio será implementado aqui...</p>
        </div>
      </div>
    </div>
  );
}
