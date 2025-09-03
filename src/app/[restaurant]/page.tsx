"use client";

import { use } from "react";
import { mockRestaurantData } from "./data";
import RestaurantHeader from "./components/RestaurantHeader";
import FeaturedProducts from "./components/FeaturedProducts";
import CategoryNavigation from "./components/CategoryNavigation";
import CategorySection from "./components/CategorySection";
import RestaurantFooter from "./components/RestaurantFooter";
import CartBottomBar from "./components/CartBottomBar";
import { CartProvider } from "./context/CartContext";

interface RestaurantProps {
  params: Promise<{ restaurant: string }>;
}

export default function Restaurant({ params }: RestaurantProps) {
  const resolvedParams = use(params);
  const restaurantSlug = resolvedParams.restaurant;

  // Em produção, buscar dados do backend baseado no slug
  const restaurant = mockRestaurantData;

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50">
        {/* Header */}
        <RestaurantHeader restaurant={restaurant} />

        {/* Seção dos Pratos Mais Pedidos */}
        <FeaturedProducts products={restaurant.featuredProducts} />

        {/* Navegação de Categorias e Menu */}
        <section className="container mx-auto px-4 py-8">
          <CategoryNavigation categories={restaurant.categories} />

          {/* Seções de Categorias com Scroll Horizontal */}
          <div className="space-y-16">
            {restaurant.categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <RestaurantFooter
          restaurant={restaurant}
          restaurantSlug={restaurantSlug}
        />

        {/* Carrinho fixo na parte inferior */}
        <CartBottomBar />
      </div>
    </CartProvider>
  );
}
