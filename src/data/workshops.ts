export type WorkshopLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type WorkshopFormat = 'Online' | 'Hybrid' | 'In-person';

export type WorkshopStatus =
  | 'Open'
  | 'Coming soon'
  | 'Waitlist'
  | 'Closed';

export type WorkshopCurriculumItem = {
  title: string;
  description: string;
};

export type WorkshopInstructor = {
  name: string;
  role: string;
  bio?: string;
  github?: string;
  linkedin?: string;
};

export type WorkshopResource = {
  label: string;
  href: string;
};

export type WorkshopItem = {
  slug: string;

  title: string;
  description: string;

  level: WorkshopLevel;
  format: WorkshopFormat;
  tags: string[];

  /**
   * Workshop logistics
   */
  date?: string;
  dateLabel?: string;
  time?: string;
  duration?: string;
  location?: string;
  capacity?: number;
  status?: WorkshopStatus;

  /**
   * Learning information
   */
  prerequisites?: string[];
  outcomes?: string[];
  curriculum?: WorkshopCurriculumItem[];

  /**
   * Instructor
   */
  instructor?: WorkshopInstructor;

  /**
   * Optional workshop resources.
   * Useful later for slides, starter repos, docs, recordings, etc.
   */
  resources?: WorkshopResource[];

  /**
   * Can be used by the workshops index page
   * instead of relying on array position.
   */
  featured?: boolean;
};

export type WorkshopTrack = {
  level: WorkshopLevel;
  title: string;
  description: string;
};
export const WORKSHOP_TRACKS: WorkshopTrack[] = [
  {
    level: 'Beginner',
    title: 'Foundation Track',
    description:
      'Build the core workflows and habits you need before moving into larger development projects.'
  },
  {
    level: 'Intermediate',
    title: 'Builder Track',
    description:
      'Strengthen practical engineering skills and move from basic implementation toward production thinking.'
  },
  {
    level: 'Advanced',
    title: 'Advanced Practice Track',
    description:
      'Explore deeper engineering, architecture, product, and production-level development challenges.'
  }
];
/* -------------------------------------------------------------------------- */
/* WORKSHOPS                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Placeholder workshop data.
 *
 * Later this array can be replaced by:
 * - Supabase
 * - CMS data
 * - API data
 *
 * The UI should only depend on the WorkshopItem shape.
 */
export const WORKSHOPS: WorkshopItem[] = [
  {
    slug: 'git-github-from-zero',

    title: 'Git & GitHub from Zero',

    description:
      'Version control fundamentals for first-time contributors.',

    level: 'Beginner',
    format: 'Online',

    tags: ['Git', 'Fundamentals', 'Open Source'],

    featured: true,
    status: 'Open',

    date: '2026-09-20',
    dateLabel: 'September 20, 2026',
    time: '7:00 PM BST',
    duration: '2 hours',

    location: 'DAF Discord Stage',
    capacity: 50,

    prerequisites: [
      'A GitHub account',
      'A laptop with Git installed'
    ],

    outcomes: [
      'Understand how Git tracks project history',
      'Use the essential Git workflow confidently',
      'Create branches and work with pull requests',
      'Resolve common mistakes and merge conflicts'
    ],

    curriculum: [
      {
        title: 'Why version control',
        description:
          'Understand repositories, commits, history, and why teams rely on Git.'
      },
      {
        title: 'The core workflow',
        description:
          'Practice clone, add, commit, push, and pull through a guided repository.'
      },
      {
        title: 'Branching & pull requests',
        description:
          'Create branches and open your first collaborative pull request.'
      },
      {
        title: 'Fixing mistakes',
        description:
          'Learn practical ways to undo changes and resolve merge conflicts.'
      }
    ],

    instructor: {
      name: 'DAF Mentor Team',
      role: 'Community mentors',
      bio:
        'DAF mentors helping developers build strong Git, collaboration, and open-source foundations.'
    },

    resources: [
      {
        label: 'Git Documentation',
        href: 'https://git-scm.com/docs'
      }
    ]
  },

  {
    slug: 'building-with-modern-react',

    title: 'Building with Modern React',

    description:
      'Server components, streaming, and the current React mental model.',

    level: 'Intermediate',
    format: 'Hybrid',

    tags: ['React', 'Frontend', 'Next.js'],

    status: 'Coming soon',

    date: '2026-10-11',
    dateLabel: 'October 11, 2026',
    time: '6:30 PM BST',
    duration: '3 hours',

    location: 'Dhaka Hub + DAF Discord',
    capacity: 40,

    prerequisites: [
      'Comfortable with JavaScript',
      'Basic experience building React applications'
    ],

    outcomes: [
      'Understand Server and Client Component boundaries',
      'Use Suspense and streaming intentionally',
      'Choose appropriate data-fetching strategies',
      'Structure a modern React application more confidently'
    ],

    curriculum: [
      {
        title: 'Server vs. Client Components',
        description:
          'Understand where each model belongs and how component boundaries affect an application.'
      },
      {
        title: 'Streaming & Suspense',
        description:
          'Explore progressive rendering and loading experiences in practice.'
      },
      {
        title: 'Data fetching patterns',
        description:
          'Work with fetching, caching, revalidation, and server-side data.'
      },
      {
        title: 'Build a mini project',
        description:
          'Apply the concepts in a guided React and Next.js build.'
      }
    ],

    instructor: {
      name: 'DAF Frontend Circle',
      role: 'Frontend mentors',
      bio:
        'Developers focused on modern React, frontend architecture, performance, and production web development.'
    }
  },

  {
    slug: 'shipping-ai-native-products',

    title: 'Shipping AI-Native Products',

    description:
      'Practical patterns for building with LLM APIs in production.',

    level: 'Advanced',
    format: 'Online',

    tags: ['AI', 'Product', 'Engineering'],

    status: 'Coming soon',

    date: '2026-11-07',
    dateLabel: 'November 7, 2026',
    time: '7:00 PM BST',
    duration: '3 hours',

    location: 'DAF Discord Stage',
    capacity: 35,

    prerequisites: [
      'Experience shipping a production web application',
      'Basic familiarity with APIs'
    ],

    outcomes: [
      'Design more reliable LLM-powered product flows',
      'Understand model cost and latency tradeoffs',
      'Build basic evaluation strategies',
      'Recognize common production failure modes'
    ],

    curriculum: [
      {
        title: 'Prompting for products',
        description:
          'Work with structured outputs, tool use, context, and guardrails.'
      },
      {
        title: 'Cost & latency tradeoffs',
        description:
          'Compare model choice, caching, streaming, and UX tradeoffs.'
      },
      {
        title: 'Evaluation',
        description:
          'Build practical methods for measuring whether an AI feature actually works.'
      },
      {
        title: 'Shipping checklist',
        description:
          'Review common production problems and techniques for reducing them.'
      }
    ],

    instructor: {
      name: 'DAF AI Circle',
      role: 'AI product mentors',
      bio:
        'Builders exploring practical AI engineering, evaluation, LLM application architecture, and AI product design.'
    }
  }
];

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

export function getWorkshopBySlug(slug: string) {
  return WORKSHOPS.find((workshop) => workshop.slug === slug);
}

export function getFeaturedWorkshop() {
  return WORKSHOPS.find((workshop) => workshop.featured);
}

export function getWorkshopInstructors() {
  const instructors = WORKSHOPS
    .map((workshop) => workshop.instructor)
    .filter(
      (instructor): instructor is WorkshopInstructor =>
        Boolean(instructor)
    );

  return Array.from(
    new Map(
      instructors.map((instructor) => [
        instructor.name,
        instructor
      ])
    ).values()
  );
}

export function getWorkshopTopics() {
  return Array.from(
    new Set(WORKSHOPS.flatMap((workshop) => workshop.tags))
  );
}