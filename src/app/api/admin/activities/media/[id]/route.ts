import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// DELETE - Delete media
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM activity_media WHERE id = $1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
