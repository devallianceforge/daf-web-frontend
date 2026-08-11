export type WorkshopItem = {
  slug: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  format: 'Online' | 'Hybrid' | 'In-person';
  tags: string[];
};

// Sample/placeholder content. Wire this up to the CMS (see PRD §9) to go live.
export const WORKSHOPS: WorkshopItem[] = [
  {
    slug: 'git-github-from-zero',
    title: 'Git & GitHub from Zero',
    description: 'Version control fundamentals for first-time contributors.',
    level: 'Beginner',
    format: 'Online',
    tags: ['Git', 'Fundamentals']
  },
  {
    slug: 'building-with-modern-react',
    title: 'Building with Modern React',
    description: 'Server components, streaming, and the current React mental model.',
    level: 'Intermediate',
    format: 'Hybrid',
    tags: ['React', 'Frontend']
  },
  {
    slug: 'shipping-ai-native-products',
    title: 'Shipping AI-Native Products',
    description: 'Practical patterns for building with LLM APIs in production.',
    level: 'Advanced',
    format: 'Online',
    tags: ['AI', 'Product']
  }
];
