import { Reveal } from '@/components/Reveal';

export function WorkshopPrerequisites({
  prerequisites
}: {
  prerequisites?: string[];
}) {
  if (!prerequisites?.length) return null;

  return (
    <Reveal delay={0.12} className="mt-16 border-t border-border pt-12">
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
          prerequisites
        </span>

        <h2 className="mt-3 font-display text-[28px] font-semibold">
          What you should know first
        </h2>
      </div>

      <div className="rounded-[22px] border border-border bg-surface p-6">
        <div className="space-y-4">
          {prerequisites.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-start gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-mint/20 bg-mint/[0.07] font-mono text-[9px] text-mint">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="text-[14px] leading-6 text-text-muted">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}