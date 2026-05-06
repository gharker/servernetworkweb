"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { calculateDistanceInMiles } from "@/lib/distance";

export async function getDashboardStats(latitude: number, longitude: number, accountType: "SERVER" | "RESTAURANT") {
  const { userId } = await auth();
  if (!userId) return null;

  const oppositeType = accountType === "SERVER" ? "RESTAURANT" : "SERVER";

  const posts = await prisma.post.findMany({
    where: {
      author: {
        accountType: oppositeType,
      },
    },
    include: {
      author: true,
    },
  });

  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  let recentPostsCount = 0;
  let totalNearbyCount = 0;

  for (const post of posts) {
    if (post.author.latitude && post.author.longitude) {
      const distance = calculateDistanceInMiles(latitude, longitude, post.author.latitude, post.author.longitude);
      if (distance <= 45) {
        totalNearbyCount++;
        if (post.createdAt >= fortyEightHoursAgo) {
          recentPostsCount++;
        }
      }
    }
  }

  return {
    recentPostsCount,
    totalNearbyCount,
  };
}
