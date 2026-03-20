import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all activities with media
export async function GET() {
  try {
    const activitiesResult = await query(`
      SELECT a.id, a.name, a.description, a.sort_order
      FROM activities a
      ORDER BY a.sort_order ASC, a.id ASC
    `);

    const activities = await Promise.all(
      activitiesResult.rows.map(async (activity) => {
        const mediaResult = await query(`
          SELECT id, type, url, thumbnail_url, sort_order
          FROM activity_media
          WHERE activity_id = $1
          ORDER BY sort_order ASC, id ASC
        `, [activity.id]);

        return {
          ...activity,
          media: mediaResult.rows
        };
      })
    );

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ activities: [] }, { status: 500 });
  }
}

// POST - Create new activity
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    const result = await query(`
      INSERT INTO activities (name, description)
      VALUES ($1, $2)
      RETURNING id, name, description
    `, [name, description || null]);

    return NextResponse.json({ success: true, activity: result.rows[0] });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
