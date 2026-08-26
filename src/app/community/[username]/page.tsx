import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BUILDERS, getBuilderByUsername } from '@/data/builders';
import { getInitials } from '@/lib/utils';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { ArrowRightIcon, ChannelIcon } from '@/components/icons';

export function generateStaticParams() {
  return BUILDERS.map((builder) => ({ username: builder.username }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const builder = getBuilderByUsername(username);
  if (!builder) return {};
  return {
    title: `${builder.name} — Dev Alliance Forge`,
    description: builder.bio
  };
}

export default async function BuilderProfilePage({
  params
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const builder = getBuilderByUsername(username);
  if (!builder) notFound();

  return (
    <div className="pt-[160px]">
      <div className="mx-auto max-w-[760px] px-6 pb-[120px]">
        <Reveal>
          <Link
            href="/community"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-text-dim hover:text-mint"
          >
            <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
            Back to community
          </Link>

          <div className="mb-8 flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-daf-gradient font-display text-2xl font-bold text-[#050508]">
              {getInitials(builder.name)}
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold sm:text-3xl">{builder.name}</h1>
              <p className="text-sm text-text-dim">{builder.role}</p>
            </div>
          </div>

          <p className="mb-8 max-w-xl text-lg text-text-muted">{builder.bio}</p>

          <div className="mb-10 flex flex-wrap gap-2">
            {builder.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-mint/25 bg-mint/10 px-2.5 py-1 font-mono text-[11px] text-mint"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {builder.githubUrl && (
              <MagneticButton href={builder.githubUrl} external variant="ghost">
                <ChannelIcon icon="github" className="h-4 w-4" />
                GitHub
              </MagneticButton>
            )}
            {builder.linkedinUrl && (
              <MagneticButton href={builder.linkedinUrl} external variant="ghost">
                <ChannelIcon icon="linkedin" className="h-4 w-4" />
                LinkedIn
              </MagneticButton>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
