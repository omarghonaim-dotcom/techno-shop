// components/ProfileButton.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface ProfileButtonProps {
  userImage: string | null;
  userName?: string | null;
}

export default function ProfileButton({ userImage, userName }: ProfileButtonProps) {
  // Guard: return name if no image
  if (!userImage) return <span>{userName}</span>;

  return (
    // ✅ Use Link directly as the clickable element — no nested <button> or <Link>
    <Link
      href="/dashboard"
      className="flex items-center gap-2 rounded-xl border border-purple-200 
                 px-3 py-2 hover:bg-purple-50 transition"
    >
      <Image
        src={userImage}
        alt={userName ?? "User"}
        width={36}
        height={36}
        className="rounded-full"
      />
      {userName && (
        <span className="text-sm font-medium text-gray-700">{userName}</span>
      )}
    </Link>
  );
}