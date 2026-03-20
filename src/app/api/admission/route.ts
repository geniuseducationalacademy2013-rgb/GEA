import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact_details, subject, standard, board, location, school_name, last_year_percentage } = body;

    const result = await query(`
      INSERT INTO admissions (name, contact_details, subject, standard, board, location, school_name, last_year_percentage)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `, [name, contact_details, subject || null, standard, board, location || null, school_name || null, last_year_percentage || null]);

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving admission:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
