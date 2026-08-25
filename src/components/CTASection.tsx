import { SITE } from '@/data/site';
import { MagneticButton } from './MagneticButton';
import { Reveal } from './Reveal';

export function CTASection() {
  return (
    <section id="join" className="py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-20 text-center sm:px-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'radial-gradient(600px 300px at 30% 0%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(600px 300px at 70% 100%, rgba(47,230,176,0.25), transparent 60%)'
              }}
            />
            <div className="relative z-[1]">
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint shadow-[0_0_12px_var(--color-mint)]" />
                $ daf --join
              </span>
              <h2 className="mb-[18px] font-display text-[clamp(28px,4vw,46px)] font-semibold">
                Ready to forge your future?
              </h2>
              <p className="mx-auto mb-9 max-w-[480px] text-text-muted">
                Free to join. No gatekeeping. Just builders helping builders.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton href="https://discord.gg/uje6kkBkkg" external>
                  Join on Discord
                </MagneticButton>
                <MagneticButton href={`mailto:${SITE.email}`} variant="ghost">
                  Email Us
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
