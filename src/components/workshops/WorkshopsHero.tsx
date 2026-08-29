import { Reveal } from '@/components/Reveal';

export function WorkshopsHero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-[140px]">
      <div
        className="pointer-events-none absolute left-1/2 top-[-440px] h-[780px] w-[920px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.14), rgba(47,230,176,0.05) 40%, transparent 68%)'
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '52px 52px'
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Reveal className="max-w-[900px]">
          <div className="mb-5 flex items-center gap-2 font-mono text-xs text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            <span>$ workshops --level-up</span>
          </div>

          <h1 className="font-display text-[clamp(42px,5.8vw,72px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Learn the concept.
            <span className="block bg-daf-gradient bg-clip-text text-transparent">
              Build the skill.
            </span>
          </h1>

          <p className="mt-6 max-w-[700px] text-[16px] leading-7 text-text-muted md:text-[17px]">
            Hands-on sessions designed to take developers from understanding
            an idea to actually using it in projects, workflows, and production.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              'Beginner Friendly',
              'Project Based',
              'Mentor Guided',
              'Practical Skills'
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-surface/60 px-4 py-2 font-mono text-[11px] text-text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}