"use client";

import { useState } from "react";
import {
  Car,
  Store,
  Home,
  MapPin,
  Navigation,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

interface DeliveryInfo {
  type: "delivery" | "pickup" | "dine-in";
  address?: Address;
  tableNumber?: string;
}

interface DeliveryTypeStepProps {
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  tableNumber: string | null;
  setEstimatedTime: (time: number) => void;
}

export default function DeliveryTypeStep({
  deliveryInfo,
  setDeliveryInfo,
  tableNumber,
  setEstimatedTime,
}: DeliveryTypeStepProps) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [locationRequested, setLocationRequested] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);

  const deliveryOptions = [
    {
      type: "pickup" as const,
      icon: Store,
      title: "Retirar no Local",
      description: "Buscar o pedido no restaurante",
      time: 15,
      available: true,
    },
    {
      type: "delivery" as const,
      icon: Car,
      title: "Entrega",
      description: "Receber em casa",
      time: 45,
      available: true,
    },
    {
      type: "dine-in" as const,
      icon: Home,
      title: "Consumir no Local",
      description: tableNumber ? `Mesa ${tableNumber}` : "Comer no restaurante",
      time: 20,
      available: true,
      selected: !!tableNumber,
    },
  ];

  const handleDeliveryTypeChange = (
    type: "delivery" | "pickup" | "dine-in"
  ) => {
    const option = deliveryOptions.find((opt) => opt.type === type);
    if (option) {
      setEstimatedTime(option.time);
    }

    if (type === "delivery") {
      setShowAddressForm(true);
      setDeliveryInfo({ type, address: deliveryInfo.address });
    } else if (type === "dine-in") {
      setDeliveryInfo({ type, tableNumber: tableNumber || undefined });
      setShowAddressForm(false);
    } else {
      setDeliveryInfo({ type });
      setShowAddressForm(false);
    }
  };

  const requestLocation = async () => {
    setLocationRequested(true);

    if (!navigator.geolocation) {
      setLocationDenied(true);
      setLocationRequested(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Aqui você pode fazer uma chamada para uma API de geocodificação reversa
          // Por exemplo, usando a API do Google Maps ou OpenStreetMap
          const address: Address = {
            street: "Rua obtida via GPS",
            number: "123",
            neighborhood: "Bairro obtido via GPS",
            city: "Cidade obtida via GPS",
            zipCode: "00000-000",
            latitude,
            longitude,
          };

          setDeliveryInfo({
            ...deliveryInfo,
            address,
          });
          setLocationRequested(false);
        } catch (error) {
          console.error("Erro ao obter endereço:", error);
          setLocationDenied(true);
          setLocationRequested(false);
        }
      },
      () => {
        setLocationDenied(true);
        setLocationRequested(false);
      }
    );
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    const currentAddress = deliveryInfo.address || {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      zipCode: "",
    };

    setDeliveryInfo({
      ...deliveryInfo,
      address: {
        ...currentAddress,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Tipo de Entrega
        </h2>
        <p className="text-gray-600">
          Como você gostaria de receber seu pedido?
        </p>
      </div>

      {/* Opções de entrega */}
      <div className="space-y-3">
        {deliveryOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = deliveryInfo.type === option.type;

          return (
            <button
              key={option.type}
              onClick={() => handleDeliveryTypeChange(option.type)}
              disabled={!option.available}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? "border-orange-500 bg-orange-50"
                  : option.available
                  ? "border-gray-200 bg-white hover:border-gray-300"
                  : "border-gray-200 bg-gray-50 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    <span>{option.time} min</span>
                  </div>
                </div>
                {option.selected && (
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Pré-selecionado
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Formulário de endereço para entrega */}
      {showAddressForm && deliveryInfo.type === "delivery" && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Endereço de Entrega</h3>
            <button
              onClick={requestLocation}
              disabled={locationRequested}
              className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 text-sm font-medium disabled:opacity-50"
            >
              <Navigation size={16} />
              <span>{locationRequested ? "Obtendo..." : "Usar GPS"}</span>
            </button>
          </div>

          {locationDenied && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start space-x-2">
              <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Não foi possível obter sua localização. Preencha o endereço
                manualmente.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Rua / Avenida"
                  value={deliveryInfo.address?.street || ""}
                  onChange={(e) =>
                    handleAddressChange("street", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Número"
                  value={deliveryInfo.address?.number || ""}
                  onChange={(e) =>
                    handleAddressChange("number", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Complemento (opcional)"
              value={deliveryInfo.address?.complement || ""}
              onChange={(e) =>
                handleAddressChange("complement", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Bairro"
                value={deliveryInfo.address?.neighborhood || ""}
                onChange={(e) =>
                  handleAddressChange("neighborhood", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="CEP"
                value={deliveryInfo.address?.zipCode || ""}
                onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <input
              type="text"
              placeholder="Cidade"
              value={deliveryInfo.address?.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
      )}

      {/* Informação adicional para mesa */}
      {deliveryInfo.type === "dine-in" && tableNumber && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Home size={20} className="text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">
                Mesa {tableNumber}
              </h3>
              <p className="text-sm text-blue-600">
                Seu pedido será servido diretamente na mesa
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
