"use client";

import {
  MapPin,
  Clock,
  DollarSign,
  CreditCard,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";

const cuisineTypes = [
  "Italiana",
  "Brasileira",
  "Japonesa",
  "Mexicana",
  "Árabe",
  "Chinesa",
  "Indiana",
  "Francesa",
  "Americana",
  "Vegetariana",
  "Vegana",
  "Pizza",
  "Hambúrguer",
  "Sushi",
  "Churrasco",
  "Frutos do Mar",
  "Doces & Sobremesas",
  "Outro",
];

const paymentMethodsOptions = [
  "Dinheiro",
  "Cartão de Crédito",
  "Cartão de Débito",
  "PIX",
  "Vale Refeição",
  "Vale Alimentação",
];

export default function RestaurantRegister() {
  const {
    formData,
    coverImage,
    profileImage,
    currentStep,
    isSubmitting,
    updateField,
    updateName,
    updateOpeningHours,
    togglePaymentMethod,
    updateCoverImage,
    updateProfileImage,
    nextStep,
    prevStep,
    validateStep,
    submitForm,
  } = useRestaurantForm();

  const totalSteps = 4;

  const handleNextStep = () => {
    const { isValid, errors } = validateStep(currentStep);

    if (isValid) {
      nextStep();
    } else {
      alert("Erro: " + errors.join(", "));
    }
  };

  const handleSubmit = async () => {
    const { isValid, errors } = validateStep(currentStep);

    if (isValid) {
      const result = await submitForm();
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } else {
      alert("Erro: " + errors.join(", "));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Informações Básicas
              </h2>
              <p className="text-gray-600">
                Vamos começar com as informações essenciais do seu restaurante
              </p>
            </div>

            <div className="space-y-4">
              <ImageUpload
                label="Imagem de Capa"
                type="cover"
                onImageChange={updateCoverImage}
                preview={coverImage.preview}
              />

              <ImageUpload
                label="Logo do Restaurante"
                type="profile"
                onImageChange={updateProfileImage}
                preview={profileImage.preview}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Restaurante
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateName(e.target.value)}
                  placeholder="Ex: Pizzaria do João"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL do Restaurante (Slug)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="pizzaria-do-joao"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Será usado na URL: cardapio.com/
                  {formData.slug || "seu-restaurante"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Descreva seu restaurante, especialidades, diferenciais..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Culinária
                </label>
                <select
                  value={formData.cuisine}
                  onChange={(e) => updateField("cuisine", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione o tipo de culinária</option>
                  {cuisineTypes.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Contato e Endereço
              </h2>
              <p className="text-gray-600">
                Informações para contato e localização
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline w-4 h-4 mr-1" />
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="contato@restaurante.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-700">Endereço</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => updateField("street", e.target.value)}
                      placeholder="Rua/Avenida"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.number}
                      onChange={(e) => updateField("number", e.target.value)}
                      placeholder="Número"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) =>
                      updateField("neighborhood", e.target.value)
                    }
                    placeholder="Bairro"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => updateField("complement", e.target.value)}
                    placeholder="Complemento (opcional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Cidade"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    placeholder="Estado"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => updateField("zipCode", e.target.value)}
                    placeholder="CEP"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Funcionamento
              </h2>
              <p className="text-gray-600">
                Configure os horários de funcionamento
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-gray-700">
                  Horários de Funcionamento
                </span>
              </div>

              {Object.entries(formData.openingHours).map(([day, hours]) => {
                const dayNames = {
                  monday: "Segunda-feira",
                  tuesday: "Terça-feira",
                  wednesday: "Quarta-feira",
                  thursday: "Quinta-feira",
                  friday: "Sexta-feira",
                  saturday: "Sábado",
                  sunday: "Domingo",
                };

                const dayHours = hours as {
                  open: string;
                  close: string;
                  isOpen: boolean;
                };

                return (
                  <div
                    key={day}
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-32">
                      <span className="font-medium text-gray-700">
                        {dayNames[day as keyof typeof dayNames]}
                      </span>
                    </div>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={dayHours.isOpen}
                        onChange={(e) =>
                          updateOpeningHours(
                            day as keyof typeof formData.openingHours,
                            "isOpen",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Aberto</span>
                    </label>

                    {dayHours.isOpen && (
                      <>
                        <input
                          type="time"
                          value={dayHours.open}
                          onChange={(e) =>
                            updateOpeningHours(
                              day as keyof typeof formData.openingHours,
                              "open",
                              e.target.value
                            )
                          }
                          className="px-2 py-1 border border-gray-300 rounded"
                        />
                        <span>às</span>
                        <input
                          type="time"
                          value={dayHours.close}
                          onChange={(e) =>
                            updateOpeningHours(
                              day as keyof typeof formData.openingHours,
                              "close",
                              e.target.value
                            )
                          }
                          className="px-2 py-1 border border-gray-300 rounded"
                        />
                      </>
                    )}

                    {!dayHours.isOpen && (
                      <span className="text-gray-500 italic">Fechado</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Delivery e Pagamento
              </h2>
              <p className="text-gray-600">
                Configure as opções de entrega e formas de pagamento
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-700">
                    Configurações de Entrega
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Taxa de Entrega (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.deliveryFee}
                      onChange={(e) =>
                        updateField("deliveryFee", e.target.value)
                      }
                      placeholder="5.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pedido Mínimo (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.minimumOrder}
                      onChange={(e) =>
                        updateField("minimumOrder", e.target.value)
                      }
                      placeholder="25.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tempo de Entrega (minutos)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        value={formData.estimatedDeliveryTimeMin}
                        onChange={(e) =>
                          updateField(
                            "estimatedDeliveryTimeMin",
                            e.target.value
                          )
                        }
                        placeholder="30"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-500">Mínimo</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={formData.estimatedDeliveryTimeMax}
                        onChange={(e) =>
                          updateField(
                            "estimatedDeliveryTimeMax",
                            e.target.value
                          )
                        }
                        placeholder="45"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-500">Máximo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-700">
                    Formas de Pagamento
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {paymentMethodsOptions.map((method) => (
                    <label
                      key={method}
                      className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.includes(method)}
                        onChange={() => togglePaymentMethod(method)}
                        className="mr-3"
                      />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cadastro de Restaurante
          </h1>
          <p className="text-gray-600">
            Cadastre seu restaurante em nosso cardápio digital
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      i + 1 < currentStep ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Etapa {currentStep} de {totalSteps}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Anterior
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNextStep}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg font-medium ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Processando..." : "Finalizar Cadastro"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
