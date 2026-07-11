// src/components/cart/CartSummary.tsx
"use client";

import { ShoppingBag, Loader2, AlertTriangle, Tag } from "lucide-react";
import { Cart } from "@/types/cart.types";

interface CartSummaryProps {
  cart: Cart;
  onClearCart: () => void;
  isClearingCart: boolean;
  onCheckout: () => void;
}

export default function CartSummary({
  cart,
  onClearCart,
  isClearingCart,
  onCheckout,
}: CartSummaryProps) {
  const formatPrice = (price: number) => price.toLocaleString("en-US");

  const totalOriginalPrice = Math.round(cart.totalCartPrice * 1.1);
  const discount = totalOriginalPrice - cart.totalCartPrice;
  const shipping = 0; // Free shipping

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-4"
      dir="rtl"
    >
      <div className="p-5">
        <h2 className="text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
          num of cart items : {cart.products.length}
        </h2>

        {/* Price Breakdown */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Product prices</span>
            <span className="text-sm font-medium text-gray-800">
              {formatPrice(totalOriginalPrice)} جنيه
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cart total</span>
            <span className="text-sm font-medium text-gray-800">
              {formatPrice(cart.totalCartPrice)} جنيه
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Tag size={14} className="text-green-500" />
              <span className="text-sm text-green-600">Discount</span>
            </div>
            <span className="text-sm font-bold text-red-500">
              {formatPrice(discount)} جنيه
            </span>
          </div>

          {shipping === 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Delivery fee</span>
              <span className="text-sm font-bold text-green-600">Free</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-gray-100 pt-4 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-800">Price</span>
            <div className="text-left">
              {cart.totalAfterDiscount && (
                <div className="text-xs text-gray-400 line-through text-right">
                  {formatPrice(cart.totalCartPrice)} جنيه
                </div>
              )}
              <span className="text-lg font-extrabold text-gray-900">
                {formatPrice(cart.totalAfterDiscount || cart.totalCartPrice)}{" "}
                <span className="text-xs font-normal text-gray-500">جنيه</span>
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-200 flex items-center justify-center gap-2 text-sm"
        >
          <ShoppingBag size={18} />
          Checkout
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
          The cost of this order has not been finalized, and if any items are
          unavailable, they will be removed from the cart.
        </p>

        {/* Clear Cart */}
        <button
          onClick={onClearCart}
          disabled={isClearingCart}
          className="w-full mt-3 py-2 px-4 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          {isClearingCart ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <AlertTriangle size={14} />
          )}
          delete cart items{" "}
        </button>
      </div>
    </div>
  );
}
