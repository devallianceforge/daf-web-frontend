import type { EventItem } from '@/data/events';
import { Reveal } from '@/components/Reveal';

export function EventAgenda({ agenda }: { agenda: EventItem['agenda'] }) {
  if (!agenda?.length) return null;

  return (
    <section className="mt-14">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mint">
            Agenda
          </span>

          <h2 className="mt-3 font-display text-[clamp(26px,3vw,36px)] font-semibold">
            What happens during the event.
          </h2>
        </div>

        <p className="max-w-[420px] text-[14px] leading-6 text-text-muted">
          A clear view of the sessions, build time, demos, and milestones planned
          throughout the event.
        </p>
      </Reveal>

      <div className="relative">
        <div className="absolute bottom-6 left-[22px] top-6 hidden w-px bg-border sm:block" />

        <div className="space-y-4">
          {agenda.map((item, index) => (
            <Reveal key={`${item.time}-${item.title}`} delay={index * 0.06}>
              <div className="group relative grid gap-4 rounded-[22px] border border-border bg-surface p-5 transition-all duration-300 ease-daf hover:border-border-hi sm:grid-cols-[170px_1fr] sm:items-center sm:p-6">
                <div className="relative flex items-center gap-4">
                  <span className="hidden h-3 w-3 shrink-0 rounded-full border border-mint/40 bg-bg shadow-[0_0_16px_rgba(47,230,176,0.18)] sm:block" />

                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-dim">
                      step_{String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="mt-1 font-mono text-[12px] text-mint">
                      {item.time}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold text-text">
                    {item.title}
                  </h3>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 50%, rgba(124,58,237,0.08), transparent 34%)'
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}