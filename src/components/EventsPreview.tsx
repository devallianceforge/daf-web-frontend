import { EVENTS } from '@/data/events';
import { EventCard } from './events/EventCard';
import { Reveal } from './Reveal';
import { MagneticButton } from './MagneticButton';

export function EventsPreview() {
  return (
    <section id="events" className="py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
            Upcoming events
          </h2>
          <p className="max-w-[420px] text-[15px] text-text-muted">
            Hackathons, meetups, and build-nights — see what&apos;s next.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {EVENTS.map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.08}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <MagneticButton href="/events" variant="ghost" size="sm">
            View all events
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
