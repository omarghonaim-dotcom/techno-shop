
export interface CartProduct {
  sold: number;
  images: string[];
  subcategory: string[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  id: string;
  price?: number;
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
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  totalAfterDiscount?: number;
  numOfCartItems: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: Cart;
}

// ✅ This is an object with productId key
export interface AddToCartPayload {
  productId: string;
}

// ✅ This is an object with count key
export interface UpdateCartPayload {
  count: number;
}