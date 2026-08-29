import { Reveal } from '@/components/Reveal';

const BENEFITS = [
  {
    index: '01',
    title: 'Learn by doing',
    description:
      'Turn concepts into real experience through live builds, workshops, sprints, and hands-on collaboration.'
  },
  {
    index: '02',
    title: 'Meet collaborators',
    description:
      'Find developers, designers, mentors, and teammates who can help turn ideas into actual projects.'
  },
  {
    index: '03',
    title: 'Get feedback',
    description:
      'Learn faster by showing your work, asking questions, and getting practical input from other builders.'
  },
  {
    index: '04',
    title: 'Ship something real',
    description:
      'Leave with more than notes — contribute code, finish a prototype, improve a project, or build something worth showing.'
  }
];

export function WhyAttendEvents() {
  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mint">
              Why show up?
            </span>

            <h2 className="mt-3 max-w-[620px] font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-tight">
              Don&apos;t just attend.
              <span className="block text-text-muted">
                Leave better than you arrived.
              </span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[14px] leading-6 text-text-muted">
            DAF events are designed around participation, collaboration, and
            practical developer growth — not passive attendance.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 0%, rgba(47,230,176,0.08), transparent 42%), radial-gradient(circle at 0% 100%, rgba(124,58,237,0.10), transparent 45%)'
                  }}
                />

                <div className="relative flex gap-5">
                  <div className="shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-mint/20 bg-mint/[0.07] font-mono text-[11px] text-mint">
                      {benefit.index}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-[22px] font-semibold">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 max-w-[470px] text-[13.5px] leading-6 text-text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}