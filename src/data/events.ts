export type EventItem = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  dateLabel: { month: string; day: string };
  format: 'Online' | 'Hybrid' | 'In-person';
  tags: string[];
};

// Sample/placeholder content. Wire this up to the CMS (see PRD §9) to go live.
export const EVENTS: EventItem[] = [
  {
    slug: 'build-night-open-source-sprint',
    title: 'DAF Build Night: Open Source Sprint',
    description:
      'A focused evening shipping real PRs to community projects, mentors on hand.',
    date: '2026-09-14',
    dateLabel: { month: 'SEP', day: '14' },
    format: 'Hybrid',
    tags: ['Open Source', 'All levels']
  },
  {
    slug: 'daf-hackathon-2026',
    title: 'DAF Hackathon 2026',
    description: '48 hours, cross-functional teams, real prizes — build something that matters.',
    date: '2026-10-02',
    dateLabel: { month: 'OCT', day: '02' },
    format: 'Online',
    tags: ['Hackathon', 'Teams']
  },
  {
    slug: 'builder-meetup-dhaka',
    title: 'Builder Meetup: Dhaka Chapter',
    description: 'Lightning talks, demos, and networking with the local DAF chapter.',
    date: '2026-10-21',
    dateLabel: { month: 'OCT', day: '21' },
    format: 'In-person',
    tags: ['Networking', 'Demos']
  }
];
