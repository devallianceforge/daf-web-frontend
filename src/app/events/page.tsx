import type { Metadata } from 'next';
import { EVENTS } from '@/data/events';
import { Reveal } from '@/components/Reveal';
import { EventsHero } from '@/components/events/EventsHero';
import { FeaturedEventCard } from '@/components/events/FeaturedEventCard';
import { EventExplorer } from '@/components/events/EventExplorer';
import { PastEvents } from '@/components/events/PastEvents';
import { WhyAttendEvents } from '@/components/events/WhyAttendEvents';
import { EventsCTA } from '@/components/events/EventsCTA';

export const metadata: Metadata = {
  title: 'Events — Dev Alliance Forge',
  description:
    'Hackathons, meetups, build nights, and technical sessions hosted by the Dev Alliance Forge community.'
};

export default function EventsPage() {
  const events = [...EVENTS].sort((a, b) =>
    a.date > b.date ? 1 : -1
  );

  const [featuredEvent, ...remainingEvents] = events;

  return (
    <main>
      <EventsHero />

      <section className="pb-[120px]">
        <div className="mx-auto max-w-[1240px] px-6">
          {featuredEvent && (
            <Reveal>
              <FeaturedEventCard event={featuredEvent} />
            </Reveal>
          )}

          {remainingEvents.length > 0 && (
            <div className="mt-20">
              <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-mint">
                    Explore events
                  </span>

                  <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,42px)] font-semibold">
                    Find where you want to show up next.
                  </h2>
                </div>

                <p className="max-w-[430px] text-[14px] leading-6 text-text-muted">
                  Browse upcoming hackathons, build nights, meetups, and
                  community sessions by topic, format, or location.
                </p>
              </Reveal>

              <Reveal>
                <EventExplorer events={remainingEvents} />
              </Reveal>
            </div>
          )}
        </div>
      </section>
      <PastEvents />
<WhyAttendEvents />
<EventsCTA />

    </main>
  );
}