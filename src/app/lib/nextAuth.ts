import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./api";

export const authOptions: NextAuthOptions = {
  providers: [
    // ─── Credentials ───────────────────────────────────────────────
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const data = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            id: data.user.email,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            token: data.token,
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          throw new Error(error.message || "Invalid credentials");
        }
      },
    }),


  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.access_token) {
        // OAuth provider login
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
        token.accessToken = (user as any).token ?? account?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
        (session as any).provider = token.provider;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
};
