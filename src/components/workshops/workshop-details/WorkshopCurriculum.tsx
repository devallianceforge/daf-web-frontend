import type { WorkshopCurriculumItem } from '@/data/workshops';
import { Reveal } from '@/components/Reveal';

export function WorkshopCurriculum({
  curriculum
}: {
  curriculum?: WorkshopCurriculumItem[];
}) {
  if (!curriculum?.length) return null;

  return (
    <Reveal
      delay={0.16}
      className="mt-16 border-t border-border pt-12"
    >
      <section id="curriculum" className="scroll-mt-[120px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
              curriculum
            </span>

            <h2 className="mt-3 font-display text-[28px] font-semibold">
              What we&apos;ll build through
            </h2>
          </div>

          <span className="font-mono text-[10px] text-text-dim">
            {curriculum.length}{' '}
            {curriculum.length === 1 ? 'module' : 'modules'}
          </span>
        </div>

        <div className="space-y-4">
          {curriculum.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="group grid gap-5 rounded-[22px] border border-border bg-surface p-6 transition-all duration-300 ease-daf hover:border-border-hi md:grid-cols-[70px_1fr]"
            >
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-border-hi bg-bg/70 font-mono text-[11px] text-mint">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div>
                <h3 className="text-[16px] font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-[680px] text-[13.5px] leading-6 text-text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}