// src/types/wishlist.ts
export interface WishlistProduct {
  refetch:string;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  images: string[];
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceAfterDiscount?: number;
  available?: boolean;
  id: string;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}

export interface AddToWishlistResponse {
  status: string;
  message: string;
  data: string[];
}

export interface RemoveFromWishlistResponse {
  status: string;
  message: string;
  data: string[];
}