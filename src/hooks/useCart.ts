// src/hooks/useCart.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getToken } from "@/app/lib/token";
import { CartResponse } from "@/types/cart.types";
import { useSession } from "next-auth/react";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// ─── Constants ──────────────────────────────────────────────────────────────
export const CART_QUERY_KEY = ["cart"];

const EMPTY_CART: CartResponse = {
  status: "success",
  numOfCartItems: 0,
  data: {
    _id: "",
    cartOwner: "",
    products: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
    totalCartPrice: 0,
    numOfCartItems: 0,
  },
};

// ─── API Calls ────────────────────────────────────────────────────────────────
const getCart = async (): Promise<CartResponse> => {
  const token = await getToken(); // ✅ Must await
  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    cache: "no-store",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch cart (${res.status})`,
    );
  }

  return res.json();
};

const addToCartRequest = async (productId: string): Promise<CartResponse> => {
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

  return res.json();
};

const updateCartItemRequest = async (
  itemId: string,
  count: number,
): Promise<CartResponse> => {
  const token = await getToken();
  if (!token) throw new Error("No token");

  const res = await fetch(`${BASE_URL}/cart/${itemId}`, {
    method: "PUT",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update cart item");
  }

  return res.json();
};

const removeCartItemRequest = async (itemId: string): Promise<void> => {
  const token = await getToken();
    if (!token) throw new Error("No token");
  
    const res = await fetch(`${BASE_URL}/cart/${itemId}`, {
      method: "DELETE",
      headers: { token, "Content-Type": "application/json" },
    });
  
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to remove item");
    }

  // Don't assume there's a JSON body to parse
};

const clearCartRequest = async (): Promise<void> => {
  const token = await getToken();
  if (!token) throw new Error("No token");

  const res = await fetch(`${BASE_URL}/cart`, {
    method: "DELETE",
    headers: { token, "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to clear cart");
  }
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useCart = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
    refetch: refetchCart,
  } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: getCart,
    enabled: status === "authenticated", // ✅ only fetch once session is confirmed
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    select: (data): CartResponse => {
      if (!data?.data || !Array.isArray(data.data?.products)) {
        return EMPTY_CART;
      }
      return data;
    },
  });

  const handleAuthError = (error: Error): boolean => {
    const message = error.message.toLowerCase();

    if (
      message.includes("login") ||
      message.includes("session") ||
      message.includes("unauthorized") ||
      message.includes("token")
    ) {
      toast.error("Session expired. Please login again.");
      setTimeout(() => router.push("/login"), 1500);
      return true;
    }
    return false;
  };

  // const isCartLoading = status === "loading" || queryIsLoading;

  // ✅ POST - Add to cart
  const addToCartMutation = useMutation({
    mutationFn: addToCartRequest,
    onSuccess: (data) => {
      if (data?.data && Array.isArray(data.data?.products)) {
        queryClient.setQueryData(CART_QUERY_KEY, data);
      }
      void queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      toast.success("product added ✅");
    },
    onError: (error: Error) => {
      if (handleAuthError(error)) return;
      toast.error(error.message || "failed to add");
    },
  });

  // ✅ PUT - Update item count
  type CartMutationVars = { itemId: string; count: number };
  type CartMutationContext = { previousCart: CartResponse | undefined };

  const updateCartItemMutation = useMutation<
    CartResponse,
    Error,
    CartMutationVars,
    CartMutationContext
  >({
    mutationFn: ({ itemId, count }) => updateCartItemRequest(itemId, count),

    onMutate: async ({ itemId, count }) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

      const previousCart =
        queryClient.getQueryData<CartResponse>(CART_QUERY_KEY);

      queryClient.setQueryData<CartResponse | undefined>(
        CART_QUERY_KEY,
        (old) => {
          if (!old?.data?.products) return old;

          const updatedProducts = old.data.products.map(
            (item) => (item.product._id === itemId ? { ...item, count } : item), // ✅ changed
          );

          const totalCartPrice = updatedProducts.reduce(
            (sum, item) => sum + (item.price ?? 0) * (item.count ?? 0),
            0,
          );

          return {
            ...old,
            data: {
              ...old.data,
              products: updatedProducts,
              totalCartPrice,
            },
          };
        },
      );

      return { previousCart };
    },

    onSuccess: (data) => {
      if (data?.data && Array.isArray(data.data.products)) {
        queryClient.setQueryData(CART_QUERY_KEY, data);
      } else {
        // Response shape unexpected — fall back to refetch for consistency
        queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      }
    },

    onError: (error, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
      if (handleAuthError(error)) return;
      toast.error(error.message || "خطا در بروزرسانی سبد خرید");
    },

    // Safety net: ensures cache eventually matches server truth
    // even if onSuccess's shape check misses something.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });


  const removeCartItemMutation = useMutation({
    mutationFn: removeCartItemRequest,
    onSuccess: () => {
      toast.success("Removed from cart");
      queryClient.invalidateQueries({ queryKey:CART_QUERY_KEY,});
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  // ✅ DELETE - Clear cart
  const clearCartMutation = useMutation({
    mutationFn: clearCartRequest,
    onSuccess: () => {
      queryClient.setQueryData(CART_QUERY_KEY, EMPTY_CART);
      toast.success("cart cleared");
    },
    onError: (error: Error) => {
      if (handleAuthError(error)) return;
      toast.error("clear error");
    },
  });

  return {
    cartData: cartData ?? EMPTY_CART,
    isCartLoading,
    isCartError,
    cartError,
    refetchCart,
    addToCart: addToCartMutation.mutate,
    addToCartAsync: addToCartMutation.mutateAsync,
    isAddingToCart: addToCartMutation.isPending,
    updateCartItem: updateCartItemMutation.mutate,
    isUpdatingCart: updateCartItemMutation.isPending,
    updatingItemId: updateCartItemMutation.variables?.itemId,
    removeCartItem: removeCartItemMutation.mutate,
    isRemovingItem: removeCartItemMutation.isPending,
    removingItemId: removeCartItemMutation.variables,
    clearCart: clearCartMutation.mutate,
    isClearingCart: clearCartMutation.isPending,
  };
};
