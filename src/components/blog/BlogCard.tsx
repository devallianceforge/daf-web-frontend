import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostMeta } from '@/data/blog';
import { ArrowRightIcon } from '@/components/icons';

export function BlogCard({ post }: { post: BlogPostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1.5 hover:border-border-hi"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 85% 0%, rgba(124,58,237,0.12), transparent 35%)'
        }}
      />

      {post.coverImageUrl && (
        <div className="relative -mt-7 -mx-7 mb-7 h-[160px]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-mint/20 bg-mint/[0.07] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-mint"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em]">
          {post.title}
        </h3>

        <p className="mt-4 flex-1 text-[14px] leading-6 text-text-muted">
          {post.excerpt}
        </p>

        <div className="mt-8 border-t border-border pt-5">
          <div className="mb-4 text-[13px] font-medium text-text">
            {post.author}
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] text-text-dim">
              {formattedDate} · {post.readTime}
            </span>

            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mint">
              Read
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-daf group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>

        {/* Terminal-style hover cue */}
        <div className="pointer-events-none absolute right-0 top-0 font-mono text-[10px] text-text-dim opacity-0 transition-all duration-300 group-hover:translate-x-[-2px] group-hover:opacity-70">
          $ open
        </div>
      </div>
    </Link>
  );
}