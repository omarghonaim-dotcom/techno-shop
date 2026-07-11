// services/cartService.ts
import { getToken } from "@/app/lib/token";
import {
  CartResponse,
  AddToCartPayload,
  UpdateCartPayload,
} from "@/types/cart.types";

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken();

  if (!token) {
    throw new ApiError("Not authenticated. Please login.", 401);
  }

  const response = await fetch(`${BASE_URL}/cart`, {
    method: options.method ?? "GET",
    headers: { "Content-Type": "application/json", token },
    ...options,
  });


  const contentType = response.headers.get("content-type") ?? "";
  const isHtml = !contentType.includes("application/json");

  if (isHtml) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    throw new ApiError("Session expired. Please login again.", 401);
  }

  const data = await response.json();

  if (!response.ok) {
    console.error("API Error:", {
      status: response.status,
      message: data?.message,
      url: path,
    });
    throw new ApiError(
      data?.message ?? "Request failed",
      response.status,
      data
    );
  }

  return data as T;
}

export const cartService = {
  getCart: (): Promise<CartResponse> => request<CartResponse>("/cart"),

  addToCart: (payload: AddToCartPayload): Promise<CartResponse> =>
    request<CartResponse>("/cart", {
      cache:'no-store',
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateCartItem: (
    itemId: string,
    payload: UpdateCartPayload
  ): Promise<CartResponse> =>
    request<CartResponse>(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  removeCartItem: (itemId: string): Promise<CartResponse> =>
    request<CartResponse>(`/cart/${itemId}`, { method: "DELETE" }),

  clearCart: (): Promise<{ message: string }> =>
    request<{ message: string }>("/cart", { method: "DELETE" }),
};