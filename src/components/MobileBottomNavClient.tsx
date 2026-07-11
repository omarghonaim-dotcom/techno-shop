// components/MobileBottomNavClient.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Heart, Search, User } from "lucide-react";
import { CartResponse } from "@/types/cart.types";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/app/lib/token";

interface MobileBottomNavClientProps {
  userImage: string | null;
  userName?: string | null;
}

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Account", href: "/dashboard", icon: User },
];

const CART_URL = "https://ecommerce.routemisr.com/api/v1/cart";

export default function MobileBottomNavClient({
  userImage,
  userName,
}: MobileBottomNavClientProps) {
  const pathname = usePathname();
  const isLoggedIn = Boolean(userImage || userName);

  const getHref = (href: string) => {
    if (href === "/dashboard" && !userImage && !userName) return "/login";
    return href;
  };

  const { data } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("No token found");
      }

      const res = await fetch(CART_URL, {
        headers: {
          token,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch cart: ${res.status}`);
      }

      return res.json();
    },
    enabled: isLoggedIn,
    staleTime: 30_000,
    retry: 1,
  });

  const cartCount = data?.numOfCartItems ?? 0;

  return (
    <>
      {/* Spacer */}
      <div className="h-20 lg:hidden" />

      <nav
        dir="rtl"
        className="
          fixed bottom-0 left-0 right-0 z-50
          lg:hidden
          bg-white/80 backdrop-blur-md
          border-t border-gray-200
          shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
          px-2 py-2
        "
      >
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={getHref(item.href)}
                  className="flex flex-col items-center gap-1 group"
                >
                  {/* Icon Container */}
                  <div
                    className={`
                      relative flex items-center justify-center
                      w-10 h-10 rounded-2xl
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "bg-purple-700 shadow-lg shadow-purple-200 scale-110 -translate-y-1"
                          : "bg-transparent group-hover:bg-purple-50 group-hover:scale-105"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        h-5 w-5
                        transition-all duration-300
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-purple-600"
                        }
                      `}
                    />

                    {/* Cart Badge */}
                    {item.href === "/cart" && isLoggedIn && cartCount > 0 && (
                      <span
                        className="
                          absolute -top-1 -right-1
                          min-w-4 h-4 px-[3px] rounded-full
                          bg-red-500 text-white
                          text-[10px] font-bold
                          flex items-center justify-center
                          animate-pulse
                        "
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      text-[10px] font-medium
                      transition-all duration-300
                      ${
                        isActive
                          ? "text-purple-700 font-bold"
                          : "text-gray-400 group-hover:text-purple-600"
                      }
                    `}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}