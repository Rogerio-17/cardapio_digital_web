import Image from "next/image";

interface RestaurantInfoProps {
  profileImage: string;
  restaurantName: string;
}

export default function RestaurantInfo({
  profileImage,
  restaurantName,
}: RestaurantInfoProps) {
  return (
    <div className="bg-white px-4 py-4 rounded-t-2xl -mt-4 relative z-10">
      {/* Imagem de perfil centralizada */}
      <div className="flex flex-col items-center mt-[-60px]">
        <div className="relative w-24 h-24 mb-2">
          <Image
            src={profileImage}
            alt={`Logo do ${restaurantName}`}
            fill
            className="object-cover rounded-full border-4 border-white shadow-2xl"
          />
        </div>

        {/* Nome do restaurante */}
        <h1 className="text-gray-800 text-xl font-bold text-center mb-6">
          {restaurantName}
        </h1>
      </div>
    </div>
  );
}
