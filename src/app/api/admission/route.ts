import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { buildBrandedHtmlEmail, sendBrevoMailWithOptions } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact_details, subject, standard, board, location, school_name, last_year_percentage } = body;

    const result = await query(`
      INSERT INTO admissions (name, contact_details, subject, standard, board, location, school_name, last_year_percentage)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `, [name, contact_details, subject || null, standard, board, location || null, school_name || null, last_year_percentage || null]);

    const mailText = [
      'New Admission Form Submission',
      '',
      `Name: ${name || ''}`,
      `Phone: ${contact_details || ''}`,
      `Standard: ${standard || ''}`,
      `Board: ${board || ''}`,
      `Subject: ${subject || ''}`,
      `Location: ${location || ''}`,
      `School Name: ${school_name || ''}`,
      `Last Year Percentage: ${last_year_percentage || ''}`,
    ].join('\n');

    const { html: mailHtml, attachments } = buildBrandedHtmlEmail({
      title: 'New Admission Form Submission',
      subtitle: 'Admission Form',
      fields: [
        { label: 'Name', value: name || '' },
        { label: 'Phone Number', value: contact_details || '' },
        { label: 'Standard', value: standard || '' },
        { label: 'Board', value: board || '' },
        { label: 'Subject', value: subject || '' },
        { label: 'Location', value: location || '' },
        { label: 'School Name', value: school_name || '' },
        { label: 'Last Year Percentage', value: last_year_percentage || '' },
      ],
    });

    try {
      await sendBrevoMailWithOptions({
        subject: 'Admission Form - New Submission',
        text: mailText,
        html: mailHtml,
        attachments,
      });
    } catch (emailError) {
      console.error('Error sending admission email:', emailError);
    }

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving admission:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
