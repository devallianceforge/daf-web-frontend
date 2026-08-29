import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';

export function BlogPostFooter() {
  return (
    <div className="mt-16 border-t border-border pt-10">
      <div className="flex flex-col gap-6 rounded-[24px] border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="font-mono text-[11px] text-mint">
            $ continue --exploring
          </div>

          <h3 className="mt-2 font-display text-xl font-semibold">
            Finished this one?
          </h3>

          <p className="mt-2 text-[13px] text-text-muted">
            Head back to the forge and discover another article.
          </p>
        </div>

        <Link
          href="/blog"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-border-hi px-5 py-3 text-sm font-semibold transition-all duration-300 hover:border-mint/40 hover:text-mint"
        >
          Explore more posts

          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}