"use client";

import { Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

interface QuickAddButtonProps {
  product: Product;
  className?: string;
}

export default function QuickAddButton({
  product,
  className = "",
}: QuickAddButtonProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique abra a página de detalhes

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      additionals: [],
      totalPrice: product.price,
    });
  };

  return (
    <button
      onClick={handleQuickAdd}
      className={`bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition-colors shadow-md hover:shadow-lg ${className}`}
      title="Adicionar ao carrinho"
    >
      <Plus size={16} />
    </button>
  );
}
