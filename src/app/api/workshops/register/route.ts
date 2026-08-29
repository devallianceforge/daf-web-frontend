import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type WorkshopRegistrationPayload = {
  workshopTitle?: string;
  workshopSlug?: string;
  workshopDate?: string;

  name?: string;
  email?: string;
  phone?: string;
  experience?: string;
  github?: string;
  goal?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WorkshopRegistrationPayload;

    const workshopTitle = body.workshopTitle?.trim();
    const workshopSlug = body.workshopSlug?.trim();
    const workshopDate = body.workshopDate?.trim();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const experience = body.experience?.trim();
    const github = body.github?.trim();
    const goal = body.goal?.trim();

    if (
      !workshopTitle ||
      !workshopSlug ||
      !name ||
      !email ||
      !phone ||
      !experience
    ) {
      return NextResponse.json(
        {
          message: 'Please complete all required fields.'
        },
        {
          status: 400
        }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        {
          message: 'Please enter a valid email address.'
        },
        {
          status: 400
        }
      );
    }

    if (github && github.length > 500) {
      return NextResponse.json(
        {
          message: 'GitHub or portfolio URL is too long.'
        },
        {
          status: 400
        }
      );
    }

    if (goal && goal.length > 3000) {
      return NextResponse.json(
        {
          message: 'Learning goal is too long.'
        },
        {
          status: 400
        }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    const contactEmail =
      process.env.CONTACT_TO_EMAIL ||
      'devallianceforge@gmail.com';

    const registrationText = [
      'New DAF workshop registration',
      '',
      'WORKSHOP',
      `Title: ${workshopTitle}`,
      `Slug: ${workshopSlug}`,
      `Date: ${workshopDate || 'Not specified'}`,
      '',
      'PARTICIPANT',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Experience: ${experience}`,
      `GitHub / Portfolio: ${github || 'Not provided'}`,
      '',
      'LEARNING GOAL',
      goal || 'Not provided'
    ].join('\n');

    /*
     * Keep local development usable even when Resend
     * credentials are not configured.
     */
    if (!resendApiKey) {
      console.log('Workshop registration received:');
      console.log(registrationText);

      return NextResponse.json({
        ok: true,
        delivered: false
      });
    }

    const resendResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'DAF Workshops <onboarding@resend.dev>',
          to: [contactEmail],
          reply_to: email,
          subject: `Workshop registration: ${workshopTitle} — ${name}`,
          text: registrationText
        })
      }
    );

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();

      console.error(
        'Resend workshop registration error:',
        errorBody
      );

      return NextResponse.json(
        {
          message:
            'Registration was received, but the email could not be delivered.'
        },
        {
          status: 502
        }
      );
    }

    return NextResponse.json({
      ok: true,
      delivered: true
    });
  } catch (error) {
    console.error('Workshop registration error:', error);

    return NextResponse.json(
      {
        message:
          'Something went wrong while submitting your registration.'
      },
      {
        status: 500
      }
    );
  }
}