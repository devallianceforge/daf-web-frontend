import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import { Reveal } from '@/components/Reveal';
import { BlogHero } from '@/components/blog/BlogHero';
import { FeaturedBlogCard } from '@/components/blog/FeaturedBlogCard';
import { BlogExplorer } from '@/components/blog/BlogExplorer';
import { DeveloperPaths } from '@/components/blog/DeveloperPaths';
import { FromTheForge } from '@/components/blog/FromTheForge';
import { InsideDAF } from '@/components/blog/InsideDAF';
import { BlogCTA } from '@/components/blog/BlogCTA';

export const metadata: Metadata = {
  title: 'Blog — Dev Alliance Forge',
  description:
    'Technical guides, community stories, project breakdowns, and lessons from Dev Alliance Forge.'
};

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  const [featuredPost, ...remainingPosts] = posts;

  return (
    <main>
      <BlogHero />

      <section className="pb-[120px]">
        <div className="mx-auto max-w-[1240px] px-6">
          {featuredPost && (
            <Reveal>
              <FeaturedBlogCard post={featuredPost} />
            </Reveal>
          )}

          {remainingPosts.length > 0 && (
            <div className="mt-20">
              <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-mint">
                    Explore the forge
                  </span>

                  <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,42px)] font-semibold">
                    Find what you want to learn next.
                  </h2>
                </div>

                <p className="max-w-[420px] text-[14px] leading-6 text-text-muted">
                  Browse technical guides, community stories, career lessons,
                  open-source knowledge, and practical insights from DAF builders.
                </p>
              </Reveal>

              <Reveal>
                <BlogExplorer posts={remainingPosts} />
              </Reveal>
            </div>
          )}
        </div>
      </section>
      < DeveloperPaths/>
      <FromTheForge />
      <InsideDAF />
      <BlogCTA />
    </main>
  );
}