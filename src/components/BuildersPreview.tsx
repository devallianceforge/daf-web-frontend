import { BUILDERS } from '@/data/builders';
import { BuilderCard } from './BuilderCard';
import { Reveal } from './Reveal';
import { MagneticButton } from './MagneticButton';

export function BuildersPreview() {
  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
            Meet the community builders
          </h2>
          <p className="max-w-[420px] text-[15px] text-text-muted">
            The people organizing, mentoring, and shipping inside DAF.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BUILDERS.map((builder, i) => (
            <Reveal key={builder.username} delay={i * 0.06}>
              <BuilderCard builder={builder} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <MagneticButton href="/community" variant="ghost" size="sm">
            View the full community
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
