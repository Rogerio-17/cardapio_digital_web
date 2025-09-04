import RestaurantCover from "@/components/RestaurantCover";
import RestaurantInfo from "@/components/RestaurantInfo";

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
