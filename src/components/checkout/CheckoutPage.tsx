"use client";

import { useMemo, useState } from "react";
// import { createCheckoutSession } from "@/lib/checkout";
import type { Cart, ShippingAddress } from "@/types/checkout";
import { createCheckoutSession } from "@/app/api/checkout/checkout";

interface CheckoutPageProps {
  /** The cart being checked out — comes from your cart fetch/response. */
  cart: Cart;
  /** Logged-in user's auth token. Wire this up to however you store auth. */
  token: string;
  /** Where Stripe redirects back to after payment. Defaults to localhost for dev. */
  redirectUrl?: string;
}

// Color system (from brand palette)
// Primary: purple, Neutral: white -> black grays, Semantic: error / success / warning
const inputClasses =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition";

const labelClasses = "block text-sm font-medium text-gray-600 mb-1.5";

export default function CheckoutPage({
  cart,
  token,
  redirectUrl = "http://localhost:3000",
}: CheckoutPageProps) {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    details: "",
    phone: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemCount = useMemo(
    () => cart.products.reduce((sum, item) => sum + item.count, 0),
    [cart.products]
  );

  function handleChange(field: keyof ShippingAddress, value: string) {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!shippingAddress.details || !shippingAddress.phone || !shippingAddress.city) {
      setError("Fill in all shipping details before placing your order.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { session } = await createCheckoutSession(
        cart._id,
        shippingAddress,
        redirectUrl
      );
      window.location.href = session.url;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong placing your order. Try again."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-purple-700">
            Almost there
          </p>
          <h1 className="text-4xl font-semibold text-gray-900 sm:text-5xl">
            Checkout
          </h1>
          <p className="mt-3 text-gray-500">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Shipping form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8"
          >
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Shipping details
            </h2>

            <div className="space-y-5">
              <div>
                <label className={labelClasses} htmlFor="details">
                  Address
                </label>
                <textarea
                  id="details"
                  rows={3}
                  className={inputClasses}
                  placeholder="Street, apartment, landmark..."
                  value={shippingAddress.details}
                  onChange={(e) => handleChange("details", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses} htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className={inputClasses}
                  placeholder="Cairo"
                  value={shippingAddress.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses} htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={inputClasses}
                  placeholder="01xxxxxxxxx"
                  value={shippingAddress.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-xl bg-purple-700 px-6 py-3.5 font-medium text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Placing your order..." : "Place order"}
            </button>
          </form>

          {/* Order summary */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Order summary
            </h2>

            <ul className="space-y-4">
              {cart.products.map((item) => (
                <li key={item._id} className="flex items-center gap-3">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-400">Qty {item.count}</p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.price * item.count} EGP
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                <span>Total</span>
                <span>{cart.totalCartPrice} EGP</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
              Secure checkout — your info is protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}