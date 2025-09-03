"use client";

import Image from "next/image";
import { Restaurant } from "../types";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  return (
    <header className="relative py-8 md:h-96">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src={restaurant.banner}
          alt={`Banner do ${restaurant.name}`}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient roxo mais intenso */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/70 to-indigo-900/60" />
      </div>

      {/* Conteúdo do header */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Imagem redonda do restaurante com borda mais visível */}
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white/90 shadow-2xl overflow-hidden mb-6 bg-white/10 backdrop-blur-sm">
          <Image
            src={restaurant.logo}
            alt={`Logo do ${restaurant.name}`}
            width={144}
            height={144}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nome e descrição com melhor contraste */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {restaurant.name}
        </h1>
        <p className="text-lg md:text-xl text-purple-50 max-w-2xl leading-relaxed font-medium drop-shadow-md">
          {restaurant.description}
        </p>

        {/* Informações rápidas com melhor contraste */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white">
          <span className="bg-white/25 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full font-medium shadow-lg">
            📞 {restaurant.contact.phone}
          </span>
          <span className="bg-white/25 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full font-medium shadow-lg">
            🕐 {restaurant.hours.weekdays}
          </span>
        </div>
      </div>
    </header>
  );
}
