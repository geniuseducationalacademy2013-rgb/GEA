import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// DELETE - Delete media
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query('DELETE FROM activity_media WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
