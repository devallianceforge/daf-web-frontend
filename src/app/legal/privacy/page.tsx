import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy — Dev Alliance Forge',
  description: 'How Dev Alliance Forge collects, uses, and protects your information.'
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: 'What we collect',
    body: 'The contact form asks for your name, your email address, and the message you send. The event registration form asks for your name, your email address, and which event you are registering interest in. The workshop registration form also asks for your phone number and experience level, plus an optional GitHub/portfolio link and learning goal. We do not run account systems, so we only hold the information you choose to submit through these forms.'
  },
  {
    title: 'How we use it',
    body: 'We use the details you submit to respond to your message or to follow up about event and workshop registration. Submissions are delivered by email to the DAF team. If no email provider is configured on the server, a submission is logged server-side for local development and is not sent anywhere.'
  },
  {
    title: 'Public data from GitHub',
    body: 'The /projects page shows public statistics about the DAF GitHub organization. That data is fetched directly from GitHub&apos;s public API when the page is requested and is subject to GitHub&apos;s own terms and privacy practices.'
  },
  {
    title: 'External community channels',
    body: 'Links to Discord, WhatsApp, Telegram, and other community channels leave this site. Anything you share there is governed by that platform&apos;s own terms and privacy policies, not this one.'
  },
  {
    title: 'Cookies and trackers',
    body: 'This site does not set tracking cookies and does not load third-party analytics or advertising scripts in its current version.'
  },
  {
    title: 'Your choices',
    body: 'You can ask us to see, correct, or delete any personal information you have sent us by emailing the contact address below at any time.'
  },
  {
    title: 'Changes to this policy',
    body: 'If we change how this site handles data, we will update this page. Continued use of the site after a change means you accept the updated policy.'
  }
];

export default function PrivacyPage() {
  return (
    <main className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[880px] px-6">
        <Reveal className="mb-14">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            Legal
          </span>
          <h1 className="mb-6 font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs uppercase tracking-wider text-text-dim">
            Last updated: August 30, 2026
          </p>
        </Reveal>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.03}>
              <section>
                <h2 className="mb-3 flex items-baseline gap-3 font-display text-xl font-semibold">
                  <span className="font-mono text-xs text-mint">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                <p className="pl-7 text-[15px] leading-7 text-text-muted">{section.body}</p>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-daf border border-border bg-surface p-7">
          <p className="text-sm leading-6 text-text-dim">
            This is sample policy text written for the DAF website build. It accurately describes
            the data handling implemented today, but it is not legal advice — have the final
            wording reviewed before launch.
          </p>
          <p className="mt-3 font-mono text-xs text-text-dim">
            Contact: <a className="text-mint" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </Reveal>
      </div>
    </main>
  );
}