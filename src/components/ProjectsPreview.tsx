import { PROJECTS } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';
import { MagneticButton } from './MagneticButton';

export function ProjectsPreview() {
  return (
    <section id="projects" className="py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
            Built in the open
          </h2>
          <p className="max-w-[420px] text-[15px] text-text-muted">
            Community-maintained, open-source, and always looking for contributors.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <MagneticButton href="/projects" variant="ghost" size="sm">
            View all projects
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
