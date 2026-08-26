import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS, getProjectBySlug } from '@/data/projects';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { ArrowRightIcon } from '@/components/icons';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Dev Alliance Forge`,
    description: project.description
  };
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="pt-[160px]">
      <div className="mx-auto max-w-[900px] px-6 pb-[120px]">
        <Reveal>
          <Link href="/projects" className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-text-dim hover:text-mint">
            <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
            Back to projects
          </Link>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-violet/25 bg-violet/10 px-2.5 py-1 font-mono text-[11px] text-violet"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-6 font-display text-[clamp(30px,4.5vw,48px)] font-semibold">
            {project.name}
          </h1>
          <p className="mb-4 max-w-2xl text-lg text-text-muted">{project.description}</p>
          <p className="mb-10 font-mono text-xs text-text-dim">{project.contributors} contributors</p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton href={project.repoUrl} external>
              View on GitHub
            </MagneticButton>
            <MagneticButton href="/contact" variant="ghost">
              Ask about contributing
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
