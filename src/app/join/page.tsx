import type { Metadata } from 'next';
import { JOIN } from '@/data/site';
import { MagneticButton } from '@/components/MagneticButton';
import { CommunitySection } from '@/components/CommunitySection';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Join — Dev Alliance Forge',
  description:
    'Join Dev Alliance Forge on Discord, WhatsApp, Telegram, GitHub, and more — and start building with the community.'
};

export default function JoinPage() {
  return (
    <main>
      <section className="pb-[80px] pt-[160px]">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
              {JOIN.eyebrow}
            </span>
            <h1 className="mb-6 max-w-[720px] font-display text-[clamp(40px,7vw,72px)] font-semibold leading-[1.02] tracking-tight">
              {JOIN.headline}
            </h1>
            <p className="mb-10 max-w-[560px] text-lg text-text-muted">{JOIN.subhead}</p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton href={JOIN.primaryCta.href} external>
                {JOIN.primaryCta.label}
              </MagneticButton>
              <MagneticButton href={JOIN.secondaryCta.href} variant="ghost">
                {JOIN.secondaryCta.label}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-[120px]">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="mb-12 max-w-[560px]">
            <span className="font-mono text-xs uppercase tracking-wider text-mint">{JOIN.whyEyebrow}</span>
            <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,42px)] font-semibold">
              {JOIN.whyTitle}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {JOIN.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-daf border border-border bg-surface p-7">
                  <span className="font-mono text-xs text-text-dim">0{i + 1}</span>
                  <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm leading-6 text-text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CommunitySection />
    </main>
  );
}