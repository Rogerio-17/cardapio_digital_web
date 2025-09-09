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
  const product: Product = {
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

  // Definir tamanho padrão quando há tamanhos disponíveis
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0].id);
    }
  }, [product.sizes, selectedSize]);

  // Produtos relacionados exemplo
  const relatedProducts = [
    {
      id: "2",
      name: "Pizza Calabresa",
      description:
        "Deliciosa pizza com calabresa artesanal, cebola roxa e azeitonas pretas",
      price: 35.9,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop",
      categoryId: "1",
    },
    {
      id: "3",
      name: "Pizza Quatro Queijos",
      description:
        "Combinação perfeita de mussarela, gorgonzola, parmesão e provolone",
      price: 39.9,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop",
      categoryId: "1",
    },
    {
      id: "4",
      name: "Pizza Portuguesa",
      description:
        "Pizza tradicional com presunto, ovos, cebola, azeitonas e ervilha",
      price: 42.9,
      image:
        "https://images.unsplash.com/photo-1555072956-7758afb4d7a6?w=200&h=200&fit=crop",
      categoryId: "1",
    },
  ];

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

  const handleProductClick = (productId: string) => {
    router.push(`/${restaurant}/product/${productId}`);
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
      <div className="px-4 py-6 space-y-6">
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

        {/* Produtos relacionados */}
        <div className="bg-white rounded-lg p-4 mb-16 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Você também pode gostar
          </h2>
          <div className="space-y-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                onClick={() => handleProductClick(relatedProduct.id)}
              >
                {/* Informações do produto (lado esquerdo) */}
                <div className="flex-1 mr-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {relatedProduct.description}
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {relatedProduct.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>

                {/* Lado direito com imagem */}
                <div className="flex items-center">
                  {/* Imagem do produto */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
