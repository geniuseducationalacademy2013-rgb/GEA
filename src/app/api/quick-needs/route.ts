import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const now = new Date().toISOString().split('T')[0];
    
    // Get active tagline
    const taglineResult = await query(
      `SELECT id, content FROM quick_needs 
       WHERE type = 'tagline' AND is_active = true 
       AND start_date <= $1 AND end_date >= $1
       ORDER BY created_at DESC LIMIT 1`,
      [now]
    );

    // Get active popup (image or video)
    const popupResult = await query(
      `SELECT id, type, media_url FROM quick_needs 
       WHERE type IN ('image', 'video') AND is_active = true 
       AND start_date <= $1 AND end_date >= $1
       ORDER BY created_at DESC LIMIT 1`,
      [now]
    );

    return NextResponse.json({
      tagline: taglineResult.rows[0] || null,
      popup: popupResult.rows[0] || null,
    });
  } catch (error) {
    console.error('Error fetching quick needs:', error);
    return NextResponse.json({ tagline: null, popup: null }, { status: 200 });
  }
}
