import type { Metadata } from 'next';
import { PARTNER_TIERS, PARTNERS } from '@/data/partners';
import { SITE } from '@/data/site';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';

export const metadata: Metadata = {
  title: 'Partners — Dev Alliance Forge',
  description:
    'Partner with Dev Alliance Forge to reach builders, students, and developers across Bangladesh and beyond.'
};

export default function PartnersPage() {
  const partnershipMailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    'DAF partnership inquiry'
  )}`;

  return (
    <main className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-10 max-w-[760px]">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            Partnerships
          </span>
          <h1 className="mb-6 font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            Grow your reach with DAF.
          </h1>
          <p className="text-lg text-text-muted">
            Partner with a volunteer-driven community of students, developers, and IT professionals
            who learn in public and ship real work. Sponsors get direct access to a builder-first
            audience — through events, workshops, and open-source sprints.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mb-16">
          <MagneticButton href={partnershipMailto} external>
            Become a Partner
          </MagneticButton>
        </Reveal>

        <Reveal className="mb-8">
          <span className="font-mono text-xs uppercase tracking-wider text-mint">Tiers</span>
          <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,42px)] font-semibold">
            Partnership levels
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PARTNER_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-daf border border-border bg-surface p-7">
                <span className="font-mono text-xs text-text-dim">Tier 0{i + 1}</span>
                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                <ul className="mt-auto flex flex-col gap-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-2.5 text-[13.5px] text-text-muted">
                      <span className="text-mint">&gt;</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <span className="font-mono text-xs uppercase tracking-wider text-mint">Logo wall</span>
          <h2 className="mt-3 mb-6 font-display text-[clamp(28px,3.5vw,42px)] font-semibold">
            Who&apos;s building with us
          </h2>
          {PARTNERS.length === 0 ? (
            <div className="rounded-daf border border-dashed border-border bg-surface p-12 text-center">
              <p className="font-mono text-sm text-text-dim">
                $ partners --list
              </p>
              <p className="mt-3 text-sm text-text-muted">
                No partners announced yet. The wall lights up as the first organizations join —
                be the first.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {PARTNERS.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-20 items-center justify-center rounded-daf border border-border bg-surface px-6 font-display text-sm font-semibold text-text-muted transition-colors duration-300 ease-daf hover:border-mint hover:text-text"
                >
                  {partner.name}
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </main>
  );
}