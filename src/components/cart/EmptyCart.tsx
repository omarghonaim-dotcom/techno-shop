// src/components/cart/EmptyCart.tsx
"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export default function EmptyCart() {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      dir="rtl"
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center">
          <ShoppingCart size={40} className="text-purple-400" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-purple-600 font-bold text-xs">۰</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-700 mb-2">
        Your shopping cart is empty
      </h2>
      <p className="text-gray-400 text-sm mb-8 max-w-xs">
        You haven't added any products to your cart yet. Start shopping now!
      </p>

      <Link
        href="/products"
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-purple-200"
      >
        <ArrowLeft size={16} />
        Continue shopping
      </Link>
    </div>
  );
}
