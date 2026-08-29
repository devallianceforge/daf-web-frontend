import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';

export function BlogPostHeader({
  title,
  date,
  readTime,
  tags,
  author
}: {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="relative mb-14 overflow-hidden rounded-[28px] border border-border bg-surface px-6 py-9 sm:px-9 sm:py-11">
      <div
        className="pointer-events-none absolute right-[-120px] top-[-140px] h-[340px] w-[340px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)'
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] text-text-dim transition-colors hover:text-mint"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
          back_to_blog()
        </Link>

        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-mint/20 bg-mint/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="max-w-[900px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {title}
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6 font-mono text-[11px] text-text-dim">
          <span className="text-text">{author}</span>
          <span>•</span>
          <time dateTime={date}>{formattedDate}</time>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </div>
    </header>
  );
}