import Link from 'next/link';
import type { BlogPostMeta } from '@/data/blog';
import { ArrowRightIcon } from '@/components/icons';

export function FeaturedBlogCard({ post }: { post: BlogPostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-[28px] border border-border bg-surface transition-all duration-500 ease-daf hover:-translate-y-1 hover:border-border-hi"
    >
      {/* Ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 85% 10%, rgba(124,58,237,0.18), transparent 36%), radial-gradient(circle at 65% 100%, rgba(47,230,176,0.08), transparent 35%)'
        }}
      />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative grid min-h-[430px] grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-mint">
                Featured
              </span>

              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] text-text-dim"
                >
                  #{tag.toLowerCase().replace(/\s+/g, '-')}
                </span>
              ))}
            </div>

            <h2 className="max-w-[720px] font-display text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.025em]">
              {post.title}
            </h2>

            <p className="mt-6 max-w-[650px] text-[15px] leading-7 text-text-muted md:text-base">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
            <div>
              <div className="text-sm font-medium text-text">
                {post.author}
              </div>

              <div className="mt-1 font-mono text-[11px] text-text-dim">
                {formattedDate} · {post.readTime}
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-mint">
              Read featured story
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-daf group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>

        {/* Decorative terminal panel */}
        <div className="relative hidden overflow-hidden border-l border-border lg:block">
          <div className="absolute inset-0 bg-[#09090f]/70" />

          <div className="relative flex h-full flex-col justify-center p-10 font-mono">
            <div className="mb-5 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-text-dim/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-text-dim/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-text-dim/30" />
            </div>

            <div className="space-y-3 text-[13px]">
              <p className="text-text-dim">
                <span className="text-mint">$</span> daf read
              </p>

              <p>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">knowledge</span>{' '}
                <span className="text-text-dim">=</span>{' '}
                <span className="text-mint">
                  &quot;shared&quot;
                </span>
              </p>

              <p>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">builders</span>{' '}
                <span className="text-text-dim">=</span>{' '}
                <span className="text-mint">
                  &quot;connected&quot;
                </span>
              </p>

              <p className="pt-3 text-text-dim">
                // forge better developers
              </p>

              <p className="text-mint">
                community.build();
              </p>
            </div>

            <div
              className="absolute bottom-[-90px] right-[-90px] h-[260px] w-[260px] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.25), transparent 65%)'
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}