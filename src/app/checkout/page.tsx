"use client";
import { useEffect, useState } from "react";
import { Fraunces, Inter } from "next/font/google";
import type { Cart } from "@/types/checkout";
import CheckoutPage from "@/components/checkout/CheckoutPage";
import { getToken } from "../lib/token";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

async function getCart(token: string): Promise<Cart> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token, "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Could not load your cart.");
  const data = await res.json();
  return data.data as Cart;
}

export default function Page() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getToken()
      .then((t) => {
        setToken(t);
        return getCart(t);
      })
      .then(setCart)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6EEDF] text-[#8C3A1D]">
        {error}
      </div>
    );
  }

  if (!cart || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6EEDF] text-[#5B4A38]">
        Loading your cart...
      </div>
    );
  }

  return (
    <main className={`${fraunces.variable} ${inter.variable} font-sans`}>
      <CheckoutPage
        cart={cart}
        token={token}
        redirectUrl="http://localhost:3000"
      />
    </main>
  );
}