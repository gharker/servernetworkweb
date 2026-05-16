import { NextResponse } from "next/server";
import { getStreamToken } from "@/actions/stream";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { token } = await getStreamToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating stream token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
