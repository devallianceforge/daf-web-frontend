import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EVENTS, getEventBySlug } from '@/data/events';
import { Reveal } from '@/components/Reveal';
import { EventDetailHero } from '@/components/events/event-details/EventDetailHero';
import { EventAgenda } from '@/components/events/event-details/EventAgenda';
import { EventSpeakers } from '@/components/events/event-details/EventSpeakers';
import { EventDetailCTA } from '@/components/events/event-details/EventDetailCTA';

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

  if (!event) {
    notFound();
  }

  return (
    <main className="pb-[120px] pt-[140px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <EventDetailHero event={event} />
        </Reveal>

        <EventAgenda agenda={event.agenda} />

        <EventSpeakers speakers={event.speakers} />

        <EventDetailCTA />
      </div>
    </main>
  );
}