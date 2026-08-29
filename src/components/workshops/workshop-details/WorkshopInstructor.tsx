import type { WorkshopInstructor as WorkshopInstructorType } from '@/data/workshops';
import { Reveal } from '@/components/Reveal';

export function WorkshopInstructor({
  instructor
}: {
  instructor?: WorkshopInstructorType;
}) {
  if (!instructor) return null;

  const initials = instructor.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Reveal delay={0.2} className="mt-16 border-t border-border pt-12">
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
          instructor
        </span>

        <h2 className="mt-3 font-display text-[28px] font-semibold">
          Learn with guidance
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-[24px] border border-border bg-surface p-6 sm:p-7">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 100% 0%, rgba(124,58,237,0.11), transparent 40%), radial-gradient(circle at 0% 100%, rgba(47,230,176,0.06), transparent 42%)'
          }}
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] border border-mint/20 bg-mint/[0.07] font-mono text-[15px] font-semibold text-mint">
            {initials}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <h3 className="font-display text-[22px] font-semibold">
                  {instructor.name}
                </h3>

                <p className="mt-1 text-[12px] text-mint">
                  {instructor.role}
                </p>
              </div>

              <span className="rounded-full border border-border bg-bg/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-text-dim">
                workshop mentor
              </span>
            </div>

            {instructor.bio && (
              <p className="mt-5 max-w-[700px] text-[13.5px] leading-6 text-text-muted">
                {instructor.bio}
              </p>
            )}

            {(instructor.github || instructor.linkedin) && (
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                {instructor.github && (
                  <a
                    href={instructor.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-text-muted transition-colors hover:text-mint"
                  >
                    GitHub →
                  </a>
                )}

                {instructor.linkedin && (
                  <a
                    href={instructor.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-text-muted transition-colors hover:text-mint"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}