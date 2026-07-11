// Adjust these shapes if your actual cart/product response differs.
// These match the typical Route e-commerce ("Fresh Cart") API response.

export interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  totalCartPrice: number;
  products: CartItem[];
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CheckoutSessionResponse {
  status: string;
  session: {
    id: string;
    url: string;
  };
}
