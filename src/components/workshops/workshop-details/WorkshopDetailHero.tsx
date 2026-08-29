import Link from 'next/link';
import type { WorkshopItem } from '@/data/workshops';
import { MagneticButton } from '@/components/MagneticButton';
import { ArrowRightIcon } from '@/components/icons';

export function WorkshopDetailHero({
  workshop
}: {
  workshop: WorkshopItem;
}) {
  return (
    <section>
      <Link
        href="/workshops"
        className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-text-dim transition-colors hover:text-mint"
      >
        <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
        back_to_workshops()
      </Link>

      <div className="relative overflow-hidden rounded-[30px] border border-border bg-surface">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 88% 12%, rgba(124,58,237,0.20), transparent 34%), radial-gradient(circle at 72% 100%, rgba(47,230,176,0.09), transparent 38%)'
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)',
            backgroundSize: '38px 38px'
          }}
        />

        <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_320px] lg:p-12">
          <div>
            <div className="mb-7 flex flex-wrap items-center gap-3">
              {workshop.status && (
                <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                  {workshop.status}
                </span>
              )}

              <span className="rounded-full border border-border-hi bg-bg/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                {workshop.level}
              </span>

              <span className="rounded-full border border-border-hi bg-bg/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                {workshop.format}
              </span>
            </div>

            <h1 className="max-w-[760px] font-display text-[clamp(36px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.03em]">
              {workshop.title}
            </h1>

            <p className="mt-6 max-w-[670px] text-[16px] leading-7 text-text-muted">
              {workshop.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {workshop.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-blue/25 bg-blue/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-blue"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton
                href={`/workshops/${workshop.slug}/register`}
              >
                Reserve a seat
              </MagneticButton>

              <Link
                href="#curriculum"
                className="inline-flex items-center gap-2 rounded-full border border-border-hi px-5 py-3 text-sm font-semibold text-text transition-all hover:border-mint/40 hover:text-mint"
              >
                View curriculum
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-[22px] border border-border bg-bg/55 p-5 backdrop-blur-sm">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
              workshop.inspect()
            </div>

            <div className="space-y-4">
              {workshop.dateLabel && (
                <InfoRow label="Date" value={workshop.dateLabel} />
              )}

              {workshop.time && (
                <InfoRow label="Time" value={workshop.time} />
              )}

              {workshop.duration && (
                <InfoRow label="Duration" value={workshop.duration} />
              )}

              <InfoRow label="Format" value={workshop.format} />

              {workshop.location && (
                <InfoRow label="Location" value={workshop.location} />
              )}

              {typeof workshop.capacity === 'number' && (
                <InfoRow
                  label="Capacity"
                  value={`${workshop.capacity} seats`}
                />
              )}

              <InfoRow label="Level" value={workshop.level} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-border pb-4 last:border-b-0 last:pb-0">
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
        {label}
      </span>

      <span className="max-w-[180px] text-right text-[12px] leading-5 text-text">
        {value}
      </span>
    </div>
  );
}