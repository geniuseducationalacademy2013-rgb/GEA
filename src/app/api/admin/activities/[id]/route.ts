import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// PUT - Update activity
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { name, description } = body;

    const { id } = await params;

    const result = await query(`
      UPDATE activities
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING id, name, description
    `, [name, description, id]);

    return NextResponse.json({ success: true, activity: result.rows[0] });
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// DELETE - Delete activity
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query('DELETE FROM activities WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
