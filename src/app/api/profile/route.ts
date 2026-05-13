import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createProfile } from "@/actions/profile";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const profile = await createProfile(body);
    
    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create profile" }, { status: 400 });
  }
}
