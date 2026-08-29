import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EVENTS, getEventBySlug } from '@/data/events';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';
import { EventRegistrationForm } from '@/components/events/event-details/EventRegistrationForm';

export function generateStaticParams() {
  return EVENTS.map((event) => ({
    slug: event.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {};
  }

  return {
    title: `Register — ${event.title} — Dev Alliance Forge`,
    description: `Register your interest for ${event.title}.`
  };
}

export default async function EventRegistrationPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="pb-[120px] pt-[140px]">
      <div className="mx-auto max-w-[980px] px-6">
        <Reveal>
          <Link
            href={`/events/${event.slug}`}
            className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] text-text-dim transition-colors hover:text-mint"
          >
            <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
            back_to_event()
          </Link>
        </Reveal>

        <Reveal>
          <section className="relative mb-8 overflow-hidden rounded-[28px] border border-border bg-surface px-6 py-8 sm:px-9 sm:py-10">
            <div
              className="pointer-events-none absolute right-[-130px] top-[-150px] h-[340px] w-[340px] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)'
              }}
            />

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />

            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-mint/20 bg-mint/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                  Event registration
                </span>

                <span className="rounded-full border border-border bg-[#09090f]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {event.format}
                </span>
              </div>

              <h1 className="max-w-[760px] font-display text-[clamp(32px,4.5vw,50px)] font-semibold leading-[1.06] tracking-[-0.03em]">
                Register for {event.title}
              </h1>

              <p className="mt-5 max-w-[680px] text-[15px] leading-7 text-text-muted">
                Submit your interest below and the DAF team can follow up with
                registration details, availability, or next steps.
              </p>

              <div className="mt-7 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-dim">
                    Date
                  </div>

                  <div className="mt-2 text-[13px] leading-5 text-text">
                    {formattedDate}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-dim">
                    Format
                  </div>

                  <div className="mt-2 text-[13px] text-text">
                    {event.format}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-dim">
                    Location
                  </div>

                  <div className="mt-2 text-[13px] leading-5 text-text">
                    {event.location ?? 'To be announced'}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="rounded-[28px] border border-border bg-surface p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <div className="font-mono text-[11px] text-mint">
                $ registration --start
              </div>

              <h2 className="mt-3 font-display text-[28px] font-semibold">
                Tell us about yourself.
              </h2>

              <p className="mt-2 max-w-[620px] text-[14px] leading-6 text-text-muted">
                Required fields help the DAF team understand who is interested
                and how to contact you.
              </p>
            </div>

            <EventRegistrationForm
              eventTitle={event.title}
              eventSlug={event.slug}
              eventDate={event.date}
            />
          </section>
        </Reveal>
      </div>
    </main>
  );
}