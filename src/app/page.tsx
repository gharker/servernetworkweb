import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const { userId } = await auth();

  // If not signed in, show the public landing page
  if (!userId) {
    return <LandingPage />;
  }

  // Fetch the user's profile to determine their account type
  const profile = await prisma.profile.findUnique({
    where: { clerkId: userId },
  });

  // If they are signed in but don't have a profile yet, the OnboardingModal 
  // (rendered in layout.tsx) will block the screen. We can just render a blank 
  // background or loading state here behind the modal.
  if (!profile) {
    return <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center text-gray-400">Loading your profile...</div>;
  }

  // Otherwise, render the authenticated dashboard
  return <Dashboard profile={profile} />;
}
