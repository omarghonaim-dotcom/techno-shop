// src/components/cart/CartSteps.tsx
"use client";

import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";

const steps = [
  { id: 1, label: "ShoppingCart", icon: ShoppingCart, active: true },
  { id: 2, label: "Send information", icon: MapPin, active: false },
  { id: 3, label: "Payment", icon: CreditCard, active: false },
  { id: 4, label: "Packing", icon: Package, active: false },
];

export default function CartSteps() {
  return (
    <div className="bg-white border-b border-gray-200 py-4 mb-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between" dir="rtl">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.active
                      ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon size={20} />
                </div>
                <div className="text-center">
                  <p
                    className={`text-xs font-medium ${
                      step.active ? "text-purple-600" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    step.active ? "bg-purple-300" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}