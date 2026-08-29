import { Reveal } from '@/components/Reveal';
import type { WorkshopInstructor } from '@/data/workshops';

export function InstructorSection({
  instructors
}: {
  instructors: WorkshopInstructor[];
}) {
  if (!instructors.length) return null;

  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mint">
              Learn from builders
            </span>

            <h2 className="mt-3 max-w-[650px] font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-tight">
              Guided by people
              <span className="block text-text-muted">
                who actually build.
              </span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[14px] leading-6 text-text-muted">
            DAF workshops are designed around practical experience, mentor
            feedback, and lessons drawn from real development work.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {instructors.map((instructor, index) => {
            const initials = instructor.name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <Reveal
                key={`${instructor.name}-${index}`}
                delay={index * 0.08}
              >
                <div className="group relative h-full overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at 10% 0%, rgba(124,58,237,0.12), transparent 38%), radial-gradient(circle at 100% 100%, rgba(47,230,176,0.06), transparent 42%)'
                    }}
                  />

                  <div className="relative">
                    <div className="mb-7 flex items-start justify-between gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-mint/20 bg-mint/[0.07] font-mono text-sm font-semibold text-mint">
                        {initials}
                      </div>

                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-dim">
                        mentor_{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="font-display text-[21px] font-semibold">
                      {instructor.name}
                    </h3>

                    <p className="mt-2 text-[12px] text-mint">
                      {instructor.role}
                    </p>

                    {instructor.bio && (
                      <p className="mt-4 text-[13.5px] leading-6 text-text-muted">
                        {instructor.bio}
                      </p>
                    )}

                    {(instructor.github || instructor.linkedin) && (
                      <div className="mt-7 flex flex-wrap gap-4 border-t border-border pt-5">
                        {instructor.github && (
                          <a
                            href={instructor.github}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[10px] text-text-muted transition-colors hover:text-mint"
                          >
                            GitHub ↗
                          </a>
                        )}

                        {instructor.linkedin && (
                          <a
                            href={instructor.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[10px] text-text-muted transition-colors hover:text-mint"
                          >
                            LinkedIn ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}