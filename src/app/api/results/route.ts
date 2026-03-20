import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const results = await query(
      "SELECT id FROM results ORDER BY id DESC"
    );

    const images = await query(
      "SELECT id, result_id, url, sort_order FROM result_images ORDER BY sort_order ASC, id ASC"
    );

    const imagesByResult = new Map<number, { id: number; url: string; sort_order: number }[]>();
    for (const img of images.rows as { id: number; result_id: number; url: string; sort_order: number }[]) {
      const arr = imagesByResult.get(img.result_id) || [];
      arr.push({ id: img.id, url: img.url, sort_order: img.sort_order });
      imagesByResult.set(img.result_id, arr);
    }

    const payload = (results.rows as { id: number }[]).map((r) => ({
      id: r.id,
      images: imagesByResult.get(r.id) || [],
    }));

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json([], { status: 200 });
  }
}
