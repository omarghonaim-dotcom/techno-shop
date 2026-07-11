import { getToken } from "@/app/lib/token";
import type {
  CheckoutSessionResponse,
  ShippingAddress,
} from "@/types/checkout";

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

/**
 * Creates a Stripe checkout session for the given cart and redirects
 * the shopper to Stripe once the API responds.
 *
 * @param cartId       The id of the cart being checked out.
 * @param token        The logged-in user's auth token (sent as a `token` header,
 *                      matching the Route e-commerce API's expected auth format).
 * @param shippingAddress  Shipping details collected from the checkout form.
 * @param redirectUrl  Where Stripe should send the shopper back to after payment.
 */
export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddress,
  redirectUrl: string = "http://localhost:3000",
): Promise<CheckoutSessionResponse> {

    const token = await getToken(); // ✅ Must await
    if (!token) {
      throw new Error("No authentication token found");
    }

  const endpoint = `${BASE_URL}/orders/checkout-session/${cartId}?url=${redirectUrl}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ shippingAddress }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message);
  }

  return response.json();
}
