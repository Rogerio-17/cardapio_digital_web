"use client";

import { User, MapPin, CreditCard, CheckCircle } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { number: 1, title: "Dados", icon: User },
    { number: 2, title: "Entrega", icon: MapPin },
    { number: 3, title: "Pagamento", icon: CreditCard },
    { number: 4, title: "Resumo", icon: CheckCircle },
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;

        return (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  isActive || isCompleted ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-1 mx-2 transition-colors ${
                  currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
