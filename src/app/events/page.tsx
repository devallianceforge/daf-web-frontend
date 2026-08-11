import type { Metadata } from 'next';
import { EVENTS } from '@/data/events';
import { EventCard } from '@/components/EventCard';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Events — Dev Alliance Forge',
  description: 'Hackathons, meetups, and build-nights hosted by the DAF community.'
};

export default function EventsPage() {
  return (
    <section className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 max-w-[640px]">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            Events
          </span>
          <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            Build together, in person and online.
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {EVENTS.map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.08}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
