"use server";

import { auth } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";
import { prisma } from "@/lib/prisma";

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

export async function getStreamToken() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch the user's profile to ensure we pass their info
  const profile = await prisma.profile.findUnique({
    where: { clerkId: userId },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  // Generate the token
  const token = serverClient.createToken(userId);

  // Sync profile details to Stream
  await serverClient.upsertUser({
    id: userId,
    name: profile.accountType === "RESTAURANT" && profile.restaurantName 
      ? profile.restaurantName 
      : profile.username,
    image: profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}`,
    role: "user",
    accountType: profile.accountType,
  } as any);

  return { token };
}

export async function createMessagingChannel(targetUserId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const channel = serverClient.channel("messaging", {
    members: [userId, targetUserId],
    created_by_id: userId,
  });

  await channel.create();
  
  return { success: true };
}
