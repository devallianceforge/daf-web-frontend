'use client';

import { useMemo, useState } from 'react';
import type { BlogPostMeta } from '@/data/blog';
import { BlogCard } from './BlogCard';

type BlogExplorerProps = {
  posts: BlogPostMeta[];
};

const CATEGORIES = [
  'All',
  'Engineering',
  'Open Source',
  'Career',
  'Community',
  'AI',
  'Web',
  'DevOps'
];

export function BlogExplorer({ posts }: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' ||
        post.tags.some(
          (tag) => tag.toLowerCase() === activeCategory.toLowerCase()
        );

      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, searchQuery]);

  return (
    <div>
      {/* Explorer controls */}
      <div className="mb-10 overflow-hidden rounded-[22px] border border-border bg-surface/70">
        <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 font-mono text-[11px] transition-all duration-300 ease-daf ${
                    active
                      ? 'border-mint/40 bg-mint/10 text-mint'
                      : 'border-border bg-transparent text-text-muted hover:border-border-hi hover:text-text'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full lg:max-w-[330px]">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[12px] text-mint">
              $
            </span>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="search articles..."
              aria-label="Search blog articles"
              className="w-full rounded-full border border-border bg-[#09090f] py-3 pl-8 pr-4 font-mono text-[12px] text-text outline-none transition-all duration-300 placeholder:text-text-dim focus:border-mint/40 focus:ring-2 focus:ring-mint/[0.06]"
            />
          </div>
        </div>

        <div className="border-t border-border px-5 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider text-text-dim">
            <span>
              {filteredPosts.length}{' '}
              {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </span>

            {(activeCategory !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="text-mint transition-opacity hover:opacity-70"
              >
                clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Articles */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-border bg-surface/40 px-6 py-20 text-center">
          <div className="font-mono text-sm text-mint">$ no-results</div>

          <h3 className="mt-4 font-display text-2xl font-semibold">
            Nothing found in the forge.
          </h3>

          <p className="mx-auto mt-3 max-w-[460px] text-sm leading-6 text-text-muted">
            Try another keyword or switch categories to discover more articles.
          </p>

          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="mt-6 rounded-full border border-border-hi px-5 py-2.5 font-mono text-[11px] text-text transition-all hover:border-mint/40 hover:text-mint"
          >
            reset explorer
          </button>
        </div>
      )}
    </div>
  );
}