"use server";

import { revalidatePath } from "next/cache";
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
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  const existing = await prisma.profile.findUnique({
    where: { clerkId: userId }
  });
  
  if (existing) {
    return { error: "Profile already exists" };
  }
  
  // Check if username is taken
  const usernameTaken = await prisma.profile.findUnique({
    where: { username: data.username }
  });
  
  if (usernameTaken) {
    return { error: "Username is already taken" };
  }
  
  let latitude: number | null = null;
  let longitude: number | null = null;

  const fullAddress = data.streetAddress && data.city && data.state && data.zipCode 
    ? `${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}` 
    : null;

  if (fullAddress) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`, {
        headers: { "User-Agent": "ServerNetwork/1.0" }
      });
      const geocode = await res.json();
      if (geocode && geocode.length > 0) {
        latitude = parseFloat(geocode[0].lat);
        longitude = parseFloat(geocode[0].lon);
      }
    } catch (err) {
      console.error("Geocoding failed", err);
    }
  }

  const profile = await prisma.profile.create({
    data: {
      clerkId: userId,
      accountType: data.accountType,
      username: data.username,
      email: data.email,
      avatarUrl: data.avatarUrl,
      restaurantName: data.accountType === "RESTAURANT" ? data.restaurantName : null,
      streetAddress: data.accountType === "RESTAURANT" ? data.streetAddress : null,
      city: data.accountType === "RESTAURANT" ? data.city : null,
      state: data.accountType === "RESTAURANT" ? data.state : null,
      zipCode: data.accountType === "RESTAURANT" ? data.zipCode : null,
      latitude,
      longitude,
    }
  });
  
  revalidatePath("/", "layout");
  
  return profile;
}

export async function updateProfile(data: {
  username?: string;
  email?: string;
  avatarUrl?: string;
  restaurantName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  if (data.username) {
    const existing = await prisma.profile.findUnique({
      where: { username: data.username }
    });
    
    if (existing && existing.clerkId !== userId) {
      return { error: "Username is already taken" };
    }
  }
  
  let latitude: number | undefined;
  let longitude: number | undefined;

  const isAnyAddressFieldProvided = 
    data.streetAddress !== undefined || 
    data.city !== undefined || 
    data.state !== undefined || 
    data.zipCode !== undefined;

  if (isAnyAddressFieldProvided) {
    // Check if the user is clearing the address
    if (!data.streetAddress && !data.city && !data.state && !data.zipCode) {
      latitude = null as any; 
      longitude = null as any;
    } else {
      const fullAddress = `${data.streetAddress || ''}, ${data.city || ''}, ${data.state || ''} ${data.zipCode || ''}`;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`, {
          headers: { "User-Agent": "ServerNetwork/1.0" }
        });
        const geocode = await res.json();
        if (geocode && geocode.length > 0) {
          latitude = parseFloat(geocode[0].lat);
          longitude = parseFloat(geocode[0].lon);
        }
      } catch (err) {
        console.error("Geocoding failed", err);
      }
    }
  }

  const updated = await prisma.profile.update({
    where: { clerkId: userId },
    data: {
      username: data.username !== undefined ? data.username : undefined,
      email: data.email !== undefined ? data.email : undefined,
      avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : undefined,
      restaurantName: data.restaurantName !== undefined ? data.restaurantName : undefined,
      streetAddress: data.streetAddress !== undefined ? data.streetAddress : undefined,
      city: data.city !== undefined ? data.city : undefined,
      state: data.state !== undefined ? data.state : undefined,
      zipCode: data.zipCode !== undefined ? data.zipCode : undefined,
      ...(latitude !== undefined && { latitude }),
      ...(longitude !== undefined && { longitude }),
    }
  });
  
  revalidatePath("/", "layout");
  
  return updated;
}
