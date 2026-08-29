import Link from 'next/link';
import type { EventItem } from '@/data/events';
import { ArrowRightIcon } from '@/components/icons';
import { MagneticButton } from '@/components/MagneticButton';

export function EventDetailHero({ event }: { event: EventItem }) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-border bg-surface px-6 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-12">
      <div
        className="pointer-events-none absolute right-[-150px] top-[-170px] h-[380px] w-[380px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.20), transparent 65%)'
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[-180px] left-[-120px] h-[360px] w-[360px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(47,230,176,0.10), transparent 65%)'
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative">
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] text-text-dim transition-colors hover:text-mint"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
          back_to_events()
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_310px] lg:items-start">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-mint/20 bg-mint/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                Registration open
              </span>

              <span className="rounded-full border border-border bg-[#09090f]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                {event.format}
              </span>

              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue/25 bg-blue/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-blue"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="max-w-[780px] font-display text-[clamp(36px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {event.title}
            </h1>

            <p className="mt-6 max-w-[700px] text-[16px] leading-7 text-text-muted md:text-[17px]">
              {event.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href="/contact">
                Register interest
              </MagneticButton>

              <MagneticButton href="/events" variant="ghost">
                Explore events
              </MagneticButton>
            </div>
          </div>

          <aside className="rounded-[24px] border border-border bg-[#09090f]/75 p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="rounded-[18px] border border-border-hi bg-surface px-5 py-4 text-center">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  {event.dateLabel.month}
                </div>

                <div className="mt-1 font-display text-[42px] font-semibold leading-none text-mint">
                  {event.dateLabel.day}
                </div>
              </div>

              <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_18px_rgba(47,230,176,0.55)]" />
            </div>

            <div className="space-y-4 font-mono text-[11px]">
              <div className="border-b border-border pb-4">
                <div className="mb-1 uppercase tracking-wider text-text-dim">
                  Date
                </div>

                <div className="leading-5 text-text">
                  {formattedDate}
                </div>
              </div>

              <div className="border-b border-border pb-4">
                <div className="mb-1 uppercase tracking-wider text-text-dim">
                  Format
                </div>

                <div className="text-text">
                  {event.format}
                </div>
              </div>

              <div>
                <div className="mb-1 uppercase tracking-wider text-text-dim">
                  Location
                </div>

                <div className="leading-5 text-text">
                  {event.location ?? 'To be announced'}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}