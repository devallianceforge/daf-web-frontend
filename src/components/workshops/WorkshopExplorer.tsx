'use client';

import { useMemo, useState } from 'react';
import type { WorkshopItem } from '@/data/workshops';
import { WorkshopCard } from './WorkshopCard';

type WorkshopExplorerProps = {
  workshops: WorkshopItem[];
};

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const FORMATS = ['All', 'Online', 'Hybrid', 'In-person'];

export function WorkshopExplorer({
  workshops
}: WorkshopExplorerProps) {
  const [activeLevel, setActiveLevel] = useState('All');
  const [activeFormat, setActiveFormat] = useState('All');
  const [activeTopic, setActiveTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = useMemo(() => {
    return [
      'All',
      ...Array.from(
        new Set(
          workshops.flatMap((workshop) => workshop.tags)
        )
      )
    ];
  }, [workshops]);

  const filteredWorkshops = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return workshops.filter((workshop) => {
      const matchesLevel =
        activeLevel === 'All' || workshop.level === activeLevel;

      const matchesFormat =
        activeFormat === 'All' || workshop.format === activeFormat;

      const matchesTopic =
        activeTopic === 'All' ||
        workshop.tags.some(
          (tag) => tag.toLowerCase() === activeTopic.toLowerCase()
        );

      const matchesSearch =
        !query ||
        workshop.title.toLowerCase().includes(query) ||
        workshop.description.toLowerCase().includes(query) ||
        workshop.level.toLowerCase().includes(query) ||
        workshop.format.toLowerCase().includes(query) ||
        workshop.instructor?.name.toLowerCase().includes(query) ||
        workshop.instructor?.role.toLowerCase().includes(query) ||
        workshop.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        ) ||
        workshop.prerequisites?.some((item) =>
          item.toLowerCase().includes(query)
        ) ||
        workshop.curriculum?.some(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

      return (
        matchesLevel &&
        matchesFormat &&
        matchesTopic &&
        matchesSearch
      );
    });
  }, [
    activeFormat,
    activeLevel,
    activeTopic,
    searchQuery,
    workshops
  ]);

  const hasFilters =
    activeLevel !== 'All' ||
    activeFormat !== 'All' ||
    activeTopic !== 'All' ||
    searchQuery.trim().length > 0;

  function resetFilters() {
    setActiveLevel('All');
    setActiveFormat('All');
    setActiveTopic('All');
    setSearchQuery('');
  }

  return (
    <div>
      <div className="mb-9 overflow-hidden rounded-[22px] border border-border bg-surface/70">
        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px] lg:items-end">
          <div className="space-y-4">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                Level
              </div>

              <div className="flex flex-wrap gap-2">
                {LEVELS.map((level) => {
                  const active = activeLevel === level;

                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setActiveLevel(level)}
                      className={`rounded-full border px-4 py-2 font-mono text-[11px] transition-all duration-300 ease-daf ${
                        active
                          ? 'border-mint/40 bg-mint/10 text-mint'
                          : 'border-border bg-transparent text-text-muted hover:border-border-hi hover:text-text'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                Format
              </div>

              <div className="flex flex-wrap gap-2">
                {FORMATS.map((format) => {
                  const active = activeFormat === format;

                  return (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setActiveFormat(format)}
                      className={`rounded-full border px-4 py-2 font-mono text-[11px] transition-all duration-300 ease-daf ${
                        active
                          ? 'border-blue/40 bg-blue/10 text-blue'
                          : 'border-border bg-transparent text-text-muted hover:border-border-hi hover:text-text'
                      }`}
                    >
                      {format}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                Topic
              </div>

              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => {
                  const active = activeTopic === topic;

                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setActiveTopic(topic)}
                      className={`rounded-full border px-4 py-2 font-mono text-[11px] transition-all duration-300 ease-daf ${
                        active
                          ? 'border-purple-400/40 bg-purple-400/10 text-purple-300'
                          : 'border-border bg-transparent text-text-muted hover:border-border-hi hover:text-text'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
              Search
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[12px] text-mint">
                $
              </span>

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="search workshops..."
                aria-label="Search workshops"
                className="w-full rounded-full border border-border bg-[#09090f] py-3 pl-8 pr-4 font-mono text-[12px] text-text outline-none transition-all duration-300 placeholder:text-text-dim focus:border-mint/40 focus:ring-2 focus:ring-mint/[0.06]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-text-dim">
          <span>
            {filteredWorkshops.length}{' '}
            {filteredWorkshops.length === 1
              ? 'workshop'
              : 'workshops'}{' '}
            found
          </span>

          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-mint transition-opacity hover:opacity-70"
            >
              clear filters
            </button>
          )}
        </div>
      </div>

      {filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard
              key={workshop.slug}
              workshop={workshop}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-border bg-surface/40 px-6 py-16 text-center">
          <div className="font-mono text-sm text-mint">
            $ no-workshops
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold">
            Nothing matched your learning goal.
          </h3>

          <p className="mx-auto mt-3 max-w-[460px] text-sm leading-6 text-text-muted">
            Try another skill level, topic, format, or keyword
            to find a workshop that fits.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-full border border-border-hi px-5 py-2.5 font-mono text-[11px] text-text transition-all hover:border-mint/40 hover:text-mint"
          >
            reset explorer
          </button>
        </div>
      )}
    </div>
  );
}