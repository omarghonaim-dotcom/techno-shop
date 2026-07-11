// src/hooks/useWishlistToggle.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getToken } from "@/app/lib/token";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export const WISHLIST_IDS_KEY = ["wishlist-ids"];

// ─── API Functions ────────────────────────────────────────────────────────────
const fetchWishlistIds = async (): Promise<string[]> => {
  const token = await getToken();
  if (!token) return [];

  const res = await fetch(`${BASE_URL}/wishlist`, {
    headers: { token, "Content-Type": "application/json" },
  });

  if (!res.ok) return [];
  const json = await res.json();
  return (json.data ?? []).map((p: { _id: string }) => p._id);
};

const addToWishlistApi = async (productId: string): Promise<void> => {
  const token = await getToken();
  if (!token) throw new Error("Please login first");

  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.message || "Failed to add to wishlist");
  }
};

const removeFromWishlistApi = async (productId: string): Promise<void> => {
  const token = await getToken();
  if (!token) throw new Error("Please login first");

  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token, "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.message || "Failed to remove from wishlist");
  }
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useWishlistToggle(productId: string) {
  const queryClient = useQueryClient();

  const { data: wishlistIds = [] } = useQuery({
    queryKey: WISHLIST_IDS_KEY,
    queryFn: fetchWishlistIds,
    staleTime: 1000 * 60 * 5,
  });

  const isWishlisted = wishlistIds.includes(productId);

  // Add to wishlist
  const addMutation = useMutation({
    mutationFn: () => addToWishlistApi(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_IDS_KEY });
      const prev = queryClient.getQueryData<string[]>(WISHLIST_IDS_KEY);
      queryClient.setQueryData<string[]>(WISHLIST_IDS_KEY, (old = []) => [
        ...old,
        productId,
      ]);
      return { prev };
    },
    onError: (err: Error, _v, ctx) => {
      queryClient.setQueryData(WISHLIST_IDS_KEY, ctx?.prev);
      toast.error(err.message); // ← This is showing "Failed to add to wishlist"
    },
    onSuccess: () => {
      toast.success("Added to wishlist ❤️");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: WISHLIST_IDS_KEY }),
  });

  // Remove from wishlist
  const removeMutation = useMutation({
    mutationFn: () => removeFromWishlistApi(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_IDS_KEY });
      const prev = queryClient.getQueryData<string[]>(WISHLIST_IDS_KEY);
      queryClient.setQueryData<string[]>(WISHLIST_IDS_KEY, (old = []) =>
        old.filter((id) => id !== productId)
      );
      return { prev };
    },
    onError: (err: Error, _v, ctx) => {
      queryClient.setQueryData(WISHLIST_IDS_KEY, ctx?.prev);
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: WISHLIST_IDS_KEY }),
  });

  // ✅ Fixed toggle function
  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = await getToken(); // ✅ await the token
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (isWishlisted) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return {
    isWishlisted,
    toggle,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
}