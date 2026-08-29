'use client';

import { useMemo, useState } from 'react';
import type { EventItem } from '@/data/events';
import { EventCard } from './EventCard';

type EventExplorerProps = {
  events: EventItem[];
};

const TYPES = ['All', 'Hackathon', 'Open Source', 'Networking', 'Demos'];
const FORMATS = ['All', 'Online', 'Hybrid', 'In-person'];

export function EventExplorer({ events }: EventExplorerProps) {
  const [activeType, setActiveType] = useState('All');
  const [activeFormat, setActiveFormat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const matchesType =
        activeType === 'All' ||
        event.tags.some(
          (tag) => tag.toLowerCase() === activeType.toLowerCase()
        );

      const matchesFormat =
        activeFormat === 'All' || event.format === activeFormat;

      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.format.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query) ||
        event.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesType && matchesFormat && matchesSearch;
    });
  }, [activeFormat, activeType, events, searchQuery]);

  const hasFilters =
    activeType !== 'All' ||
    activeFormat !== 'All' ||
    searchQuery.trim().length > 0;

  function resetFilters() {
    setActiveType('All');
    setActiveFormat('All');
    setSearchQuery('');
  }

  return (
    <div>
      <div className="mb-9 overflow-hidden rounded-[22px] border border-border bg-surface/70">
        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px] lg:items-end">
          <div className="space-y-4">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                Event type
              </div>

              <div className="flex flex-wrap gap-2">
                {TYPES.map((type) => {
                  const active = activeType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveType(type)}
                      className={`rounded-full border px-4 py-2 font-mono text-[11px] transition-all duration-300 ease-daf ${
                        active
                          ? 'border-mint/40 bg-mint/10 text-mint'
                          : 'border-border bg-transparent text-text-muted hover:border-border-hi hover:text-text'
                      }`}
                    >
                      {type}
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
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="search events..."
                aria-label="Search events"
                className="w-full rounded-full border border-border bg-[#09090f] py-3 pl-8 pr-4 font-mono text-[12px] text-text outline-none transition-all duration-300 placeholder:text-text-dim focus:border-mint/40 focus:ring-2 focus:ring-mint/[0.06]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-text-dim">
          <span>
            {filteredEvents.length}{' '}
            {filteredEvents.length === 1 ? 'event' : 'events'} found
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

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-border bg-surface/40 px-6 py-16 text-center">
          <div className="font-mono text-sm text-mint">$ no-events</div>

          <h3 className="mt-4 font-display text-2xl font-semibold">
            Nothing matched your search.
          </h3>

          <p className="mx-auto mt-3 max-w-[460px] text-sm leading-6 text-text-muted">
            Try another keyword, event type, or format to discover what&apos;s
            happening across DAF.
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