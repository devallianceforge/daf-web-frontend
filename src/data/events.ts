export type EventItem = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  dateLabel: { month: string; day: string };
  format: 'Online' | 'Hybrid' | 'In-person';
  tags: string[];
  coverImageUrl?: string;
  // Detail-page fields
  location?: string;
  agenda?: { time: string; title: string }[];
  speakers?: { name: string; role: string }[];
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
    tags: ['Open Source', 'All levels'],
    location: 'Dhaka Hub + Discord stage',
    agenda: [
      { time: '6:00 PM', title: 'Doors open, pick an issue' },
      { time: '6:30 PM', title: 'Lightning intro to the projects up for grabs' },
      { time: '7:00 PM', title: 'Focused build time, mentors circulating' },
      { time: '9:00 PM', title: 'Demo & merge celebration' }
    ],
    speakers: [
      { name: 'DAF Core Team', role: 'Mentors on rotation' }
    ]
  },
  {
    slug: 'daf-hackathon-2026',
    title: 'DAF Hackathon 2026',
    description: '48 hours, cross-functional teams, real prizes — build something that matters.',
    date: '2026-10-02',
    dateLabel: { month: 'OCT', day: '02' },
    format: 'Online',
    tags: ['Hackathon', 'Teams'],
    location: 'Fully online — Discord + submission portal',
    agenda: [
      { time: 'Day 1, 10:00 AM', title: 'Kickoff, team formation, theme reveal' },
      { time: 'Day 1, 12:00 PM', title: 'Building begins' },
      { time: 'Day 2, 6:00 PM', title: 'Submissions close' },
      { time: 'Day 2, 8:00 PM', title: 'Live demos & judging' }
    ],
    speakers: [
      { name: 'DAF Organizing Committee', role: 'Hosts & judges' }
    ]
  },
  {
    slug: 'builder-meetup-dhaka',
    title: 'Builder Meetup: Dhaka Chapter',
    description: 'Lightning talks, demos, and networking with the local DAF chapter.',
    date: '2026-10-21',
    dateLabel: { month: 'OCT', day: '21' },
    format: 'In-person',
    tags: ['Networking', 'Demos'],
    location: 'Dhaka (venue announced closer to the date)',
    agenda: [
      { time: '5:30 PM', title: 'Doors open & networking' },
      { time: '6:15 PM', title: 'Lightning talks (5 min each)' },
      { time: '7:15 PM', title: 'Open demos & project showcase' },
      { time: '8:00 PM', title: 'Community hangout' }
    ],
    speakers: [
      { name: 'Local chapter members', role: 'Speakers & demo builders' }
    ]
  }
];

export function getEventBySlug(slug: string) {
  return EVENTS.find((event) => event.slug === slug);
}
