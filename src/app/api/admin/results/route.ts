import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all results
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

// POST - Create new result
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { student_name, percentage, year, description, image_url } = body;

    const result = await query(`
      INSERT INTO results (student_name, percentage, year, description, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, student_name, percentage, year, description, image_url
    `, [student_name, percentage, year, description || null, image_url || null]);

    return NextResponse.json({ success: true, result: result.rows[0] });
  } catch (error) {
    console.error('Error creating result:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
