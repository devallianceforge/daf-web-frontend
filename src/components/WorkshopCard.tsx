import Link from 'next/link';
import type { WorkshopItem } from '@/data/workshops';
import { ArrowRightIcon } from './icons';

export function WorkshopCard({ workshop }: { workshop: WorkshopItem }) {
  return (
    <div className="group overflow-hidden rounded-daf border border-border bg-surface transition-all duration-300 ease-daf hover:border-border-hi hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
      <div
        className="relative flex h-[150px] items-start justify-between p-4"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(circle at 80% 70%, rgba(47,230,176,0.28), transparent 55%)',
          backgroundColor: '#14141f'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '22px 22px'
          }}
        />
        <span className="relative z-[1] rounded-lg border border-border-hi bg-bg/70 px-2.5 py-1.5 text-center font-mono text-[11px] leading-tight backdrop-blur-md">
          LVL
          <b className="block text-[15px] text-mint">{workshop.level}</b>
        </span>
        <span className="relative z-[1] h-fit rounded-md border border-border bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {workshop.format}
        </span>
      </div>

      <div className="p-6">
        <h4 className="mb-2 text-[17px] font-semibold">{workshop.title}</h4>
        <p className="mb-[18px] text-[13.5px] text-text-muted">{workshop.description}</p>
        <div className="mb-[18px] flex flex-wrap gap-2">
          {workshop.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-blue/25 bg-blue/10 px-2.5 py-1 font-mono text-[11px] text-blue"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <Link href={`/workshops/${workshop.slug}`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
            Details
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-daf group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
