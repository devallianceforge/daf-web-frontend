import Link from 'next/link';
import { ArrowRightIcon } from './icons';

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
    <header className="mb-12">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-text-dim hover:text-mint"
      >
        <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
        Back to blog
      </Link>

      <div className="mb-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-mint/25 bg-mint/10 px-2.5 py-1 font-mono text-[11px] text-mint"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-5 font-display text-[clamp(30px,4.5vw,48px)] font-semibold">{title}</h1>

      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-dim">
        <span>{author}</span>
        <span>&middot;</span>
        <time dateTime={date}>{formattedDate}</time>
        <span>&middot;</span>
        <span>{readTime}</span>
      </div>
    </header>
  );
}
