// src/lib/token.ts
"use client";

import { getSession } from "next-auth/react"; // if using NextAuth
// OR import your own session hook/context

export const getToken = async (): Promise<string> => {
  if (typeof window === "undefined") return "";

  // ✅ 1. Try to get from session first (recommended)
  try {
    // If you're using NextAuth
    const session = await getSession();
    if (session?.user?.accessToken) {
      return session.user.accessToken;
    }
  } catch (_) {}

  // ✅ 2. Fallback to localStorage
  const token =
    localStorage.getItem("userToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("userToken") ||
    sessionStorage.getItem("token") ||
    "";

  return token;
};