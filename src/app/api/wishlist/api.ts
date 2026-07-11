import { AddToWishlistResponse, RemoveFromWishlistResponse, WishlistResponse } from "@/types/wishlist";

// src/lib/api.ts
const BASE_URL = process.env.API;

const getAuthToken = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userToken") || "";
  }
  return "";
};

export const wishlistApi = {
  getWishlist: async (): Promise<WishlistResponse> => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/wishlist`, {
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch wishlist");
    return response.json();
  },

  addToWishlist: async (productId: string): Promise<AddToWishlistResponse> => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    if (!response.ok) throw new Error("Failed to add to wishlist");
    return response.json();
  },

  removeFromWishlist: async (
    productId: string
  ): Promise<RemoveFromWishlistResponse> => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to remove from wishlist");
    return response.json();
  },
};

export const cartApi = {
  addToCart: async (productId: string) => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    if (!response.ok) throw new Error("Failed to add to cart");
    return response.json();
  },
};