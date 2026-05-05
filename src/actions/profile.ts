"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function hasProfile() {
  const { userId } = await auth();
  if (!userId) return false;
  
  const profile = await prisma.profile.findUnique({
    where: { clerkId: userId },
  });
  
  return !!profile;
}

export async function createProfile(data: {
  accountType: "SERVER" | "RESTAURANT";
  username: string;
  email?: string;
  avatarUrl?: string;
  restaurantName?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  const existing = await prisma.profile.findUnique({
    where: { clerkId: userId }
  });
  
  if (existing) {
    throw new Error("Profile already exists");
  }
  
  // Check if username is taken
  const usernameTaken = await prisma.profile.findUnique({
    where: { username: data.username }
  });
  
  if (usernameTaken) {
    throw new Error("Username is already taken");
  }
  
  const profile = await prisma.profile.create({
    data: {
      clerkId: userId,
      accountType: data.accountType,
      username: data.username,
      email: data.email,
      avatarUrl: data.avatarUrl,
      restaurantName: data.accountType === "RESTAURANT" ? data.restaurantName : null,
    }
  });
  
  const { revalidatePath } = require("next/cache");
  revalidatePath("/", "layout");
  
  return profile;
}
