import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { WORKSHOPS, getWorkshopBySlug } from '@/data/workshops';
import { Reveal } from '@/components/Reveal';
import { WorkshopDetailHero } from '@/components/workshops/workshop-details/WorkshopDetailHero';
import { WorkshopOutcomes } from '@/components/workshops/workshop-details/WorkshopOutcomes';
import { WorkshopPrerequisites } from '@/components/workshops/workshop-details/WorkshopPrerequisites';
import { WorkshopCurriculum } from '@/components/workshops/workshop-details/WorkshopCurriculum';
import { WorkshopInstructor } from '@/components/workshops/workshop-details/WorkshopInstructor';
import { WorkshopResources } from '@/components/workshops/workshop-details/WorkshopResources';

export function generateStaticParams() {
  return WORKSHOPS.map((workshop) => ({
    slug: workshop.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) {
    return {};
  }

  return {
    title: `${workshop.title} — Dev Alliance Forge`,
    description: workshop.description
  };
}

export default async function WorkshopDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const workshop = getWorkshopBySlug(slug);

  if (!workshop) {
    notFound();
  }

  return (
    <main className="pb-[120px] pt-[140px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <WorkshopDetailHero workshop={workshop} />
        </Reveal>

        <WorkshopOutcomes outcomes={workshop.outcomes} />

        <WorkshopPrerequisites
          prerequisites={workshop.prerequisites}
        />

        <WorkshopCurriculum
          curriculum={workshop.curriculum}
        />

        <WorkshopInstructor
          instructor={workshop.instructor}
        />

        <WorkshopResources
          resources={workshop.resources}
        />
      </div>
    </main>
  );
}