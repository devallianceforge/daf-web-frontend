import Link from 'next/link';
import type { BlogPostMeta } from '@/data/blog';
import { ArrowRightIcon } from './icons';

export function BlogCard({ post }: { post: BlogPostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col justify-between rounded-daf border border-border bg-surface p-7 transition-all duration-300 ease-daf hover:-translate-y-1 hover:border-border-hi"
    >
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-mint/25 bg-mint/10 px-2.5 py-1 font-mono text-[11px] text-mint"
            >
              {tag}
            </span>
          ))}
        </div>
        <h4 className="mb-2 text-[17px] font-semibold">{post.title}</h4>
        <p className="text-[13.5px] text-text-muted">{post.excerpt}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-xs text-text-dim">
          {formattedDate} &middot; {post.readTime}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
          Read
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-daf group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
