import Link from 'next/link';
import Image from 'next/image';
import type { BuilderItem } from '@/data/builders';
import { getInitials } from '@/lib/utils';
import { ArrowRightIcon } from './icons';

export function BuilderCard({ builder }: { builder: BuilderItem }) {
  return (
    <Link
      href={`/community/${builder.username}`}
      className="group flex h-full flex-col gap-4 rounded-daf border border-border bg-surface p-6 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi"
    >
      <div className="flex items-center gap-4">
        {builder.avatarUrl ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={builder.avatarUrl}
              alt={builder.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-daf-gradient font-display text-sm font-bold text-[#050508]">
            {getInitials(builder.name)}
          </div>
        )}
        <div>
          <h4 className="text-[15px] font-semibold">{builder.name}</h4>
          <p className="text-xs text-text-dim">{builder.role}</p>
        </div>
      </div>

      <p className="text-[13.5px] text-text-muted">{builder.bio}</p>

      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {builder.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-mint/25 bg-mint/10 px-2.5 py-1 font-mono text-[11px] text-mint"
          >
            {skill}
          </span>
        ))}
      </div>

      <span className="inline-flex items-center gap-1.5 border-t border-border pt-4 text-[13px] font-semibold">
        View profile
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-daf group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
