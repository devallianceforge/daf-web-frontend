import { PILLARS } from '@/data/site';
import { CodeIcon, UsersIcon, GlobeIcon } from './icons';
import { Reveal } from './Reveal';

const ICONS = { code: CodeIcon, users: UsersIcon, globe: GlobeIcon };

export function PillarsSection() {
  return (
    <section id="pillars" className="py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
            Three pillars. One alliance.
          </h2>
          <p className="max-w-[420px] text-[15px] text-text-muted">
            Everything DAF does traces back to how we build together.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            return (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-daf border border-border bg-surface p-9 transition-all duration-300 ease-daf hover:-translate-y-1.5 hover:border-transparent hover:[background:linear-gradient(#0e0e17,#0e0e17)_padding-box,linear-gradient(95deg,#7c3aed,#3b82f6,#2fe6b0)_border-box] hover:[border-width:1px] hover:[border-style:solid]">
                  <div className="mb-5 font-mono text-xs text-text-dim">{pillar.tag}</div>
                  <div className="mb-[22px] flex h-11 w-11 items-center justify-center rounded-xl bg-daf-gradient-soft">
                    <Icon className="h-[22px] w-[22px] stroke-mint" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{pillar.title}</h3>
                  <p className="text-[14.5px] text-text-muted">{pillar.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
