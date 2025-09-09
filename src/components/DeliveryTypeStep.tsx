"use client";

import { useState } from "react";
import {
  Car,
  Store,
  Home,
  Clock,
  AlertCircle,
  MapPin,
  Plus,
} from "lucide-react";

interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
}

interface SavedAddress extends Address {
  id: string;
  label: string;
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
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  // Endereços salvos simulados - em um app real, viria do backend
  // Para testar sem endereços salvos, deixe o array vazio: []
  // Para testar com endereços salvos, descomente as linhas abaixo:
  const [savedAddresses] = useState<SavedAddress[]>([
    {
      id: "1",
      label: "Casa",
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
    {
      id: "2",
      label: "Trabalho",
      street: "Avenida Paulista",
      number: "1000",
      complement: "Sala 101",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
    },
  ]);

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
      setShowNewAddressForm(false);
    } else {
      setDeliveryInfo({ type });
      setShowAddressForm(false);
      setShowNewAddressForm(false);
    }
  };

  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setCepError("CEP deve ter 8 dígitos");
      return;
    }

    setIsLoadingCep(true);
    setCepError("");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado");
        setIsLoadingCep(false);
        return;
      }

      const address: Address = {
        street: data.logradouro || "",
        number: "",
        complement: "",
        neighborhood: data.bairro || "",
        city: data.localidade || "",
        state: data.uf || "",
        zipCode: cleanCep,
      };

      setDeliveryInfo({
        ...deliveryInfo,
        address,
      });
      setIsLoadingCep(false);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setCepError("Erro ao buscar CEP");
      setIsLoadingCep(false);
    }
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    const currentAddress = deliveryInfo.address || {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    };

    const updatedAddress = {
      ...currentAddress,
      [field]: value,
    };

    setDeliveryInfo({
      ...deliveryInfo,
      address: updatedAddress,
    });

    // Se o campo alterado for o CEP, buscar endereço automaticamente
    if (field === "zipCode" && value.length >= 8) {
      fetchAddressByCep(value);
    }
  };

  const handleSelectSavedAddress = (address: SavedAddress) => {
    setDeliveryInfo({
      ...deliveryInfo,
      address: {
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
      },
    });
    setShowNewAddressForm(false);
  };

  const handleAddNewAddress = () => {
    setShowNewAddressForm(true);
    setDeliveryInfo({
      ...deliveryInfo,
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
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

      {/* Seleção de endereço para entrega */}
      {showAddressForm && deliveryInfo.type === "delivery" && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-gray-800">Endereço de Entrega</h3>

          {/* Endereços salvos */}
          {savedAddresses.length > 0 && !showNewAddressForm && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Escolha um endereço salvo:
              </p>
              {savedAddresses.map((address) => {
                const isSelected =
                  deliveryInfo.address?.street === address.street &&
                  deliveryInfo.address?.number === address.number &&
                  deliveryInfo.address?.zipCode === address.zipCode;

                return (
                  <button
                    key={address.id}
                    onClick={() => handleSelectSavedAddress(address)}
                    className={`w-full p-3 text-left border rounded-lg transition-colors ${
                      isSelected
                        ? "border-orange-300 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <MapPin size={16} className="text-gray-500 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {address.label}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.street}, {address.number}
                          {address.complement && `, ${address.complement}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.neighborhood} - {address.city}/
                          {address.state}
                        </p>
                        <p className="text-sm text-gray-500">
                          {address.zipCode}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

              <button
                onClick={handleAddNewAddress}
                className="w-full p-3 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors"
              >
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Plus size={20} />
                  <span>Enviar para outro endereço</span>
                </div>
              </button>
            </div>
          )}

          {/* Formulário para novo endereço */}
          {(savedAddresses.length === 0 || showNewAddressForm) && (
            <div className="space-y-4">
              {savedAddresses.length > 0 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Novo endereço:</p>
                  <button
                    onClick={() => setShowNewAddressForm(false)}
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Voltar
                  </button>
                </div>
              )}

              {savedAddresses.length === 0 && (
                <button
                  onClick={handleAddNewAddress}
                  className="w-full p-3 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors"
                >
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Plus size={20} />
                    <span>Adicionar endereço</span>
                  </div>
                </button>
              )}

              {/* Formulário de endereço */}
              {(showNewAddressForm || savedAddresses.length === 0) && (
                <div className="grid grid-cols-1 gap-4">
                  {/* Campo CEP no início */}
                  <div>
                    <input
                      type="text"
                      placeholder="CEP (ex: 12345-678)"
                      value={deliveryInfo.address?.zipCode || ""}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 8);
                        const formattedValue = value.replace(
                          /(\d{5})(\d{3})/,
                          "$1-$2"
                        );
                        handleAddressChange("zipCode", formattedValue);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      disabled={isLoadingCep}
                    />
                    {isLoadingCep && (
                      <p className="text-sm text-blue-600 mt-1">
                        Buscando endereço...
                      </p>
                    )}
                    {cepError && (
                      <p className="text-sm text-red-600 mt-1">{cepError}</p>
                    )}
                  </div>

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
                        readOnly={isLoadingCep}
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
                      readOnly={isLoadingCep}
                    />
                    <input
                      type="text"
                      placeholder="Estado"
                      value={deliveryInfo.address?.state || ""}
                      onChange={(e) =>
                        handleAddressChange("state", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      readOnly={isLoadingCep}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Cidade"
                    value={deliveryInfo.address?.city || ""}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    readOnly={isLoadingCep}
                  />
                </div>
              )}
            </div>
          )}
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
