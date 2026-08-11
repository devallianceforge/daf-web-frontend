import type { Metadata } from 'next';
import { PillarsSection } from '@/components/PillarsSection';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About — Dev Alliance Forge',
  description: 'The mission and story behind Dev Alliance Forge.'
};

export default function AboutPage() {
  return (
    <div className="pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6 pb-[80px]">
        <Reveal className="max-w-[760px]">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            About DAF
          </span>
          <h1 className="mb-6 font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            Your alliance for innovation, your forge for impact.
          </h1>
          <p className="text-lg text-text-muted">
            Dev Alliance Forge is a volunteer-driven community where passionate students, developers,
            and IT professionals and beyond come together to learn, build, and elevate. We forge new
            skills by sharing tutorials, building projects, and real-world best practices. We mentor
            each other through peer-to-peer sessions and open-source sprints. And we bridge global
            standards and local needs, turning ideas into working solutions. Whether you&apos;re just
            starting out or looking to level up, DAF is here to help you craft the future of tech.
          </p>
        </Reveal>
      </div>
      <PillarsSection />
    </div>
  );
}
