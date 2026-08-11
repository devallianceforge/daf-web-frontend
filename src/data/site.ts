export const SITE = {
  name: 'Dev Alliance Forge',
  shortName: 'DAF',
  tagline: 'Your alliance for innovation, your forge for impact.',
  description:
    'Dev Alliance Forge (DAF) is a volunteer-driven developer community. Forge new skills, mentor each other, and build the future of tech — together.',
  email: 'devallianceforge@gmail.com'
};

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Community', href: '/community' },
  { label: 'Contact', href: '/contact' }
];

export type Stat = {
  label: string;
  value?: number;
  suffix?: string;
  display?: string;
};

export const STATS: Stat[] = [
  { label: 'Total Events', value: 40, suffix: '+' },
  { label: 'Workshops', value: 25, suffix: '+' },
  { label: 'Builders', value: 500, suffix: '+' },
  { label: 'Community Support', display: '24/7' }
];

export const PILLARS = [
  {
    tag: '01 — skills',
    title: 'Forge Skills',
    description:
      'Tutorials, real projects, and hard-won best practices — shared openly so every builder levels up faster.',
    icon: 'code'
  },
  {
    tag: '02 — people',
    title: 'Mentor Each Other',
    description:
      'Peer-to-peer sessions and open-source sprints where experience flows both ways.',
    icon: 'users'
  },
  {
    tag: '03 — impact',
    title: 'Bridge Standards',
    description:
      'Global best practices, local context — turning ambition into working solutions people actually use.',
    icon: 'globe'
  }
] as const;
