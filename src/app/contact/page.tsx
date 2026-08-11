import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { CommunitySection } from '@/components/CommunitySection';
import { Reveal } from '@/components/Reveal';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact — Dev Alliance Forge',
  description: 'Get in touch with Dev Alliance Forge, or join us on any of our community channels.'
};

export default function ContactPage() {
  return (
    <div className="pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6 pb-[80px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
              $ daf --join
            </span>
            <h1 className="mb-6 font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
              Let&apos;s build something together.
            </h1>
            <p className="mb-8 max-w-md text-text-muted">
              Have a question, a partnership idea, or want to speak at a DAF event? Send a message, or
              email us directly at{' '}
              <a href={`mailto:${SITE.email}`} className="text-mint">
                {SITE.email}
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
      <CommunitySection compact />
    </div>
  );
}
