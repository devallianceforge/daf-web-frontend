import Link from 'next/link';
import Image from 'next/image';
import type { WorkshopItem } from '@/data/workshops';
import { ArrowRightIcon } from '@/components/icons';

export function FeaturedWorkshopCard({
  workshop
}: {
  workshop: WorkshopItem;
}) {
  return (
    <Link
      href={`/workshops/${workshop.slug}`}
      className="group relative block overflow-hidden rounded-[28px] border border-border bg-surface transition-all duration-500 ease-daf hover:-translate-y-1 hover:border-border-hi"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 84% 12%, rgba(124,58,237,0.2), transparent 34%), radial-gradient(circle at 72% 100%, rgba(47,230,176,0.09), transparent 34%)'
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative grid min-h-[440px] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-mint">
                Featured workshop
              </span>

              <span className="font-mono text-[11px] text-text-dim">
                {workshop.level}
              </span>

              <span className="font-mono text-[11px] text-text-dim">
                {workshop.format}
              </span>
            </div>

            <h2 className="max-w-[720px] font-display text-[clamp(32px,4.2vw,54px)] font-semibold leading-[1.06] tracking-[-0.03em]">
              {workshop.title}
            </h2>

            <p className="mt-6 max-w-[650px] text-[15px] leading-7 text-text-muted md:text-base">
              {workshop.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {workshop.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-blue/25 bg-blue/10 px-2.5 py-1 font-mono text-[11px] text-blue"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                Instructor
              </div>

              <div className="mt-2 text-sm font-medium text-text">
                {workshop.instructor?.name ?? 'DAF Mentor Team'}
              </div>

              <div className="mt-1 text-[12px] text-text-muted">
                {workshop.instructor?.role ?? 'Community mentors'}
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-mint">
              View workshop
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-daf group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>

        <div className="relative hidden overflow-hidden border-l border-border lg:block">
          {workshop.coverImageUrl ? (
            <Image
              src={workshop.coverImageUrl}
              alt={workshop.title}
              fill
              sizes="40vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#09090f]/70" />
          )}

          <div className="relative flex h-full flex-col justify-between p-10">
            <div className="flex items-start justify-between">
              <div className="rounded-[20px] border border-border-hi bg-bg/70 px-6 py-5 backdrop-blur-md">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  Level
                </div>

                <div className="mt-2 font-display text-[30px] font-semibold leading-none text-mint">
                  {workshop.level}
                </div>
              </div>

              <span className="rounded-full border border-mint/20 bg-mint/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                Learning path
              </span>
            </div>

            <div className="font-mono text-[12px]">
              <div className="mb-5 text-text-dim">
                $ workshop --inspect
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-5 border-b border-border pb-4">
                  <span className="text-text-dim">level</span>
                  <span className="text-right text-text">
                    {workshop.level}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-5 border-b border-border pb-4">
                  <span className="text-text-dim">format</span>
                  <span className="text-right text-text">
                    {workshop.format}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-5">
                  <span className="text-text-dim">modules</span>
                  <span className="text-mint">
                    {workshop.curriculum?.length ?? 0}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute bottom-[-110px] right-[-100px] h-[300px] w-[300px] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.26), transparent 65%)'
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}