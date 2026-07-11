// src/app/cart/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import CartSteps from "@/components/cart/CartSteps";
import CartItemComponent from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import CartSkeleton from "@/components/cart/CartSkeleton";
import ConfirmModal from "@/components/cart/ConfirmModal";

export default function CartPage() {
  const router = useRouter();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const {
    cartData,
    isCartLoading,
    isCartError,
    refetchCart,
    updateCartItem,
    isUpdatingCart,
    updatingItemId,
    removeCartItem,
    isRemovingItem,
    removingItemId,
    clearCart,
    isClearingCart,
  } = useCart();

  const handleUpdateCount = (itemId: string, count: number) => {
    updateCartItem({ itemId, count });
  };

  const handleRemoveItem = (itemId: string) => {
    removeCartItem(itemId);
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (isCartLoading) return <CartSkeleton />;

  if (isCartError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-20" dir="rtl">
          <AlertTriangle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            Error loading your cart{" "}
          </h2>
          <p className="text-gray-400 text-sm mb-6">Please try again</p>
          <button
            onClick={() => refetchCart()}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isEmpty =
    !cartData || !cartData.data || cartData.data.products.length === 0;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <CartSteps />

      <div className="max-w-5xl mx-auto px-4 pb-12">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-600 rounded-full" />
            Your shopping cart{" "}
          </h1>
          {!isEmpty && (
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              {cartData!.numOfCartItems} goods
            </span>
          )}
        </div>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Summary - Left on desktop */}
              <div className="lg:col-span-1 lg:order-2">
                <CartSummary
                  cart={cartData!.data}
                  onClearCart={handleClearCart}
                  isClearingCart={isClearingCart}
                  onCheckout={handleCheckout}
                />
              </div>

              {/* Cart Items - Right on desktop */}
              <div className="lg:col-span-2 lg:order-1 space-y-4">
                {cartData!.data.products.map((item) => (
                  <CartItemComponent
                    key={item._id}
                    item={item}
                    onUpdateCount={handleUpdateCount}
                    onRemove={handleRemoveItem}
                    isUpdating={isUpdatingCart}
                    isRemoving={isRemovingItem}
                    updatingItemId={updatingItemId}
                    removingItemId={removingItemId}
                  />
                ))}
              </div>
            </div>

            
          </>
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      <ConfirmModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearCart}
        isLoading={isClearingCart}
        title="Clear cart"
        message="Are you sure you want to remove all items from your cart?"
      />
    </div>
  );
}
