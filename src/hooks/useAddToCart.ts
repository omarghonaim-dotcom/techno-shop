// hooks/useAddToCart.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { cartService } from "@/services/cartService";
import { CartResponse } from "@/types/cart.types";
import toast from "react-hot-toast";

export const CART_QUERY_KEY = ["cart"];

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (productId: string) =>
      cartService.addToCart({ productId }),

    onSuccess: (data: CartResponse) => {
      if (data?.data && Array.isArray(data.data?.products)) {
        queryClient.setQueryData(CART_QUERY_KEY, data);
      }
      // POST responses often omit populated product fields (image, title).
      // Refetch so cart images render without a manual page refresh.
      void queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      toast.success("Product added to cart ✅");
    },

    onError: (error: any) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 401) {
        // toast.error(error);
        console.log(error)
        setTimeout(() => router.push("/login"), 1500);
        return;
      }

      toast.error(message || "Failed to add product ❌");
    },
  });
};