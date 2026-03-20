import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      "SELECT id, type, url, thumbnail, sort_order FROM gallery ORDER BY sort_order ASC, id DESC"
    );
    return NextResponse.json({ items: result.rows });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
