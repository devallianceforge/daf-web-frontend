import Link from 'next/link';
import type { ProjectItem } from '@/data/projects';
import { ArrowRightIcon } from './icons';

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="group flex h-full flex-col justify-between rounded-daf border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi">
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-violet/25 bg-violet/10 px-2.5 py-1 font-mono text-[11px] text-violet"
            >
              {tag}
            </span>
          ))}
        </div>
        <h4 className="mb-2 text-[17px] font-semibold">{project.name}</h4>
        <p className="text-[13.5px] text-text-muted">{project.description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-xs text-text-dim">{project.contributors} contributors</span>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
        >
          View project
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-daf group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
