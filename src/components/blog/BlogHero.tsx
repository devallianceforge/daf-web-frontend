import { Reveal } from '@/components/Reveal';

export function BlogHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-[160px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-420px] h-[760px] w-[900px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.14), rgba(59,130,246,0.05) 38%, transparent 68%)'
        }}
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '52px 52px'
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Reveal className="max-w-[850px]">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            <span>$ explore --knowledge</span>
          </div>

          <h1 className="font-display text-[clamp(46px,7vw,82px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Learn. Build.
            <span className="block bg-daf-gradient bg-clip-text text-transparent">
              Share. Repeat.
            </span>
          </h1>

          <p className="mt-7 max-w-[650px] text-[17px] leading-7 text-text-muted md:text-lg">
            Technical guides, community stories, project breakdowns, and lessons
            shared by the builders inside Dev Alliance Forge.
          </p>

          <div className="mt-9 flex flex-wrap gap-2">
            {['Engineering', 'Open Source', 'Career', 'Community'].map(
              (topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border bg-surface/60 px-4 py-2 font-mono text-[11px] text-text-muted"
                >
                  {topic}
                </span>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}