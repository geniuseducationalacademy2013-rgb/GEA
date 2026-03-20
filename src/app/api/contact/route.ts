import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { buildBrandedHtmlEmail, sendBrevoMailWithOptions } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact_details, subject, standard, board, query: userQuery } = body;

    const result = await query(`
      INSERT INTO contact_queries (name, contact_details, subject, standard, board, query)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [name, contact_details, subject || null, standard || null, board || null, userQuery || null]);

    const mailText = [
      'New Contact Us Submission',
      '',
      `Name: ${name || ''}`,
      `Phone: ${contact_details || ''}`,
      `Subject: ${subject || ''}`,
      `Standard: ${standard || ''}`,
      `Board: ${board || ''}`,
      `Query: ${userQuery || ''}`,
    ].join('\n');

    const { html: mailHtml, attachments } = buildBrandedHtmlEmail({
      title: 'New Contact Us Submission',
      subtitle: 'Contact Us Form',
      fields: [
        { label: 'Name', value: name || '' },
        { label: 'Phone Number', value: contact_details || '' },
        { label: 'Subject', value: subject || '' },
        { label: 'Standard', value: standard || '' },
        { label: 'Board', value: board || '' },
        { label: 'Query', value: userQuery || '' },
      ],
    });

    try {
      await sendBrevoMailWithOptions({
        subject: 'Contact Us Form - New Submission',
        text: mailText,
        html: mailHtml,
        attachments,
      });
    } catch (emailError) {
      console.error('Error sending contact email:', emailError);
    }

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving contact query:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
