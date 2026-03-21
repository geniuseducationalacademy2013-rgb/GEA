import { NextResponse } from "next/server";
import { query } from "@/lib/db";

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS student_feedback (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      feedback TEXT NOT NULL,
      media_type VARCHAR(50) NOT NULL,
      media_url TEXT NOT NULL,
      thumbnail_url TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function GET() {
  try {
    await ensureTable();
    const res = await query(
      "SELECT id, student_name, feedback, media_type, media_url, thumbnail_url, sort_order FROM student_feedback ORDER BY sort_order ASC, id ASC"
    );
    return NextResponse.json({ items: res.rows });
  } catch (error) {
    console.error("Error fetching student feedback:", error);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
