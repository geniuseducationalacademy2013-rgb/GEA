import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await req.json().catch(() => null)) as { direction?: "up" | "down" } | null;
    const direction = body?.direction;

    if (!direction) {
      return NextResponse.json({ error: "Direction is required" }, { status: 400 });
    }

    // Get the media item to find its activity_id
    const mediaResult = await query(
      "SELECT id, activity_id, sort_order FROM activity_media WHERE id = $1",
      [id]
    );
    const media = (mediaResult.rows as any[])[0];
    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Get all media for this activity ordered by sort_order
    const allResult = await query(
      "SELECT id, sort_order FROM activity_media WHERE activity_id = $1 ORDER BY sort_order ASC, id ASC",
      [media.activity_id]
    );
    const all = allResult.rows as { id: number; sort_order: number }[];

    const currentIndex = all.findIndex((m) => m.id === Number(id));
    if (currentIndex === -1) {
      return NextResponse.json({ error: "Media not found in list" }, { status: 404 });
    }

    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= all.length) {
      return NextResponse.json({ error: "Cannot move in that direction" }, { status: 400 });
    }

    const current = all[currentIndex];
    const swap = all[swapIndex];

    // Swap sort_order values
    await query("UPDATE activity_media SET sort_order = $1 WHERE id = $2", [swap.sort_order, current.id]);
    await query("UPDATE activity_media SET sort_order = $1 WHERE id = $2", [current.sort_order, swap.id]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to reorder media" }, { status: 500 });
  }
}
