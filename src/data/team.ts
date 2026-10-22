export type TeamItem = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
};

// Sample/placeholder content. Replace these with the real organizing committee's
// names, bios, and social links before launch — see docs/CONTENT_GUIDE.md.
export const TEAM: TeamItem[] = [
  {
    name: 'Community Lead',
    role: 'Organizing Committee',
    bio: 'Coordinates the community calendar, workshops, and partnerships.',
    skills: ['Community', 'Events'],
    githubUrl: 'https://github.com/devallianceforge'
  },
  {
    name: 'Events Lead',
    role: 'Organizing Committee',
    bio: 'Runs meetups, hackathons, and build nights end to end.',
    skills: ['Events', 'Ops'],
    githubUrl: 'https://github.com/devallianceforge'
  },
  {
    name: 'Workshops Lead',
    role: 'Learning & Mentorship',
    bio: 'Curates the workshop track and lines up mentors and instructors.',
    skills: ['Mentorship', 'Curriculum'],
    githubUrl: 'https://github.com/devallianceforge'
  },
  {
    name: 'Open Source Lead',
    role: 'Projects & Sprints',
    bio: 'Stewards the org repos and keeps open-source sprints shipping.',
    skills: ['Open Source', 'GitHub'],
    githubUrl: 'https://github.com/devallianceforge'
  },
  {
    name: 'Design & Brand',
    role: 'Creative',
    bio: 'Owns the visual identity, content, and design system.',
    skills: ['Design', 'Content'],
    linkedinUrl: 'https://www.linkedin.com/company/dev-alliance-forge'
  },
  {
    name: 'Platform / Web Core',
    role: 'Engineering',
    bio: 'Builds and maintains the DAF website and developer infrastructure.',
    skills: ['Web', 'Platform'],
    githubUrl: 'https://github.com/devallianceforge'
  }
];