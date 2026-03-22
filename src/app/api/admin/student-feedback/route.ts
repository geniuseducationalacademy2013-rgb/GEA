import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await query(
      "SELECT id, student_name, feedback, media_type, media_url, thumbnail_url, sort_order FROM student_feedback ORDER BY sort_order ASC, id ASC"
    );
    return NextResponse.json({ items: result.rows });
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    student_name?: string;
    feedback?: string;
    media_type?: "image" | "youtube";
    media_url?: string;
    thumbnail_url?: string | null;
  } | null;

  if (!body || !body.student_name || !body.feedback || !body.media_type || !body.media_url) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Get max sort_order
    const maxRes = await query(
      "SELECT COALESCE(MAX(sort_order), 0) as max FROM student_feedback"
    );
    const nextSort = ((maxRes.rows as any[])[0]?.max ?? 0) + 1;

    const result = await query(
      "INSERT INTO student_feedback (student_name, feedback, media_type, media_url, thumbnail_url, sort_order) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [body.student_name, body.feedback, body.media_type, body.media_url, body.thumbnail_url || null, nextSort]
    );

    return NextResponse.json({ id: (result.rows as any[])[0]?.id });
  } catch {
    return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 });
  }
}
