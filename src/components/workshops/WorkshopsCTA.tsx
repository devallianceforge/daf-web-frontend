import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';

export function WorkshopsCTA() {
  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] border border-border bg-surface px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 12% 20%, rgba(124,58,237,0.16), transparent 34%), radial-gradient(circle at 90% 80%, rgba(47,230,176,0.10), transparent 36%)'
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

            <div className="relative grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
              <div>
                <div className="mb-5 font-mono text-xs text-mint">
                  $ learn --build --repeat
                </div>

                <h2 className="max-w-[720px] font-display text-[clamp(34px,4.7vw,58px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  Learn something useful.
                  <span className="block text-text-muted">
                    Then build with it.
                  </span>
                </h2>

                <p className="mt-6 max-w-[650px] text-[15px] leading-7 text-text-muted">
                  Join practical sessions, work alongside other developers,
                  get feedback from mentors, and turn new concepts into skills
                  you can actually use.
                </p>
              </div>

              <div className="grid gap-3">
                <Link
                  href="/workshops"
                  className="group flex items-center justify-between rounded-[18px] border border-mint/30 bg-mint/[0.08] px-5 py-4 transition-all duration-300 hover:border-mint/50 hover:bg-mint/[0.12]"
                >
                  <div>
                    <div className="text-sm font-semibold text-text">
                      Explore workshops
                    </div>

                    <div className="mt-1 text-[12px] text-text-muted">
                      Find your next practical skill.
                    </div>
                  </div>

                  <ArrowRightIcon className="h-4 w-4 text-mint transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/community"
                  className="group flex items-center justify-between rounded-[18px] border border-border bg-bg/50 px-5 py-4 transition-all duration-300 hover:border-border-hi"
                >
                  <div>
                    <div className="text-sm font-semibold text-text">
                      Join DAF
                    </div>

                    <div className="mt-1 text-[12px] text-text-muted">
                      Learn and build with the community.
                    </div>
                  </div>

                  <ArrowRightIcon className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-mint" />
                </Link>

                <Link
                  href="/contact"
                  className="group flex items-center justify-between rounded-[18px] border border-border bg-bg/50 px-5 py-4 transition-all duration-300 hover:border-border-hi"
                >
                  <div>
                    <div className="text-sm font-semibold text-text">
                      Teach with DAF
                    </div>

                    <div className="mt-1 text-[12px] text-text-muted">
                      Host a session or share your expertise.
                    </div>
                  </div>

                  <ArrowRightIcon className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-mint" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}