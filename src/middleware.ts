// middleware.ts (in root of project)
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

// Only protect these routes
export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/wishlist/:path*",
  ],
};