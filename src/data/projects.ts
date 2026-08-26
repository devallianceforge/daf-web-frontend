export type ProjectItem = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  repoUrl: string;
  contributors: number;
};

// Sample/placeholder content. Wire this to the GitHub API (see PRD §8, F5) for live
// stars/contributors once the community's real repos are ready to feature.
export const PROJECTS: ProjectItem[] = [
  {
    slug: 'daf-resource-hub',
    name: 'DAF Resource Hub',
    description:
      'A community-maintained, searchable index of tutorials, roadmaps, and best-practice guides shared across DAF events.',
    tags: ['Next.js', 'TypeScript', 'Docs'],
    repoUrl: 'https://github.com/devallianceforge',
    contributors: 12
  },
  {
    slug: 'daf-event-toolkit',
    name: 'DAF Event Toolkit',
    description:
      'Reusable scripts and templates for running a DAF meetup or hackathon — RSVP forms, judging sheets, and check-in tools.',
    tags: ['Node.js', 'Automation'],
    repoUrl: 'https://github.com/devallianceforge',
    contributors: 7
  },
  {
    slug: 'daf-starter-kits',
    name: 'DAF Starter Kits',
    description:
      'Opinionated starter templates in a few common stacks, used to onboard new contributors quickly during build nights.',
    tags: ['React', 'API', 'Templates'],
    repoUrl: 'https://github.com/devallianceforge',
    contributors: 15
  }
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
