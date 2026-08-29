export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
};

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
  },
  {
    slug: 'building-clean-nextjs-project-structure',
    title: 'How to Structure a Next.js Project Without Overcomplicating It',
    excerpt:
      'A practical look at components, features, data, and utilities — and how to keep a growing Next.js project maintainable.',
    date: '2026-08-22',
    readTime: '8 min read',
    tags: ['Engineering', 'Web'],
    author: 'DAF Engineering Team'
  },
  {
    slug: 'git-workflow-for-student-developers',
    title: 'A Git Workflow Every Student Developer Should Know',
    excerpt:
      'Branches, commits, pull requests, and collaboration explained with a workflow you can actually use on real team projects.',
    date: '2026-08-20',
    readTime: '7 min read',
    tags: ['Engineering', 'Open Source'],
    author: 'DAF Mentor Team'
  },
  {
    slug: 'what-junior-developers-should-build',
    title: 'What Junior Developers Should Build Instead of Another Todo App',
    excerpt:
      'Portfolio projects become valuable when they demonstrate real decisions, real users, and real engineering tradeoffs.',
    date: '2026-08-18',
    readTime: '6 min read',
    tags: ['Career', 'Engineering'],
    author: 'DAF Career Circle'
  },
  {
    slug: 'using-ai-without-stopping-learning',
    title: 'How to Use AI Without Stopping Yourself From Learning',
    excerpt:
      'AI can accelerate development, but only if you stay in control of the reasoning, debugging, and architectural decisions.',
    date: '2026-08-17',
    readTime: '7 min read',
    tags: ['AI', 'Career'],
    author: 'DAF AI Circle'
  },
  {
    slug: 'frontend-performance-basics',
    title: 'Frontend Performance Basics Every Web Developer Should Understand',
    excerpt:
      'From image optimization to rendering and bundle size, these fundamentals can make an ordinary website feel dramatically better.',
    date: '2026-08-12',
    readTime: '9 min read',
    tags: ['Web', 'Engineering'],
    author: 'DAF Web Team'
  },
  {
    slug: 'docker-for-developers',
    title: 'Docker for Developers Who Just Want to Understand What It Does',
    excerpt:
      'Containers do not have to feel mysterious. Here is the mental model developers actually need before diving deeper.',
    date: '2026-08-10',
    readTime: '8 min read',
    tags: ['DevOps', 'Engineering'],
    author: 'DAF DevOps Circle'
  },
  {
    slug: 'building-a-developer-community',
    title: 'What Actually Makes a Developer Community Worth Joining?',
    excerpt:
      'Events are not enough. Strong communities create belonging, accountability, mentorship, opportunities, and reasons to keep showing up.',
    date: '2026-08-07',
    readTime: '5 min read',
    tags: ['Community', 'Career'],
    author: 'DAF Community Team'
  },
  {
    slug: 'prepare-for-first-hackathon',
    title: 'How to Prepare for Your First Hackathon',
    excerpt:
      'How to form a team, choose a realistic idea, divide responsibilities, and avoid wasting half the event arguing about scope.',
    date: '2026-08-05',
    readTime: '7 min read',
    tags: ['Career', 'Community'],
    author: 'DAF Events Team'
  }
];

export function getPostMeta(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}