import Link from 'next/link';

import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';

import type {
  WorkshopItem,
  WorkshopTrack
} from '@/data/workshops';

export function WorkshopTracks({
  workshops,
  tracks
}: {
  workshops: WorkshopItem[];
  tracks: WorkshopTrack[];
}) {
  const availableTracks = tracks
    .map((track) => {
      const matchingWorkshops = workshops.filter(
        (workshop) => workshop.level === track.level
      );

      if (!matchingWorkshops.length) {
        return null;
      }

      const topics = Array.from(
        new Set(
          matchingWorkshops.flatMap((workshop) => workshop.tags)
        )
      ).slice(0, 4);

      return {
        ...track,
        topics,
        count: matchingWorkshops.length,
        href: `/workshops?level=${encodeURIComponent(track.level)}`
      };
    })
    .filter(
      (
        track
      ): track is WorkshopTrack & {
        topics: string[];
        count: number;
        href: string;
      } => track !== null
    );

  if (!availableTracks.length) return null;

  return (
    <section className="border-t border-border py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mint">
              Learning tracks
            </span>

            <h2 className="mt-3 max-w-[650px] font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-tight">
              Don&apos;t collect workshops.
              <span className="block text-text-muted">
                Build a progression.
              </span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[14px] leading-6 text-text-muted">
            Explore workshops by skill level and follow a path that matches
            where you are in your development journey.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {availableTracks.map((track, index) => (
            <Reveal
              key={track.level}
              delay={index * 0.08}
            >
              <Link
                href={track.href}
                className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 0%, rgba(47,230,176,0.08), transparent 42%), radial-gradient(circle at 0% 100%, rgba(124,58,237,0.10), transparent 45%)'
                  }}
                />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                      track_{String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="rounded-full border border-mint/20 bg-mint/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                      {track.level}
                    </span>
                  </div>

                  <h3 className="font-display text-[24px] font-semibold leading-tight">
                    {track.title}
                  </h3>

                  <p className="mt-4 text-[13.5px] leading-6 text-text-muted">
                    {track.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {track.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md border border-border bg-[#09090f]/60 px-2.5 py-1 font-mono text-[10px] text-text-muted"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="font-mono text-[10px] text-text-dim">
                    {track.count}{' '}
                    {track.count === 1
                      ? 'workshop'
                      : 'workshops'}
                  </span>

                  <span className="inline-flex items-center gap-2 font-mono text-[10px] text-mint">
                    explore_track()
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}