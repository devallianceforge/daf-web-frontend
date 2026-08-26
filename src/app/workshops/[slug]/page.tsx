import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { WORKSHOPS, getWorkshopBySlug } from '@/data/workshops';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { ArrowRightIcon } from '@/components/icons';

export function generateStaticParams() {
  return WORKSHOPS.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);
  if (!workshop) return {};
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
  if (!workshop) notFound();

  return (
    <div className="pt-[160px]">
      <div className="mx-auto max-w-[900px] px-6 pb-[120px]">
        <Reveal>
          <Link href="/workshops" className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-text-dim hover:text-mint">
            <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
            Back to workshops
          </Link>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="rounded-lg border border-border-hi bg-surface px-3 py-1.5 text-center font-mono text-xs">
              LVL <b className="text-mint">{workshop.level}</b>
            </span>
            <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
              {workshop.format}
            </span>
          </div>

          <h1 className="mb-6 font-display text-[clamp(30px,4.5vw,48px)] font-semibold">
            {workshop.title}
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-text-muted">{workshop.description}</p>

          <div className="mb-10 flex flex-wrap gap-2">
            {workshop.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-blue/25 bg-blue/10 px-2.5 py-1 font-mono text-[11px] text-blue"
              >
                {tag}
              </span>
            ))}
          </div>

          <MagneticButton href="/contact">Reserve a seat</MagneticButton>
        </Reveal>

        {workshop.prerequisites && (
          <Reveal delay={0.1} className="mt-16 border-t border-border pt-12">
            <h2 className="mb-6 font-display text-2xl font-semibold">Prerequisites</h2>
            <ul className="flex flex-col gap-3">
              {workshop.prerequisites.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-text-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {workshop.curriculum && (
          <Reveal delay={0.15} className="mt-12 border-t border-border pt-12">
            <h2 className="mb-6 font-display text-2xl font-semibold">Curriculum</h2>
            <div className="flex flex-col gap-4">
              {workshop.curriculum.map((item, i) => (
                <div key={item.title} className="flex gap-5 rounded-daf border border-border bg-surface p-5">
                  <span className="font-mono text-sm text-text-dim">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="mb-1 font-semibold">{item.title}</div>
                    <div className="text-sm text-text-muted">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {workshop.instructor && (
          <Reveal delay={0.2} className="mt-12 border-t border-border pt-12">
            <h2 className="mb-6 font-display text-2xl font-semibold">Led by</h2>
            <div className="w-fit rounded-daf border border-border bg-surface px-5 py-4">
              <div className="font-semibold">{workshop.instructor.name}</div>
              <div className="text-xs text-text-dim">{workshop.instructor.role}</div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
