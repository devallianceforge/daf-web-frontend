import { CHANNELS } from '@/data/channels';
import { ChannelIcon } from './icons';
import { Reveal } from './Reveal';

export function CommunitySection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="community" className={compact ? 'py-16' : 'py-[120px]'}>
      <div className="mx-auto max-w-[1240px] px-6">
        {!compact && (
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
              Find us everywhere you build
            </h2>
            <p className="max-w-[420px] text-[15px] text-text-muted">
              Eight channels, one alliance. Jump in wherever you already are.
            </p>
          </Reveal>
        )}

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((channel, i) => (
            <Reveal key={channel.name} delay={i * 0.05}>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col gap-3.5 rounded-2xl border border-border bg-surface p-[22px] transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi"
              >
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-surface-2">
                  <ChannelIcon icon={channel.icon} className="h-[19px] w-[19px] stroke-text" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold">{channel.name}</h4>
                  <p className="text-[12.5px] text-text-dim">{channel.blurb}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-xs text-mint">
                  Open &rarr;
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
