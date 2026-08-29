import type { WorkshopResource } from '@/data/workshops';
import { Reveal } from '@/components/Reveal';

export function WorkshopResources({
  resources
}: {
  resources?: WorkshopResource[];
}) {
  if (!resources?.length) return null;

  return (
    <Reveal delay={0.24} className="mt-16 border-t border-border pt-12">
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
          resources
        </span>

        <h2 className="mt-3 font-display text-[28px] font-semibold">
          Useful material
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((resource, index) => (
          <a
            key={`${resource.label}-${index}`}
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-5 rounded-[20px] border border-border bg-surface p-5 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi"
          >
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-dim">
                resource_{String(index + 1).padStart(2, '0')}
              </div>

              <div className="mt-2 text-[14px] font-semibold">
                {resource.label}
              </div>
            </div>

            <span className="font-mono text-[14px] text-mint transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        ))}
      </div>
    </Reveal>
  );
}