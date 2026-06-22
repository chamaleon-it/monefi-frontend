import { NextRequest, NextResponse } from 'next/server';
import { sendThankYouEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Call the email service
    const result = await sendThankYouEmail(email, firstName || '', lastName || '');

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Email queued successfully' });
    } else {
      // Even if it failed, we return a 500 for the API route.
      // The frontend will catch and ignore it to not block the user.
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('API /send-email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
