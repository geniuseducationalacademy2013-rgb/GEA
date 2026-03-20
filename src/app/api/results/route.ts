import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT id, student_name, percentage, year, description, image_url
      FROM results
      ORDER BY percentage DESC, year DESC
    `);

    return NextResponse.json({ results: result.rows });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
