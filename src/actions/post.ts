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

export async function deletePost(postId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  // Verify the post belongs to the user
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.authorId !== userId) {
    throw new Error("Unauthorized or post not found");
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  const { revalidatePath } = require("next/cache");
  revalidatePath("/", "layout");
}

export async function updatePost(
  postId: string,
  data: {
    gigsDescription: string;
    experienceDescription: string;
    imageUrl?: string | null;
  }
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  // Verify the post belongs to the user
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.authorId !== userId) {
    throw new Error("Unauthorized or post not found");
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      gigsDescription: data.gigsDescription,
      experienceDescription: data.experienceDescription,
      ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
    }
  });

  const { revalidatePath } = require("next/cache");
  revalidatePath("/", "layout");
  
  return updatedPost;
}
