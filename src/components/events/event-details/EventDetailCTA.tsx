import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';

export function EventDetailCTA({
  eventSlug
}: {
  eventSlug: string;
})  {
  return (
    <section className="mt-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface px-7 py-10 sm:px-9 lg:px-11">
          <div
            className="pointer-events-none absolute left-[-120px] top-[-140px] h-[320px] w-[320px] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)'
            }}
          />

          <div
            className="pointer-events-none absolute bottom-[-150px] right-[-120px] h-[340px] w-[340px] rounded-full blur-3xl"
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

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="font-mono text-[11px] text-mint">
                $ ready --join-event
              </div>

              <h2 className="mt-3 max-w-[620px] font-display text-[clamp(28px,3.5vw,42px)] font-semibold leading-tight">
                Ready to show up and build with the community?
              </h2>

              <p className="mt-4 max-w-[600px] text-[14px] leading-6 text-text-muted">
                Register your interest, meet other builders, and take part in
                the next DAF session.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={`/events/${eventSlug}/register`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-daf-gradient px-6 py-3 text-sm font-semibold text-[#050508] transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(124,58,237,0.55)]"
              >
                Register interest

                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/events"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border-hi px-6 py-3 text-sm font-semibold text-text transition-all duration-300 hover:border-mint/40 hover:text-mint"
              >
                Explore more events

                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}