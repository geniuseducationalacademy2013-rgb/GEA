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

    const allResult = await query(
      "SELECT id, sort_order FROM student_feedback ORDER BY sort_order ASC, id ASC"
    );
    const all = allResult.rows as { id: number; sort_order: number }[];

    const currentIndex = all.findIndex((s) => s.id === Number(id));
    if (currentIndex === -1) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= all.length) {
      return NextResponse.json({ error: "Cannot move in that direction" }, { status: 400 });
    }

    const current = all[currentIndex];
    const swap = all[swapIndex];

    await query("UPDATE student_feedback SET sort_order = $1 WHERE id = $2", [swap.sort_order, current.id]);
    await query("UPDATE student_feedback SET sort_order = $1 WHERE id = $2", [current.sort_order, swap.id]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to reorder feedback" }, { status: 500 });
  }
}
