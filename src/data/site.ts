export const SITE = {
  name: 'Dev Alliance Forge',
  shortName: 'DAF',
  tagline: 'Your alliance for innovation, your forge for impact.',
  description:
    'Dev Alliance Forge (DAF) is a volunteer-driven developer community. Forge new skills, mentor each other, and build the future of tech — together.',
  email: 'devallianceforge@gmail.com',
  url: 'https://devallianceforge.site'
};

export const HERO = {
  bootMessages: [
    '$ daf --init',
    '$ compiling community...',
    '$ loading community builders... done',
    '$ ready.'
  ],
  headline: ['We forge', 'developers,', 'not just code.'],
  subhead:
    'Dev Alliance Forge is a volunteer-driven community where students, developers, and IT professionals learn, build, and elevate — together. Your alliance for innovation, your forge for impact.',
  primaryCta: { label: 'Join the Community', href: '/join' },
  secondaryCta: { label: 'Explore Events', href: '/events' }
};

export const JOIN = {
  eyebrow: '$ daf --join',
  headline: 'Join the forge.',
  subhead:
    'Pick a channel that fits how you work, say hello, and start building with the community.',
  primaryCta: { label: 'Start on Discord', href: 'https://discord.gg/uje6kkBkkg' },
  secondaryCta: { label: 'Explore the community', href: '/community' },
  whyEyebrow: 'Why DAF',
  whyTitle: 'Show up, build, grow.',
  steps: [
    {
      title: 'Pick your channel',
      text: 'Discord is the main hub; WhatsApp and Telegram are right there if you prefer quick chats.'
    },
    {
      title: 'Say hello',
      text: 'Introduce yourself in #introductions and tell the community what you are building or learning.'
    },
    {
      title: 'Build with us',
      text: 'Join a build night, an open-source sprint, or a workshop — mentors are on hand every step.'
    }
  ]
};

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Community', href: '/community' },
  { label: 'Join', href: '/join' },
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
  { label: 'Community Builders', value: 500, suffix: '+' },
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
