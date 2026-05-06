"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function updateLocation(latitude: number, longitude: number) {
  const { userId } = await auth();
  if (!userId) return;

  await prisma.profile.updateMany({
    where: { clerkId: userId },
    data: {
      latitude,
      longitude,
    },
  });
}
