// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { authOptions } from "../lib/nextAuth";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const avatarLetter = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-semibold">Dashboard</span>
          </div>
          <LogoutButton />
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Avatar"
                  width={64}
                  height={64}
                  className="rounded-2xl"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {avatarLetter}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-950" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Welcome back, {session.user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-400 text-sm">{session.user?.email}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs capitalize">
                  {session.user?.role ?? "user"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Orders", value: "24", icon: "🛍️", change: "+12%" },
            { label: "Wishlist", value: "8", icon: "❤️", change: "+3%" },
            { label: "Reviews", value: "16", icon: "⭐", change: "+5%" },
            { label: "Points", value: "450", icon: "💎", change: "+20%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-purple-500/30 transition-all">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
              <div className="text-green-400 text-xs mt-1">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Session Info */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Session Information
          </h2>
          <div className="space-y-3">
            {[
              { label: "User ID", value: session.user?.id || "Social Auth" },
              { label: "Name", value: session.user?.name || "—" },
              { label: "Email", value: session.user?.email || "—" },
              { label: "Role", value: session.user?.role || "user" },
              
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-500 text-sm">{item.label}</span>
                <span className="text-gray-200 text-sm font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}