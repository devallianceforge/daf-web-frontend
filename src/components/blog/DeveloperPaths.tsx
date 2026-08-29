import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';

const PATHS = [
  {
    title: 'Frontend Development',
    description:
      'UI architecture, React, Next.js, accessibility, performance, and modern frontend practices.',
    count: 12,
    href: '/blog?category=Web'
  },
  {
    title: 'Backend & APIs',
    description:
      'Server-side thinking, APIs, data flows, databases, authentication, and scalable application design.',
    count: 8,
    href: '/blog?category=Engineering'
  },
  {
    title: 'Open Source',
    description:
      'Learn how to contribute, collaborate, review code, and become a confident open-source contributor.',
    count: 10,
    href: '/blog?category=Open%20Source'
  },
  {
    title: 'DevOps & Cloud',
    description:
      'Deployment, containers, CI/CD, infrastructure, reliability, and the systems behind modern products.',
    count: 6,
    href: '/blog?category=DevOps'
  },
  {
    title: 'Career & Growth',
    description:
      'Portfolios, teamwork, interviews, internships, communication, and becoming a stronger developer.',
    count: 9,
    href: '/blog?category=Career'
  },
  {
    title: 'AI for Builders',
    description:
      'Use AI thoughtfully in development while strengthening your own technical understanding.',
    count: 7,
    href: '/blog?category=AI'
  }
];

export function DeveloperPaths() {
  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mint">
              Learning paths
            </span>

            <h2 className="mt-3 max-w-[620px] font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-tight">
              Don&apos;t just browse.
              <span className="block text-text-muted">
                Follow a direction.
              </span>
            </h2>
          </div>

          <p className="max-w-[420px] text-[14px] leading-6 text-text-muted">
            Explore articles by the skill you want to strengthen and build a
            more focused learning journey through the DAF knowledge base.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PATHS.map((path, index) => (
            <Reveal key={path.title} delay={index * 0.06}>
              <Link
                href={path.href}
                className="group relative flex h-full min-h-[235px] flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 0%, rgba(47,230,176,0.09), transparent 40%), radial-gradient(circle at 0% 100%, rgba(124,58,237,0.10), transparent 45%)'
                  }}
                />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                      path_{String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-text-muted">
                      {path.count} articles
                    </span>
                  </div>

                  <h3 className="font-display text-[22px] font-semibold">
                    {path.title}
                  </h3>

                  <p className="mt-3 text-[13.5px] leading-6 text-text-muted">
                    {path.description}
                  </p>
                </div>

                <div className="relative mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="font-mono text-[11px] text-mint">
                    explore_path()
                  </span>

                  <ArrowRightIcon className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-mint" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}