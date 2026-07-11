// src/app/wishlist/page.tsx
import { Metadata } from "next";
import WishlistPage from "@/components/wishlist/WishlistPage";

export const metadata: Metadata = {
  title: "My Wishlist | RouteShop",
  description: "View and manage your saved products",
};

export default function Page() {
  return <WishlistPage />;
}