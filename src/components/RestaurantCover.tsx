import Image from "next/image";
import { Heart, Search, ArrowLeft } from "lucide-react";

interface RestaurantCoverProps {
  coverImage: string;
}

export default function RestaurantCover({ coverImage }: RestaurantCoverProps) {
  return (
    <div className="relative h-72 w-full overflow-hidden">
      {/* Imagem de capa */}
      <Image
        src={coverImage}
        alt="Capa do restaurante"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Botões de navegação */}
      <div className="absolute top-6 left-4 right-4 flex justify-between items-center z-10">
        <button className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex gap-3">
          <button className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors">
            <Heart className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors">
            <Search className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
