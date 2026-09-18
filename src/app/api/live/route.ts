import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { toggleServerLiveStatus, getAvailableServers } from "@/actions/live";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await getAvailableServers();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("[LIVE_GET_ERROR]", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch live servers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Body is optional
    }

    const { latitude, longitude } = body || {};
    const coords =
      typeof latitude === "number" && typeof longitude === "number"
        ? { latitude, longitude }
        : undefined;

    const result = await toggleServerLiveStatus(coords);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[LIVE_POST_ERROR]", err);
    return NextResponse.json(
      { error: err.message || "Failed to toggle live status" },
      { status: 500 }
    );
  }
}
