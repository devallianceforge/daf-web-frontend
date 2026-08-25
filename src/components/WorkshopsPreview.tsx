import { WORKSHOPS } from '@/data/workshops';
import { WorkshopCard } from './WorkshopCard';
import { Reveal } from './Reveal';
import { MagneticButton } from './MagneticButton';

export function WorkshopsPreview() {
  return (
    <section id="workshops" className="py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
            Latest workshops
          </h2>
          <p className="max-w-[420px] text-[15px] text-text-muted">
            Hands-on sessions run by the community, for the community.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {WORKSHOPS.map((workshop, i) => (
            <Reveal key={workshop.slug} delay={i * 0.08}>
              <WorkshopCard workshop={workshop} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <MagneticButton href="/workshops" variant="ghost" size="sm">
            View all workshops
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
