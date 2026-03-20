import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact_details, subject, standard, board, query: userQuery } = body;

    const result = await query(`
      INSERT INTO contact_queries (name, contact_details, subject, standard, board, query)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [name, contact_details, subject || null, standard || null, board || null, userQuery || null]);

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving contact query:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
