import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';

const PAST_EVENTS = [
  {
    title: 'Open Source Build Night',
    description:
      'A community sprint focused on first contributions, mentor support, and shipping real pull requests together.',
    stats: [
      { label: 'Builders', value: '42' },
      { label: 'Merged PRs', value: '18' }
    ],
    type: 'Build Night',
    href: '/blog'
  },
  {
    title: 'Modern React Workshop',
    description:
      'A practical workshop covering component thinking, state, rendering, and patterns developers can use in real projects.',
    stats: [
      { label: 'Attendees', value: '85' },
      { label: 'Resources', value: '12' }
    ],
    type: 'Workshop',
    href: '/blog'
  },
  {
    title: 'DAF Community Hackathon',
    description:
      'Teams moved from idea to prototype under pressure, then presented working demos to the wider community.',
    stats: [
      { label: 'Teams', value: '12' },
      { label: 'Finalists', value: '3' }
    ],
    type: 'Hackathon',
    href: '/blog'
  }
];

export function PastEvents() {
  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mint">
              Event archive
            </span>

            <h2 className="mt-3 max-w-[650px] font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-tight">
              What happened
              <span className="block text-text-muted">
                inside the forge.
              </span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[14px] leading-6 text-text-muted">
            Recaps, outcomes, and community highlights from the events that
            already brought DAF builders together.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PAST_EVENTS.map((event, index) => (
            <Reveal key={event.title} delay={index * 0.08}>
              <Link
                href={event.href}
                className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 85% 5%, rgba(124,58,237,0.13), transparent 38%), radial-gradient(circle at 10% 100%, rgba(47,230,176,0.07), transparent 45%)'
                  }}
                />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-mint/20 bg-mint/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                      {event.type}
                    </span>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                      archived
                    </span>
                  </div>

                  <h3 className="font-display text-[24px] font-semibold leading-tight">
                    {event.title}
                  </h3>

                  <p className="mt-4 text-[13.5px] leading-6 text-text-muted">
                    {event.description}
                  </p>

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    {event.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[16px] border border-border bg-[#09090f]/70 p-4"
                      >
                        <div className="font-display text-2xl font-semibold text-mint">
                          {stat.value}
                        </div>

                        <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-dim">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="font-mono text-[10px] text-text-dim">
                    recap.open()
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mint">
                    View recap
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}