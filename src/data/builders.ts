export type BuilderItem = {
  username: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  featured?: boolean;
};

// Sample/placeholder content. Wire this up to a real member directory (CMS-backed or
// GitHub-org-membership-backed — see PRD §7.3) once real builder profiles exist.
export const BUILDERS: BuilderItem[] = [
  {
    username: 'core-mentor-1',
    name: 'Community Mentor',
    role: 'Frontend Mentor',
    bio: 'Runs the React and frontend-focused workshops and reviews first-time contributor PRs.',
    skills: ['React', 'TypeScript', 'Accessibility'],
    githubUrl: 'https://github.com/devallianceforge'
  },
  {
    username: 'core-mentor-2',
    name: 'Community Mentor',
    role: 'Backend Mentor',
    bio: 'Leads the API design and systems sessions, and mentors open-source sprint teams.',
    skills: ['Node.js', 'Databases', 'System Design'],
    githubUrl: 'https://github.com/devallianceforge'
  },
  {
    username: 'community-builder-1',
    name: 'Active Contributor',
    role: 'Builder',
    bio: 'Regular at build nights, currently contributing to the DAF Resource Hub project.',
    skills: ['Next.js', 'Open Source'],
    githubUrl: 'https://github.com/devallianceforge'
  }
];

export function getBuilderByUsername(username: string) {
  return BUILDERS.find((builder) => builder.username === username);
}
