import type { EventItem } from '@/data/events';
import { Reveal } from '@/components/Reveal';

export function EventSpeakers({
  speakers
}: {
  speakers: EventItem['speakers'];
}) {
  if (!speakers?.length) return null;

  return (
    <section className="mt-14">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mint">
            Hosted by
          </span>

          <h2 className="mt-3 font-display text-[clamp(26px,3vw,36px)] font-semibold">
            Meet the people guiding the session.
          </h2>
        </div>

        <p className="max-w-[420px] text-[14px] leading-6 text-text-muted">
          Organizers, mentors, speakers, and community builders helping shape
          the event experience.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {speakers.map((speaker, index) => {
          const initials = speaker.name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          return (
            <Reveal key={`${speaker.name}-${speaker.role}`} delay={index * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-[24px] border border-border bg-surface p-6 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 0%, rgba(124,58,237,0.11), transparent 40%)'
                  }}
                />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-mint/20 bg-mint/[0.07] font-mono text-sm font-semibold text-mint">
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[16px] font-semibold text-text">
                          {speaker.name}
                        </h3>

                        <p className="mt-1 text-[12px] leading-5 text-text-muted">
                          {speaker.role}
                        </p>
                      </div>

                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-dim">
                        host_{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 font-mono text-[10px] text-text-dim">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                      session_ready
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}