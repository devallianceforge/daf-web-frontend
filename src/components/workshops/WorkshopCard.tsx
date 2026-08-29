import Link from 'next/link';
import type { WorkshopItem } from '@/data/workshops';
import { ArrowRightIcon } from '@/components/icons';

export function WorkshopCard({
  workshop
}: {
  workshop: WorkshopItem;
}) {
  return (
    <Link
      href={`/workshops/${workshop.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-surface transition-all duration-300 ease-daf hover:-translate-y-1.5 hover:border-border-hi"
    >
      <div
        className="relative flex h-[160px] items-start justify-between overflow-hidden p-5"
        style={{
          background:
            'radial-gradient(circle at 18% 20%, rgba(124,58,237,0.30), transparent 48%), radial-gradient(circle at 82% 78%, rgba(47,230,176,0.20), transparent 48%), #11111a'
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '26px 26px'
          }}
        />

        <div className="relative z-[1] rounded-[16px] border border-border-hi bg-bg/75 px-4 py-3 backdrop-blur-md">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
            Level
          </div>

          <div className="mt-1 font-display text-[22px] font-semibold leading-none text-mint">
            {workshop.level}
          </div>
        </div>

        <div className="relative z-[1] flex flex-col items-end gap-2">
          <span className="rounded-full border border-border bg-black/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-text-muted backdrop-blur-md">
            {workshop.format}
          </span>

          <span className="rounded-full border border-mint/20 bg-mint/[0.08] px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-mint">
            {workshop.curriculum?.length ?? 0} modules
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {workshop.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-blue/25 bg-blue/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-blue"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-[21px] font-semibold leading-[1.2]">
          {workshop.title}
        </h3>

        <p className="mt-3 text-[13.5px] leading-6 text-text-muted">
          {workshop.description}
        </p>

        <div className="mt-6 space-y-3 border-t border-border pt-5">
          <div className="flex items-start justify-between gap-5">
            <span className="font-mono text-[9px] uppercase tracking-wider text-text-dim">
              Instructor
            </span>

            <span className="max-w-[210px] text-right text-[12px] text-text">
              {workshop.instructor?.name ?? 'DAF Mentor Team'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-5">
            <span className="font-mono text-[9px] uppercase tracking-wider text-text-dim">
              Prerequisites
            </span>

            <span className="max-w-[220px] text-right text-[12px] leading-5 text-text-muted">
              {workshop.prerequisites?.length
                ? `${workshop.prerequisites.length} requirement${
                    workshop.prerequisites.length === 1 ? '' : 's'
                  }`
                : 'None'}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <span className="font-mono text-[10px] text-text-dim">
            workshop.inspect()
          </span>

          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mint">
            View workshop
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-daf group-hover:translate-x-1.5" />
          </span>
        </div>

        <div
          className="pointer-events-none absolute right-[-90px] top-[-90px] h-[220px] w-[220px] rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(124,58,237,0.14), transparent 65%)'
          }}
        />
      </div>
    </Link>
  );
}