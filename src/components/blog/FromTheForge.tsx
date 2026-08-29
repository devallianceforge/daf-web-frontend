import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';

const CONTRIBUTORS = [
  {
    name: 'DAF Engineering Team',
    role: 'Engineering & architecture',
    articles: 14,
    initials: 'DE'
  },
  {
    name: 'DAF Mentor Team',
    role: 'Open source & mentorship',
    articles: 11,
    initials: 'DM'
  },
  {
    name: 'DAF Community Team',
    role: 'Community & growth',
    articles: 9,
    initials: 'DC'
  }
];

export function FromTheForge() {
  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mint">
              From the forge
            </span>

            <h2 className="mt-3 max-w-[620px] font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-tight">
              Built by developers.
              <span className="block text-text-muted">
                Shared with developers.
              </span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[14px] leading-6 text-text-muted">
            DAF is a community publication. The knowledge here comes from
            builders sharing what they learn through real projects,
            collaboration, mentorship, and experimentation.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CONTRIBUTORS.map((contributor, index) => (
            <Reveal key={contributor.name} delay={index * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 10% 0%, rgba(124,58,237,0.12), transparent 38%)'
                  }}
                />

                <div className="relative">
                  <div className="mb-7 flex items-start justify-between gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-mint/20 bg-mint/[0.07] font-mono text-sm font-semibold text-mint">
                      {contributor.initials}
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                      contributor_{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold">
                    {contributor.name}
                  </h3>

                  <p className="mt-2 text-[13px] text-text-muted">
                    {contributor.role}
                  </p>

                  <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                    <span className="font-mono text-[11px] text-text-dim">
                      {contributor.articles} published articles
                    </span>

                    <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_18px_rgba(47,230,176,0.55)]" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-[26px] border border-border bg-[#09090f] px-7 py-8 sm:px-9">
            <div
              className="pointer-events-none absolute right-[-100px] top-[-140px] h-[320px] w-[320px] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)'
              }}
            />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-mono text-[11px] text-mint">
                  $ contribute --knowledge
                </div>

                <h3 className="mt-3 font-display text-[26px] font-semibold">
                  Have something worth sharing?
                </h3>

                <p className="mt-2 max-w-[620px] text-[14px] leading-6 text-text-muted">
                  Share a technical lesson, project breakdown, career insight,
                  community story, or hard-earned developer experience with the
                  DAF community.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-daf-gradient px-6 py-3 text-sm font-semibold text-[#050508] transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(124,58,237,0.55)]"
              >
                Write for DAF
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}