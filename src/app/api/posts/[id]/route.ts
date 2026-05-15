import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { gigsDescription, experienceDescription, imageUrl } = body;

    if (!gigsDescription || !experienceDescription) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verify post belongs to user
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== userId) {
      return new NextResponse("Unauthorized or post not found", { status: 403 });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        gigsDescription,
        experienceDescription,
        ...(imageUrl !== undefined && { imageUrl }),
      }
    });

    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error("[POST_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify post belongs to user
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== userId) {
      return new NextResponse("Unauthorized or post not found", { status: 403 });
    }

    await prisma.post.delete({
      where: { id },
    });

    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("[POST_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
