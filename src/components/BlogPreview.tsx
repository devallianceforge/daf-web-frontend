import { BLOG_POSTS } from '@/data/blog';
import { BlogCard } from './BlogCard';
import { Reveal } from './Reveal';
import { MagneticButton } from './MagneticButton';

export function BlogPreview() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 2);

  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
            From the blog
          </h2>
          <p className="max-w-[420px] text-[15px] text-text-muted">
            Tutorials, community stories, and recaps.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <MagneticButton href="/blog" variant="ghost" size="sm">
            Read all posts
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
