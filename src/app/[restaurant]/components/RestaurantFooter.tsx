"use client";

import Image from "next/image";
import { Restaurant } from "../types";

interface RestaurantFooterProps {
  restaurant: Restaurant;
  restaurantSlug: string;
}

export default function RestaurantFooter({
  restaurant,
  restaurantSlug,
}: RestaurantFooterProps) {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 text-white py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 rounded-full border-3 border-purple-300/70 overflow-hidden shadow-xl bg-white/10 backdrop-blur-sm">
                <Image
                  src={restaurant.logo}
                  alt={`Logo do ${restaurant.name}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {restaurant.name}
              </h3>
            </div>
            <p className="text-purple-100 mb-4 leading-relaxed text-lg font-medium">
              {restaurant.description}
            </p>
            <p className="text-purple-300 text-sm font-medium">
              Restaurante: {restaurantSlug}
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Informações de Contato
            </h4>
            <div className="space-y-4 text-purple-100">
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-2xl">📞</span>
                <span className="font-medium">{restaurant.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-2xl">✉️</span>
                <span className="font-medium">{restaurant.contact.email}</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-2xl">📍</span>
                <span className="font-medium">
                  {restaurant.contact.address}
                </span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-2xl">🕐</span>
                <span className="font-medium">
                  Seg-Sex: {restaurant.hours.weekdays} | Sáb-Dom:{" "}
                  {restaurant.hours.weekend}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700/50 pt-8 mt-12 text-center">
          <p className="text-purple-200 font-medium text-lg">
            &copy; 2025 {restaurant.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
