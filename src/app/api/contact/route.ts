import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are all required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }
  // Basic message-length guard against obvious spam/script abuse.
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'devallianceforge@gmail.com';

  if (!resendApiKey) {
    // No email provider configured yet — log server-side so local/dev submissions are still
    // visible, and let the request succeed so the UI's success state can be exercised end to end.
    // Set RESEND_API_KEY (and optionally CONTACT_TO_EMAIL) in your environment to send real email.
    console.log('[contact] RESEND_API_KEY not set — logging submission instead of sending:', {
      name,
      email,
      message
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'DAF Website <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email,
        subject: `New contact form message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`
      })
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[contact] Resend API error:', detail);
      return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] Unexpected error sending email:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}
