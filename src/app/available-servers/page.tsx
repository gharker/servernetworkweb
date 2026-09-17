import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getAvailableServers } from "@/actions/live";
import AvailableServersFeed from "@/components/AvailableServersFeed";

export default async function AvailableServersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const viewerProfile = await prisma.profile.findUnique({
    where: { clerkId: userId },
  });

  if (!viewerProfile) {
    redirect("/");
  }

  const { servers } = await getAvailableServers();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Top Navbar */}
      <nav className="w-full flex justify-between items-center p-6 lg:px-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="flex items-center text-2xl font-bold tracking-tight">
          <span className="text-black dark:text-white">server</span>
          <span className="text-brand-500">Network</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium mr-4 transition-colors">
            Dashboard
          </Link>
          <UserButton />
        </div>
      </nav>

      <main className="flex-grow p-6 lg:p-12 max-w-3xl mx-auto w-full space-y-8">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Available Servers
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Live on-demand feed of servers ready for shifts near {viewerProfile.restaurantName || "your restaurant"}.
          </p>
        </div>

        <AvailableServersFeed
          initialServers={servers}
          restaurantName={viewerProfile.restaurantName}
        />
      </main>
    </div>
  );
}
