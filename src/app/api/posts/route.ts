import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { gigsDescription, experienceDescription, imageUrl } = body;

    if (!gigsDescription || !experienceDescription) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        authorId: userId,
        gigsDescription,
        experienceDescription,
        imageUrl: imageUrl || undefined,
      }
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("[POST_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
