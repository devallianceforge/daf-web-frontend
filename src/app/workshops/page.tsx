import type { Metadata } from 'next';

import {
  WORKSHOPS,
  WORKSHOP_TRACKS,
  getFeaturedWorkshop,
  getWorkshopInstructors
} from '@/data/workshops';

import { Reveal } from '@/components/Reveal';
import { WorkshopsHero } from '@/components/workshops/WorkshopsHero';
import { FeaturedWorkshopCard } from '@/components/workshops/FeaturedWorkshopCard';
import { WorkshopExplorer } from '@/components/workshops/WorkshopExplorer';
import { WorkshopTracks } from '@/components/workshops/WorkshopTracks';
import { InstructorSection } from '@/components/workshops/InstructorSection';
import { WorkshopsCTA } from '@/components/workshops/WorkshopsCTA';

export const metadata: Metadata = {
  title: 'Workshops — Dev Alliance Forge',
  description:
    'Hands-on workshops run by the DAF community to help developers build practical, production-ready skills.'
};

export default function WorkshopsPage() {
  const featuredWorkshop =
    getFeaturedWorkshop() ?? WORKSHOPS[0];

  const remainingWorkshops = WORKSHOPS.filter(
    (workshop) => workshop.slug !== featuredWorkshop?.slug
  );

  const instructors = getWorkshopInstructors();

  return (
    <main>
      <WorkshopsHero />

      <section className="pb-[120px]">
        <div className="mx-auto max-w-[1240px] px-6">
          {featuredWorkshop && (
            <Reveal>
              <FeaturedWorkshopCard
                workshop={featuredWorkshop}
              />
            </Reveal>
          )}

          {remainingWorkshops.length > 0 && (
            <div className="mt-20">
              <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-mint">
                    Explore workshops
                  </span>

                  <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,42px)] font-semibold">
                    Find the skill you want to strengthen next.
                  </h2>
                </div>

                <p className="max-w-[430px] text-[14px] leading-6 text-text-muted">
                  Browse hands-on sessions by level, topic, and format — then
                  choose the workshop that matches where you are and where you
                  want to go next.
                </p>
              </Reveal>

              <Reveal>
                <WorkshopExplorer
                  workshops={remainingWorkshops}
                />
              </Reveal>
            </div>
          )}
        </div>
      </section>

      <WorkshopTracks
        workshops={WORKSHOPS}
        tracks={WORKSHOP_TRACKS}
      />

      <InstructorSection instructors={instructors} />

      <WorkshopsCTA />
    </main>
  );
}