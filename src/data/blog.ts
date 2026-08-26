export type BlogPostMeta = {
  slug: string; // matches the folder under src/app/blog/<slug>/page.mdx
  title: string;
  excerpt: string;
  date: string; // ISO date
  readTime: string;
  tags: string[];
  author: string;
};

// This registry powers the /blog index and homepage preview cards. The full article body
// lives in the matching src/app/blog/<slug>/page.mdx file — see docs/CONTENT_GUIDE.md for why
// blog content is split this way (and how that changes once a real CMS is wired up).
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'why-we-started-dev-alliance-forge',
    title: 'Why We Started Dev Alliance Forge',
    excerpt:
      'The gap we kept running into as developers in Bangladesh — and why we decided to build a community around closing it ourselves.',
    date: '2026-08-01',
    readTime: '4 min read',
    tags: ['Community', 'Story'],
    author: 'DAF Founding Team'
  },
  {
    slug: 'first-open-source-pull-request',
    title: '5 Tips for Your First Open Source Pull Request',
    excerpt:
      'Opening your first PR is more about process than skill. Here is what actually trips people up, and how to get past it.',
    date: '2026-08-15',
    readTime: '6 min read',
    tags: ['Open Source', 'Guide'],
    author: 'DAF Mentor Team'
  }
];

export function getPostMeta(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
