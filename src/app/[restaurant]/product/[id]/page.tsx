"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductDetailPageProps {
  params: {
    restaurant: string;
    id: string;
  };
}

interface Additional {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  additionals?: Additional[];
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditionals, setSelectedAdditionals] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  // Dados exemplo - posteriormente serão carregados dinamicamente
  const product: Product = {
    id: params.id,
    name: "Pizza Margherita",
    description:
      "Deliciosa pizza margherita com molho de tomate artesanal, mussarela de primeira qualidade, manjericão fresco colhido na hora e azeite extra virgem. Uma combinação clássica italiana que conquistou o mundo todo.",
    price: 32.9,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
    categoryId: "1",
    additionals: [
      {
        id: "1",
        name: "Calabresa",
        price: 3.0,
        description: "Calabresa fatiada",
      },
      {
        id: "2",
        name: "Bacon",
        price: 4.0,
        description: "Bacon crocante",
      },
      {
        id: "3",
        name: "Queijo extra",
        price: 5.0,
        description: "Porção extra de mussarela",
      },
      {
        id: "4",
        name: "Azeitona",
        price: 2.0,
        description: "Azeitona preta fatiada",
      },
      {
        id: "5",
        name: "Champignon",
        price: 3.5,
        description: "Cogumelos frescos",
      },
    ],
  };

  // Produtos relacionados exemplo
  const relatedProducts = [
    {
      id: "2",
      name: "Pizza Calabresa",
      description: "Molho de tomate, mussarela, calabresa fatiada e cebola",
      price: 35.9,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop",
    },
    {
      id: "3",
      name: "Pizza Quatro Queijos",
      description:
        "Molho de tomate, mussarela, provolone, parmesão e gorgonzola",
      price: 39.9,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop",
    },
    {
      id: "8",
      name: "Spaghetti Carbonara",
      description: "Massa com molho cremoso, bacon, ovo e parmesão",
      price: 28.9,
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&h=200&fit=crop",
    },
  ];

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const toggleAdditional = (additionalId: string) => {
    setSelectedAdditionals((prev) =>
      prev.includes(additionalId)
        ? prev.filter((id) => id !== additionalId)
        : [...prev, additionalId]
    );
  };

  const calculateTotalPrice = () => {
    const additionalsPrice = selectedAdditionals.reduce((total, id) => {
      const additional = product.additionals?.find((add) => add.id === id);
      return total + (additional ? additional.price : 0);
    }, 0);

    return (product.price + additionalsPrice) * quantity;
  };

  const handleAddToCart = () => {
    // Aqui você implementaria a lógica para adicionar ao carrinho
    console.log("Produto adicionado ao carrinho:", {
      product,
      quantity,
      selectedAdditionals,
      notes,
      totalPrice: calculateTotalPrice(),
    });

    // Mostrar feedback visual ou redirecionar
    alert("Produto adicionado ao carrinho!");
  };

  const handleProductClick = (productId: string) => {
    router.push(`/${params.restaurant}/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center mr-10">
            Detalhes do Produto
          </h1>
        </div>
      </div>

      {/* Imagem do produto */}
      <div className="relative h-64 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Conteúdo principal */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 p-6">
        {/* Nome e descrição */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <p className="text-2xl font-bold text-green-600 mt-3">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
        </div>

        {/* Adicionais */}
        {product.additionals && product.additionals.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Adicionais
            </h3>
            <div className="space-y-3">
              {product.additionals.map((additional) => (
                <div
                  key={additional.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">
                        {additional.name}
                      </span>
                      <span className="text-green-600 font-semibold">
                        + R$ {additional.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    {additional.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {additional.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleAdditional(additional.id)}
                    className={`ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedAdditionals.includes(additional.id)
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300 hover:border-orange-500"
                    }`}
                  >
                    {selectedAdditionals.includes(additional.id) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Observações */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Observações
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Alguma observação especial para o pedido..."
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Quantidade e preço */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-800">Quantidade:</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="font-semibold text-lg w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-xl font-bold text-green-600">
              R$ {calculateTotalPrice().toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>

        {/* Botão adicionar ao carrinho */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Adicionar ao carrinho</span>
        </button>
      </div>

      {/* Produtos relacionados */}
      <div className="bg-white mt-4 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Produtos relacionados
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-gray-50 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProductClick(relatedProduct.id)}
            >
              <div className="flex-1 mr-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {relatedProduct.name}
                </h4>
                <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                  {relatedProduct.description}
                </p>
                <p className="text-lg font-bold text-green-600">
                  R$ {relatedProduct.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Espaçamento inferior */}
      <div className="h-8" />
    </div>
  );
}
