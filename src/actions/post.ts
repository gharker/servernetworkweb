"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function createPost(data: {
  gigsDescription: string;
  experienceDescription: string;
  imageUrl?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  const post = await prisma.post.create({
    data: {
      authorId: userId,
      gigsDescription: data.gigsDescription,
      experienceDescription: data.experienceDescription,
      imageUrl: data.imageUrl,
    }
  });
  
  const { revalidatePath } = require("next/cache");
  revalidatePath("/", "layout");
  
  return post;
}
