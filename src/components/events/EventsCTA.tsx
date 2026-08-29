import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';

export function EventsCTA() {
  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] border border-border bg-surface px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div
              className="pointer-events-none absolute left-[-140px] top-[-160px] h-[360px] w-[360px] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.20), transparent 65%)'
              }}
            />

            <div
              className="pointer-events-none absolute bottom-[-170px] right-[-120px] h-[380px] w-[380px] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(47,230,176,0.12), transparent 65%)'
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

            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="font-mono text-xs text-mint">
                  $ show-up --build-together
                </div>

                <h2 className="mt-5 max-w-[700px] font-display text-[clamp(34px,4.5vw,58px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  Don&apos;t just watch
                  <span className="block bg-daf-gradient bg-clip-text text-transparent">
                    the community grow.
                  </span>
                </h2>

                <p className="mt-6 max-w-[620px] text-[15px] leading-7 text-text-muted md:text-base">
                  Join the next DAF event, meet developers who are building,
                  and turn what you know into something you can ship with
                  others.
                </p>
              </div>

              <div className="rounded-[24px] border border-border bg-[#09090f]/80 p-6 sm:p-7">
                <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-text-dim">
                  Choose your next move
                </div>

                <div className="space-y-3">
                  <Link
                    href="/community"
                    className="group flex items-center justify-between rounded-2xl border border-mint/20 bg-mint/[0.06] px-5 py-4 transition-all duration-300 hover:border-mint/40 hover:bg-mint/[0.09]"
                  >
                    <div>
                      <div className="text-sm font-semibold text-mint">
                        Join DAF
                      </div>

                      <div className="mt-1 text-[12px] text-text-muted">
                        Become part of the developer community.
                      </div>
                    </div>

                    <ArrowRightIcon className="h-4 w-4 shrink-0 text-mint transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/events"
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 transition-all duration-300 hover:border-mint/35"
                  >
                    <div>
                      <div className="text-sm font-semibold text-text">
                        Explore upcoming events
                      </div>

                      <div className="mt-1 text-[12px] text-text-muted">
                        Find the next session worth showing up for.
                      </div>
                    </div>

                    <ArrowRightIcon className="h-4 w-4 shrink-0 text-text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-mint" />
                  </Link>

                  <Link
                    href="/contact"
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 transition-all duration-300 hover:border-mint/35"
                  >
                    <div>
                      <div className="text-sm font-semibold text-text">
                        Host or partner with DAF
                      </div>

                      <div className="mt-1 text-[12px] text-text-muted">
                        Collaborate on events, workshops, or community programs.
                      </div>
                    </div>

                    <ArrowRightIcon className="h-4 w-4 shrink-0 text-text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-mint" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}