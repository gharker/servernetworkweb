"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { calculateDistanceInMiles } from "@/lib/distance";

export async function toggleServerLiveStatus(coords?: { latitude: number; longitude: number }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const profile = await prisma.profile.findUnique({
    where: { clerkId: userId },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  if (profile.accountType !== "SERVER") {
    throw new Error("Only server accounts can go live");
  }

  const nextLiveState = !profile.isLive;

  const updated = await prisma.profile.update({
    where: { clerkId: userId },
    data: {
      isLive: nextLiveState,
      lastLiveAt: nextLiveState ? new Date() : profile.lastLiveAt,
      ...(coords && coords.latitude && coords.longitude
        ? {
            latitude: coords.latitude,
            longitude: coords.longitude,
          }
        : {}),
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/available-servers");

  return { success: true, isLive: updated.isLive };
}

export async function getAvailableServers() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const viewerProfile = await prisma.profile.findUnique({
    where: { clerkId: userId },
  });

  const liveServers = await prisma.profile.findMany({
    where: {
      accountType: "SERVER",
      isLive: true,
    },
    orderBy: {
      lastLiveAt: "desc",
    },
    select: {
      id: true,
      clerkId: true,
      username: true,
      avatarUrl: true,
      serverExperience: true,
      latitude: true,
      longitude: true,
      lastLiveAt: true,
    },
  });

  const serversWithDistance = liveServers
    .map((server) => {
      const distance =
        viewerProfile?.latitude &&
        viewerProfile?.longitude &&
        server.latitude &&
        server.longitude
          ? calculateDistanceInMiles(
              viewerProfile.latitude,
              viewerProfile.longitude,
              server.latitude,
              server.longitude
            )
          : null;

      return {
        ...server,
        distance,
      };
    })
    .sort((a, b) => {
      if (a.distance === null && b.distance !== null) return 1;
      if (b.distance === null && a.distance !== null) return -1;
      if (a.distance === null && b.distance === null) return 0;
      return a.distance! - b.distance!;
    });

  return {
    servers: serversWithDistance,
    restaurant: viewerProfile,
  };
}
