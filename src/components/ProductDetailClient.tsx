"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

interface Additional {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface ProductSize {
  id: string;
  name: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  additionals?: Additional[];
  sizes?: ProductSize[];
}

interface ProductDetailClientProps {
  restaurant: string;
  productId: string;
}

export default function ProductDetailClient({
  restaurant,
  productId,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditionals, setSelectedAdditionals] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [notes, setNotes] = useState("");

  // Dados exemplo - posteriormente serão carregados dinamicamente
  const getProductData = (id: string): Product => {
    if (id === "2") {
      return {
        id: productId,
        name: "Coca-Cola 350ml",
        description:
          "Refrigerante Coca-Cola gelado de 350ml. A bebida mais refrescante e saborosa para acompanhar sua refeição.",
        price: 5.50,
        image:
          "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&h=400&fit=crop",
        categoryId: "2",
        // Sem tamanhos e sem adicionais para bebidas
      };
    }
    
    // Pizza padrão (ID 1 ou outros)
    return {
      id: productId,
      name: "Pizza Margherita",
      description:
        "Deliciosa pizza margherita com molho de tomate artesanal, mussarela de primeira qualidade, manjericão fresco colhido na hora e azeite extra virgem. Uma combinação clássica italiana que conquistou o mundo todo.",
      price: 32.9,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
      categoryId: "1",
      sizes: [
        {
          id: "p",
          name: "P",
          price: 24.0,
        },
        {
          id: "m",
          name: "M",
          price: 32.0,
        },
        {
          id: "g",
          name: "G",
          price: 48.0,
        },
      ],
      additionals: [
        {
          id: "1",
          name: "Borda Recheada",
          price: 8.0,
          description: "Borda recheada com catupiry",
        },
        {
          id: "2",
          name: "Extra Queijo",
          price: 5.0,
          description: "Porção extra de mussarela",
        },
        {
          id: "3",
          name: "Manjericão Extra",
          price: 2.0,
          description: "Manjericão fresco adicional",
        },
        {
          id: "4",
          name: "Azeitonas",
          price: 3.0,
          description: "Azeitonas pretas fatiadas",
        },
        {
          id: "5",
          name: "Tomate Seco",
          price: 4.0,
          description: "Tomate seco italiano",
        },
      ],
    };
  };

  const product = getProductData(productId);

  // Definir tamanho padrão quando há tamanhos disponíveis
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0].id);
    }
  }, [product.sizes, selectedSize]);



  const calculateTotalPrice = () => {
    const additionalsPrice = selectedAdditionals.reduce(
      (total, additionalId) => {
        const additional = product.additionals?.find(
          (add) => add.id === additionalId
        );
        return total + (additional?.price || 0);
      },
      0
    );

    const basePrice = selectedSize
      ? product.sizes?.find((size) => size.id === selectedSize)?.price ||
        product.price
      : product.price;

    return (basePrice + additionalsPrice) * quantity;
  };

  const toggleAdditional = (additionalId: string) => {
    setSelectedAdditionals((prev) =>
      prev.includes(additionalId)
        ? prev.filter((id) => id !== additionalId)
        : [...prev, additionalId]
    );
  };

  const handleAddToCart = () => {
    const selectedAdditionalsData =
      product.additionals?.filter((add) =>
        selectedAdditionals.includes(add.id)
      ) || [];

    const selectedSizeData = selectedSize
      ? product.sizes?.find((size) => size.id === selectedSize)
      : undefined;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      additionals: selectedAdditionalsData,
      size: selectedSizeData,
      notes: notes.trim() || undefined,
      totalPrice: calculateTotalPrice(),
    });

    // Mostrar feedback visual
    // Aqui você pode adicionar um toast ou notificação
    console.log("Produto adicionado ao carrinho!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="relative h-64 bg-white">
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>

        {/* Imagem do produto */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Informações básicas */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <p className="text-3xl font-bold text-green-600 mt-4">
            R${" "}
            {(selectedSize
              ? product.sizes?.find((size) => size.id === selectedSize)
                  ?.price || product.price
              : product.price
            )
              .toFixed(2)
              .replace(".", ",")}
          </p>
        </div>

        {/* Tamanhos */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Tamanho
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    selectedSize === size.id
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-300 hover:border-orange-300 text-gray-700"
                  }`}
                >
                  <div className="font-semibold text-lg">{size.name}</div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    R$ {size.price.toFixed(2).replace(".", ",")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Adicionais */}
        {product.additionals && product.additionals.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Adicionais
            </h2>
            <div className="space-y-3">
              {product.additionals.map((additional) => (
                <div
                  key={additional.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {additional.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {additional.description}
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      + R$ {additional.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleAdditional(additional.id)}
                    className={`w-6 h-6 rounded border-2 transition-colors ${
                      selectedAdditionals.includes(additional.id)
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300 hover:border-orange-500"
                    }`}
                  >
                    {selectedAdditionals.includes(additional.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Observações */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Observações
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Alguma observação especial? (opcional)"
            className="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>


      </div>

      {/* Footer fixo - botão de adicionar na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
        <div className="max-w-md mx-auto flex items-center space-x-4">
          {/* Controle de quantidade */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <span className="font-semibold text-lg w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Botão adicionar */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center shadow-md"
          >
            Adicionar • R$ {calculateTotalPrice().toFixed(2).replace(".", ",")}
          </button>
        </div>
      </div>
    </div>
  );
}
