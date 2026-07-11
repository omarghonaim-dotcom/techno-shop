// src/hooks/useWishlist.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getToken } from "@/app/lib/token";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface WishlistProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  sold: number;
  description: string;
  category: { _id: string; name: string; slug: string };
  brand: { _id: string; name: string; slug: string };
  slug: string;
}

interface WishlistApiResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}

// ─── API Calls ────────────────────────────────────────────────────────────────
const getWishlist = async (): Promise<WishlistApiResponse> => {
  const token = await getToken(); // ✅ Must await
  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch wishlist (${res.status})`);
  }

  return res.json();
};

const removeFromWishlist = async (productId: string): Promise<void> => {
  const token = await getToken();
  if (!token) throw new Error("No token");

  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token, "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to remove item");
  }
};

const addToCart = async (productId: string): Promise<void> => {
  const token = await getToken();
  if (!token) throw new Error("No token");

  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add to cart");
  }
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const WISHLIST_KEY = ["wishlist"];

export function useWishlist() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: WISHLIST_KEY,
    queryFn: getWishlist,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEY });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Added to cart!");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    wishlist: query.data?.data ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    removeFromWishlist: removeMutation.mutate,
    isRemoving: removeMutation.isPending,
    removingId: removeMutation.variables,
    addToCart: addToCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    addingToCartId: addToCartMutation.variables,
  };
}