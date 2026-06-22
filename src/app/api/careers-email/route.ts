import { NextRequest, NextResponse } from 'next/server';
import { sendCareersEmails } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File;

    if (!email || !name || !file) {
      return NextResponse.json({ error: 'Name, email, and resume are required' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Call the email service
    const result = await sendCareersEmails(
      { name, email, message: message || undefined },
      file.name,
      buffer
    );

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Application submitted successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
  } catch (error) {
    console.error('API /careers-email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
