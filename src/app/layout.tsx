import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import OnboardingModal from "@/components/OnboardingModal";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "serverNetwork - Reimagining Restaurant Staffing",
  description: "Whether you're a server looking to pick up extra shifts or a restaurant needing coverage for the dinner rush, we've got you covered."
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  let needsProfile = false;

  if (userId) {
    const profile = await prisma.profile.findUnique({
      where: { clerkId: userId },
    });
    if (!profile) {
      needsProfile = true;
    }
  }

  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body suppressHydrationWarning className="min-h-full flex flex-col">
          {children}
          <Toaster />
          <OnboardingModal isOpen={needsProfile} />
        </body>
      </html>
    </ClerkProvider>
  );
}
