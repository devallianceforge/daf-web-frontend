import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import { BlogCard } from '@/components/BlogCard';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Blog — Dev Alliance Forge',
  description: 'Tutorials, community stories, and recaps from Dev Alliance Forge.'
};

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 max-w-[640px]">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            Blog
          </span>
          <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            Tutorials, stories, and recaps.
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
