import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

// POST - Add media to activity
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activityId, type, url } = body;

    // Get max sort_order for this activity
    const maxResult = await query(
      "SELECT COALESCE(MAX(sort_order), 0) as max FROM activity_media WHERE activity_id = $1",
      [activityId]
    );
    const nextOrder = ((maxResult.rows as any[])[0]?.max ?? 0) + 1;

    const result = await query(
      "INSERT INTO activity_media (activity_id, type, url, sort_order) VALUES ($1, $2, $3, $4) RETURNING id, type, url, sort_order",
      [activityId, type, url, nextOrder]
    );

    return NextResponse.json({ id: (result.rows as any[])[0]?.id });
  } catch {
    return NextResponse.json({ error: "Failed to add media" }, { status: 500 });
  }
}
