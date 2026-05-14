import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch all posts from RESTAURANT accounts
    const posts = await prisma.post.findMany({
      where: {
        author: {
          accountType: "RESTAURANT"
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        author: {
          select: {
            id: true,
            clerkId: true,
            username: true,
            accountType: true,
            avatarUrl: true,
            latitude: true,
            longitude: true,
            restaurantName: true,
            createdAt: true,
          }
        }
      }
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[RESTAURANT_FEED_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
