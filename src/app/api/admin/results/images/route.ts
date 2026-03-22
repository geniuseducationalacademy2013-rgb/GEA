import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    resultId?: number;
    url?: string;
  } | null;

  const resultId = body?.resultId;
  const url = body?.url?.trim();

  if (!resultId || !url) {
    return NextResponse.json({ error: "Result ID and URL are required" }, { status: 400 });
  }

  try {
    // Get max sort_order
    const maxOrder = await query(
      "SELECT COALESCE(MAX(sort_order), 0) as max FROM result_images"
    );
    const nextOrder = ((maxOrder.rows as any[])[0]?.max ?? 0) + 1;

    const res = await query(
      "INSERT INTO result_images (result_id, url, sort_order) VALUES ($1, $2, $3) RETURNING id",
      [resultId, url, nextOrder]
    );
    return NextResponse.json({ id: (res.rows as any[])[0]?.id });
  } catch {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}
