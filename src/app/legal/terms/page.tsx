import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms of Use — Dev Alliance Forge',
  description: 'The terms that govern your use of the Dev Alliance Forge website.'
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: 'Acceptance',
    body: 'By accessing or using this website you agree to these terms. If you do not agree, do not use the site.'
  },
  {
    title: 'An informational site',
    body: 'The site presents news, events, workshops, projects, and community information from Dev Alliance Forge (DAF), a volunteer-run community. Some content — including events, workshops, projects, and team profiles — is sample placeholder content until the real material is published. Do not rely on sample listings as confirmed commitments.'
  },
  {
    title: 'Community channels',
    body: 'DAF community channels such as Discord, WhatsApp, Telegram, and GitHub are operated through third-party platforms. Your participation in those channels is governed by each platform&apos;s terms of service and by the DAF community rules in effect on that channel.'
  },
  {
    title: 'Intellectual property',
    body: 'The DAF name, logo, and design are the property of Dev Alliance Forge and its community. You may not reuse the branding without permission. Content posted by community members remains owned by its authors.'
  },
  {
    title: 'Events and registration',
    body: 'Registering interest in an event or workshop does not guarantee a place. The DAF organizers decide availability and final details, and event dates, formats, and venues may change without prior notice.'
  },
  {
    title: 'Limitation of liability',
    body: 'The site is provided as-is, without warranties of any kind. To the maximum extent permitted by law, DAF is not liable for any damages arising from your use of the site, participation in community activities, or reliance on its content.'
  },
  {
    title: 'Contact',
    body: 'Questions about these terms can be sent to the contact address below.'
  }
];

export default function TermsPage() {
  return (
    <main className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[880px] px-6">
        <Reveal className="mb-14">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            Legal
          </span>
          <h1 className="mb-6 font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            Terms of Use
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
            This is sample terms text written for the DAF website build — not legal advice. Have
            the final wording reviewed before launch.
          </p>
          <p className="mt-3 font-mono text-xs text-text-dim">
            Contact: <a className="text-mint" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </Reveal>
      </div>
    </main>
  );
}