export type WorkshopItem = {
  slug: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  format: 'Online' | 'Hybrid' | 'In-person';
  tags: string[];
  // Detail-page fields
  prerequisites?: string[];
  curriculum?: { title: string; description: string }[];
  instructor?: { name: string; role: string };
};

// Sample/placeholder content. Wire this up to the CMS (see PRD §9) to go live.
export const WORKSHOPS: WorkshopItem[] = [
  {
    slug: 'git-github-from-zero',
    title: 'Git & GitHub from Zero',
    description: 'Version control fundamentals for first-time contributors.',
    level: 'Beginner',
    format: 'Online',
    tags: ['Git', 'Fundamentals'],
    prerequisites: ['A GitHub account', 'A laptop with Git installed'],
    curriculum: [
      { title: 'Why version control', description: 'Mental model, repos, commits, history.' },
      { title: 'The core workflow', description: 'clone, add, commit, push, pull — hands-on.' },
      { title: 'Branching & PRs', description: 'Branches, opening your first pull request.' },
      { title: 'Fixing mistakes', description: 'Undoing commits, resolving merge conflicts.' }
    ],
    instructor: { name: 'DAF Mentor Team', role: 'Community mentors' }
  },
  {
    slug: 'building-with-modern-react',
    title: 'Building with Modern React',
    description: 'Server components, streaming, and the current React mental model.',
    level: 'Intermediate',
    format: 'Hybrid',
    tags: ['React', 'Frontend'],
    prerequisites: ['Comfortable with JavaScript & basic React'],
    curriculum: [
      { title: 'Server vs. Client Components', description: 'When and why to use each.' },
      { title: 'Streaming & Suspense', description: 'Progressive rendering in practice.' },
      { title: 'Data fetching patterns', description: 'Fetching, caching, and revalidation.' },
      { title: 'Build a mini project', description: 'Apply it all in a guided build.' }
    ],
    instructor: { name: 'DAF Mentor Team', role: 'Community mentors' }
  },
  {
    slug: 'shipping-ai-native-products',
    title: 'Shipping AI-Native Products',
    description: 'Practical patterns for building with LLM APIs in production.',
    level: 'Advanced',
    format: 'Online',
    tags: ['AI', 'Product'],
    prerequisites: ['Experience shipping a production web app'],
    curriculum: [
      { title: 'Prompting for products', description: 'Structured outputs, tool use, guardrails.' },
      { title: 'Cost & latency tradeoffs', description: 'Model choice, caching, streaming UX.' },
      { title: 'Evaluation', description: 'How to know your AI feature actually works.' },
      { title: 'Shipping checklist', description: 'What breaks in production and how to prevent it.' }
    ],
    instructor: { name: 'DAF Mentor Team', role: 'Community mentors' }
  }
];

export function getWorkshopBySlug(slug: string) {
  return WORKSHOPS.find((workshop) => workshop.slug === slug);
}
