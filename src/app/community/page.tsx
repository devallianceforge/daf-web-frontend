import type { Metadata } from 'next';
import { CommunitySection } from '@/components/CommunitySection';
import { BuilderCard } from '@/components/BuilderCard';
import { Reveal } from '@/components/Reveal';
import { BUILDERS } from '@/data/builders';

export const metadata: Metadata = {
  title: 'Community — Dev Alliance Forge',
  description:
    'Meet the community builders behind DAF and join the community across Discord, WhatsApp, Telegram, GitHub, and more.'
};

export default function CommunityPage() {
  return (
    <div className="pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="max-w-[640px]">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            Community
          </span>
          <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            One alliance, everywhere you already are.
          </h1>
        </Reveal>
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold">Meet the community builders</h2>
            <p className="max-w-[380px] text-sm text-text-muted">
              A sample of the people organizing, mentoring, and shipping inside DAF.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BUILDERS.map((builder, i) => (
              <Reveal key={builder.username} delay={i * 0.06}>
                <BuilderCard builder={builder} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CommunitySection compact />
    </div>
  );
}
