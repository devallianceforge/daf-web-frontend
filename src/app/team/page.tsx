import type { Metadata } from 'next';
import { TEAM } from '@/data/team';
import { Reveal } from '@/components/Reveal';
import { ChannelIcon } from '@/components/icons';
import { getInitials } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Team — Dev Alliance Forge',
  description: 'The organizers and mentors behind Dev Alliance Forge.'
};

export default function TeamPage() {
  return (
    <main className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-6 max-w-[760px]">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            Team
          </span>
          <h1 className="mb-6 font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            The people powering the forge.
          </h1>
          <p className="text-lg text-text-muted">
            DAF is run by volunteers — the organizers, mentors, and maintainers who keep the
            calendar full and the community shipping.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mb-10 max-w-2xl text-sm text-text-dim">
          These profiles are placeholder entries while the real organizing committee is confirmed.
          They follow the same pattern used across the site&apos;s sample data, and swap straight
          out for the real team without any page changes.
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-4 rounded-daf border border-border bg-surface p-7 transition-colors duration-300 ease-daf hover:border-border-hi">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-daf-gradient font-display text-sm font-bold text-[#050508]">
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold">{member.name}</h4>
                    <p className="font-mono text-xs text-mint">{member.role}</p>
                  </div>
                </div>

                <p className="text-[13.5px] leading-6 text-text-muted">{member.bio}</p>

                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-border pt-4">
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on GitHub`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
                    >
                      <ChannelIcon icon="github" className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
                    >
                      <ChannelIcon icon="linkedin" className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}