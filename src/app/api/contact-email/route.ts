import { NextRequest, NextResponse } from 'next/server';
import { sendContactUsEmails } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, message } = body;

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Email and first name are required' }, { status: 400 });
    }

    // Call the email service to send to both admin and client
    const result = await sendContactUsEmails({
      firstName,
      lastName: lastName || '',
      email,
      phoneNumber: phoneNumber || '',
      message: message || ''
    });

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Emails queued successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }
  } catch (error) {
    console.error('API /contact-email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
