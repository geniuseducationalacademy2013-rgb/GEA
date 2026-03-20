import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all activities with media
export async function GET() {
  try {
    const activitiesResult = await query(`
      SELECT a.id, a.name, a.description
      FROM activities a
      ORDER BY a.id DESC
    `);

    const activities = await Promise.all(
      activitiesResult.rows.map(async (activity) => {
        const mediaResult = await query(`
          SELECT id, type, url, thumbnail_url
          FROM activity_media
          WHERE activity_id = $1
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
