import type { Metadata } from 'next';
import { WORKSHOPS } from '@/data/workshops';
import { WorkshopCard } from '@/components/WorkshopCard';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Workshops — Dev Alliance Forge',
  description: 'Hands-on workshops run by the DAF community, for the community.'
};

export default function WorkshopsPage() {
  return (
    <section className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 max-w-[640px]">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            Workshops
          </span>
          <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            Level up with hands-on sessions.
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {WORKSHOPS.map((workshop, i) => (
            <Reveal key={workshop.slug} delay={i * 0.08}>
              <WorkshopCard workshop={workshop} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
