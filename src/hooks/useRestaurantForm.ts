"use client";

import { useState } from "react";
import { RestaurantFormData } from "@/types/restaurant";

const defaultOpeningHours = {
  monday: { open: "08:00", close: "22:00", isOpen: true },
  tuesday: { open: "08:00", close: "22:00", isOpen: true },
  wednesday: { open: "08:00", close: "22:00", isOpen: true },
  thursday: { open: "08:00", close: "22:00", isOpen: true },
  friday: { open: "08:00", close: "22:00", isOpen: true },
  saturday: { open: "08:00", close: "22:00", isOpen: true },
  sunday: { open: "08:00", close: "22:00", isOpen: false },
};

const initialFormData: RestaurantFormData = {
  name: "",
  slug: "",
  description: "",
  email: "",
  phone: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  zipCode: "",
  complement: "",
  cuisine: "",
  deliveryFee: "",
  minimumOrder: "",
  estimatedDeliveryTimeMin: "30",
  estimatedDeliveryTimeMax: "45",
  paymentMethods: [],
  openingHours: defaultOpeningHours,
};

export function useRestaurantForm() {
  const [formData, setFormData] = useState<RestaurantFormData>(initialFormData);
  const [coverImage, setCoverImage] = useState<{
    file: File | null;
    preview: string;
  }>({
    file: null,
    preview: "",
  });
  const [profileImage, setProfileImage] = useState<{
    file: File | null;
    preview: string;
  }>({
    file: null,
    preview: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof RestaurantFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const updateName = (name: string) => {
    updateField("name", name);
    updateField("slug", generateSlug(name));
  };

  const updateOpeningHours = (
    day: keyof typeof formData.openingHours,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const togglePaymentMethod = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }));
  };

  const updateCoverImage = (file: File | null, preview: string) => {
    setCoverImage({ file, preview });
  };

  const updateProfileImage = (file: File | null, preview: string) => {
    setProfileImage({ file, preview });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = (
    step: number
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.name.trim())
          errors.push("Nome do restaurante é obrigatório");
        if (!formData.slug.trim())
          errors.push("URL do restaurante é obrigatória");
        if (!formData.description.trim())
          errors.push("Descrição é obrigatória");
        if (!formData.cuisine) errors.push("Tipo de culinária é obrigatório");
        break;

      case 2:
        if (!formData.email.trim()) errors.push("E-mail é obrigatório");
        if (!formData.phone.trim()) errors.push("Telefone é obrigatório");
        if (!formData.street.trim()) errors.push("Rua é obrigatória");
        if (!formData.number.trim()) errors.push("Número é obrigatório");
        if (!formData.neighborhood.trim()) errors.push("Bairro é obrigatório");
        if (!formData.city.trim()) errors.push("Cidade é obrigatória");
        if (!formData.state.trim()) errors.push("Estado é obrigatório");
        if (!formData.zipCode.trim()) errors.push("CEP é obrigatório");
        break;

      case 3:
        // Validação dos horários - pelo menos um dia deve estar aberto
        const hasOpenDay = Object.values(formData.openingHours).some(
          (day) => day.isOpen
        );
        if (!hasOpenDay)
          errors.push("Pelo menos um dia da semana deve estar aberto");
        break;

      case 4:
        if (!formData.deliveryFee.trim())
          errors.push("Taxa de entrega é obrigatória");
        if (!formData.minimumOrder.trim())
          errors.push("Pedido mínimo é obrigatório");
        if (formData.paymentMethods.length === 0)
          errors.push("Pelo menos uma forma de pagamento deve ser selecionada");
        break;
    }

    return { isValid: errors.length === 0, errors };
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    try {
      // Aqui você implementaria a lógica para enviar os dados para o backend
      // Incluindo o upload das imagens

      const restaurantData = {
        ...formData,
        coverImage: coverImage.file,
        profileImage: profileImage.file,
      };

      console.log("Dados do restaurante:", restaurantData);

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset do formulário após sucesso
      setFormData(initialFormData);
      setCoverImage({ file: null, preview: "" });
      setProfileImage({ file: null, preview: "" });
      setCurrentStep(1);

      return { success: true, message: "Restaurante cadastrado com sucesso!" };
    } catch (error) {
      console.error("Erro ao cadastrar restaurante:", error);
      return {
        success: false,
        message: "Erro ao cadastrar restaurante. Tente novamente.",
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
