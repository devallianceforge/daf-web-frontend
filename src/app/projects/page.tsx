import type { Metadata } from 'next';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { getGitHubOrgStats } from '@/lib/github';

export const metadata: Metadata = {
  title: 'Projects — Dev Alliance Forge',
  description: 'Open-source projects built and maintained by the DAF community.'
};

export default async function ProjectsPage() {
  // Live data — fetched from GitHub's public API at request/revalidation time, not sample
  // content. Renders nothing if the API call fails, rather than showing a stale or fake number.
  const orgStats = await getGitHubOrgStats('devallianceforge');

  return (
    <section className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
              Open Source
            </span>
            <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
              Built in the open, by the community.
            </h1>
          </div>
          <MagneticButton href="https://github.com/devallianceforge" external variant="ghost" size="sm">
            View org on GitHub
          </MagneticButton>
        </Reveal>

        {orgStats && (
          <Reveal delay={0.05} className="mb-10 flex flex-wrap gap-8 border-y border-border py-5 font-mono text-xs text-text-muted">
            <span>
              <b className="text-mint">{orgStats.publicRepos}</b> public repositories
            </span>
            <span>
              <b className="text-mint">{orgStats.followers}</b> followers
            </span>
            <span className="text-text-dim">— live from the GitHub API</span>
          </Reveal>
        )}

        <Reveal delay={0.1} className="mb-10 max-w-2xl text-sm text-text-dim">
          The projects below are illustrative starting templates while the community&apos;s first
          public repos come together — check the live org link above for what&apos;s actually
          published right now.
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
