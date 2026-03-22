import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await req.json().catch(() => null)) as { is_active?: boolean } | null;

    if (body?.is_active === undefined) {
      return NextResponse.json({ error: "is_active is required" }, { status: 400 });
    }

    await query(
      "UPDATE quick_needs SET is_active = $1 WHERE id = $2",
      [body.is_active, id]
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update quick need" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query("DELETE FROM quick_needs WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete quick need" }, { status: 500 });
  }
}
