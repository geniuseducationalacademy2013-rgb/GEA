import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// PUT - Update result
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { student_name, percentage, year, description, image_url } = body;

    const result = await query(`
      UPDATE results
      SET student_name = $1, percentage = $2, year = $3, description = $4, image_url = $5
      WHERE id = $6
      RETURNING id, student_name, percentage, year, description, image_url
    `, [student_name, percentage, year, description || null, image_url || null, params.id]);

    return NextResponse.json({ success: true, result: result.rows[0] });
  } catch (error) {
    console.error('Error updating result:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// DELETE - Delete result
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM results WHERE id = $1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting result:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
