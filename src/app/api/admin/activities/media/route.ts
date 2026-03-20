import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST - Add media to activity
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activity_id, type, url, thumbnail_url } = body;

    const result = await query(`
      INSERT INTO activity_media (activity_id, type, url, thumbnail_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id, type, url, thumbnail_url
    `, [activity_id, type, url, thumbnail_url || null]);

    return NextResponse.json({ success: true, media: result.rows[0] });
  } catch (error) {
    console.error('Error adding media:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
