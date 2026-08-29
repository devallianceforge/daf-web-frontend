import { Reveal } from '@/components/Reveal';

export function WorkshopOutcomes({
  outcomes
}: {
  outcomes?: string[];
}) {
  if (!outcomes?.length) return null;

  return (
    <Reveal delay={0.08} className="mt-16 border-t border-border pt-12">
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
          learning_outcomes
        </span>

        <h2 className="mt-3 font-display text-[28px] font-semibold">
          What you&apos;ll leave with
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {outcomes.map((outcome, index) => (
          <div
            key={`${outcome}-${index}`}
            className="rounded-[20px] border border-border bg-surface p-5"
          >
            <div className="mb-4 font-mono text-[10px] text-text-dim">
              output_{String(index + 1).padStart(2, '0')}
            </div>

            <p className="text-[14px] leading-6 text-text-muted">
              {outcome}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}