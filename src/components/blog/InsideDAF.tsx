import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';

const RECAPS = [
  {
    type: 'Event Recap',
    title: 'What We Learned From DAF Build Night',
    description:
      'A look back at the projects, pull requests, collaboration, and lessons that came out of our latest open-source build session.',
    meta: 'Community · 5 min read',
    href: '/blog'
  },
  {
    type: 'Workshop Recap',
    title: 'Inside Our Modern React Workshop',
    description:
      'The concepts, mistakes, demos, and practical takeaways our builders explored during the latest frontend workshop.',
    meta: 'Workshop · 6 min read',
    href: '/blog'
  },
  {
    type: 'Hackathon Story',
    title: 'From Idea to Demo in 48 Hours',
    description:
      'How DAF teams approached scope, collaboration, technical decisions, and final demos during a fast-paced hackathon.',
    meta: 'Hackathon · 7 min read',
    href: '/blog'
  }
];

export function InsideDAF() {
  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mint">
              Inside DAF
            </span>

            <h2 className="mt-3 max-w-[640px] font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-tight">
              More than events.
              <span className="block text-text-muted">
                These are the lessons they leave behind.
              </span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[14px] leading-6 text-text-muted">
            Recaps, reflections, demos, and takeaways from what happens across
            the Dev Alliance Forge community.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {RECAPS.map((recap, index) => (
            <Reveal key={recap.title} delay={index * 0.08}>
              <Link
                href={recap.href}
                className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 85% 10%, rgba(59,130,246,0.12), transparent 38%), radial-gradient(circle at 10% 100%, rgba(47,230,176,0.06), transparent 45%)'
                  }}
                />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-mint/20 bg-mint/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                      {recap.type}
                    </span>

                    <span className="font-mono text-[10px] text-text-dim">
                      log_{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display text-[23px] font-semibold leading-tight">
                    {recap.title}
                  </h3>

                  <p className="mt-4 text-[13.5px] leading-6 text-text-muted">
                    {recap.description}
                  </p>
                </div>

                <div className="relative mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="font-mono text-[10px] text-text-dim">
                    {recap.meta}
                  </span>

                  <ArrowRightIcon className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-mint" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/events"
            className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] text-text-muted transition-all duration-300 hover:border-mint/40 hover:text-mint"
          >
            Explore events
          </Link>

          <Link
            href="/workshops"
            className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] text-text-muted transition-all duration-300 hover:border-mint/40 hover:text-mint"
          >
            Explore workshops
          </Link>
        </Reveal>
      </div>
    </section>
  );
}