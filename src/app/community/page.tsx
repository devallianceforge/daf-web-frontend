import type { Metadata } from 'next';
import { CommunitySection } from '@/components/CommunitySection';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Community — Dev Alliance Forge',
  description: 'Join the DAF community across Discord, WhatsApp, Telegram, GitHub, and more.'
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
      <CommunitySection compact />
    </div>
  );
}
