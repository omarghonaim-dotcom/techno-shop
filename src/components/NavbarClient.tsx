// components/NavbarClient.tsx
"use client";

import Link from "next/link";
import ProfileButton from "./ProfileButton";

interface NavbarClientProps {
  userImage: string | null;
  userName?: string | null;
  isAuthenticated: boolean;
}

export default function NavbarClient({
  userImage,
  userName,
  isAuthenticated,
}: NavbarClientProps) {
  return (
    <div className="hidden items-center gap-5 lg:order-1 lg:flex">
      {/* Only renders ProfileButton if userImage is a non-empty string */}
      {isAuthenticated ? (
        <Link href={"/dashboard"}>
          <ProfileButton userImage={userImage} userName={userName} />
        </Link>
      ) : (
        <Link href={"/login"}>
          <button className="flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-white transition hover:bg-purple-800">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
            <span className="whitespace-nowrap">Login | Register</span>
          </button>
        </Link>
      )}

      <div className="h-8 w-px bg-gray-300" />
      <Link href={"/cart"}>
        <button className="text-gray-800 hover:text-purple-700">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6" />
          </svg>
        </button>
      </Link>
      <Link href={'/wishlist'}>
        <button>
          <i className="fa-regular fa-heart" />
        </button>
      </Link>
    </div>
  );
}
