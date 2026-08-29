import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { WORKSHOPS, getWorkshopBySlug } from '@/data/workshops';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';
import { WorkshopRegistrationForm } from '@/components/workshops/workshop-details/WorkshopRegistrationForm';

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
    title: `Register — ${workshop.title} — Dev Alliance Forge`,
    description: `Reserve your seat for ${workshop.title}.`
  };
}

export default async function WorkshopRegistrationPage({
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
      <div className="mx-auto max-w-[900px] px-6">
        <Reveal>
          <Link
            href={`/workshops/${workshop.slug}`}
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-text-dim transition-colors hover:text-mint"
          >
            <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
            back_to_workshop()
          </Link>

          <div className="relative mb-8 overflow-hidden rounded-[26px] border border-border bg-surface p-7 sm:p-8">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 100% 0%, rgba(124,58,237,0.15), transparent 38%), radial-gradient(circle at 0% 100%, rgba(47,230,176,0.07), transparent 42%)'
              }}
            />

            <div className="relative">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {workshop.status && (
                  <span className="rounded-full border border-mint/25 bg-mint/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                    {workshop.status}
                  </span>
                )}

                <span className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {workshop.level}
                </span>

                <span className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {workshop.format}
                </span>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
                workshop_registration
              </span>

              <h1 className="mt-3 font-display text-[clamp(30px,4vw,44px)] font-semibold leading-tight">
                {workshop.title}
              </h1>

              <p className="mt-4 max-w-[650px] text-[14px] leading-6 text-text-muted">
                {workshop.description}
              </p>

              <div className="mt-7 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
                {workshop.dateLabel && (
                  <InfoItem
                    label="Date"
                    value={workshop.dateLabel}
                  />
                )}

                {workshop.time && (
                  <InfoItem
                    label="Time"
                    value={workshop.time}
                  />
                )}

                {workshop.duration && (
                  <InfoItem
                    label="Duration"
                    value={workshop.duration}
                  />
                )}

                {workshop.location && (
                  <InfoItem
                    label="Location"
                    value={workshop.location}
                  />
                )}

                {typeof workshop.capacity === 'number' && (
                  <InfoItem
                    label="Capacity"
                    value={`${workshop.capacity} seats`}
                  />
                )}

                <InfoItem
                  label="Format"
                  value={workshop.format}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <WorkshopRegistrationForm
            workshopTitle={workshop.title}
            workshopSlug={workshop.slug}
            workshopDate={workshop.date}
          />
        </Reveal>
      </div>
    </main>
  );
}

function InfoItem({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] border border-border bg-bg/50 px-4 py-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-dim">
        {label}
      </div>

      <div className="mt-1.5 text-[12px] text-text">
        {value}
      </div>
    </div>
  );
}