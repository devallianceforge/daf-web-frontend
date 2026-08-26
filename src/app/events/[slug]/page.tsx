import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EVENTS, getEventBySlug } from '@/data/events';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { ArrowRightIcon } from '@/components/icons';

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title} — Dev Alliance Forge`,
    description: event.description
  };
}

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="pt-[160px]">
      <div className="mx-auto max-w-[900px] px-6 pb-[120px]">
        <Reveal>
          <Link href="/events" className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-text-dim hover:text-mint">
            <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
            Back to events
          </Link>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="rounded-lg border border-border-hi bg-surface px-3 py-1.5 text-center font-mono text-xs">
              {event.dateLabel.month} <b className="text-mint">{event.dateLabel.day}</b>
            </span>
            <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
              {event.format}
            </span>
            {event.location && (
              <span className="font-mono text-[13px] text-text-dim">{event.location}</span>
            )}
          </div>

          <h1 className="mb-6 font-display text-[clamp(30px,4.5vw,48px)] font-semibold">
            {event.title}
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-text-muted">{event.description}</p>

          <div className="mb-10 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-blue/25 bg-blue/10 px-2.5 py-1 font-mono text-[11px] text-blue"
              >
                {tag}
              </span>
            ))}
          </div>

          <MagneticButton href="/contact">Register interest</MagneticButton>
        </Reveal>

        {event.agenda && (
          <Reveal delay={0.1} className="mt-16 border-t border-border pt-12">
            <h2 className="mb-6 font-display text-2xl font-semibold">Agenda</h2>
            <div className="flex flex-col gap-4">
              {event.agenda.map((item) => (
                <div key={item.time} className="flex gap-6 rounded-daf border border-border bg-surface p-5">
                  <span className="w-28 shrink-0 font-mono text-xs text-mint">{item.time}</span>
                  <span className="text-sm text-text-muted">{item.title}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {event.speakers && (
          <Reveal delay={0.15} className="mt-12 border-t border-border pt-12">
            <h2 className="mb-6 font-display text-2xl font-semibold">Hosted by</h2>
            <div className="flex flex-wrap gap-4">
              {event.speakers.map((speaker) => (
                <div key={speaker.name} className="rounded-daf border border-border bg-surface px-5 py-4">
                  <div className="font-semibold">{speaker.name}</div>
                  <div className="text-xs text-text-dim">{speaker.role}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
