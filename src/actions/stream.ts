"use server";

import { auth } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";
import { prisma } from "@/lib/prisma";
import { getCustomAvatarUrl } from "@/lib/avatar";

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

  // Stream Chat limits custom data to 5KB. Base64 images easily exceed this.
  const isBase64Avatar = profile.avatarUrl?.startsWith("data:image/");
  const streamImageUrl = isBase64Avatar 
    ? getCustomAvatarUrl(profile.username)
    : (profile.avatarUrl || getCustomAvatarUrl(profile.username));

  // Sync profile details to Stream
  await serverClient.upsertUser({
    id: userId,
    name: profile.accountType === "RESTAURANT" && profile.restaurantName 
      ? profile.restaurantName 
      : profile.username,
    image: streamImageUrl,
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

  // We must ensure the target user exists in Stream Chat before creating the channel.
  // If they haven't logged in recently, they won't exist in Stream yet.
  const targetProfile = await prisma.profile.findUnique({
    where: { clerkId: targetUserId },
  });

  if (targetProfile) {
    const isBase64Avatar = targetProfile.avatarUrl?.startsWith("data:image/");
    const targetImageUrl = isBase64Avatar 
      ? getCustomAvatarUrl(targetProfile.username)
      : (targetProfile.avatarUrl || getCustomAvatarUrl(targetProfile.username));

    await serverClient.upsertUser({
      id: targetUserId,
      name: targetProfile.accountType === "RESTAURANT" && targetProfile.restaurantName 
        ? targetProfile.restaurantName 
        : targetProfile.username,
      image: targetImageUrl,
      role: "user",
      accountType: targetProfile.accountType,
    } as any);
  }

  const channel = serverClient.channel("messaging", {
    members: [userId, targetUserId],
    created_by_id: userId,
  });

  await channel.create();
  
  return { success: true };
}
