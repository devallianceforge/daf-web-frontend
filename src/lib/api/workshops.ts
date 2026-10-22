import { adminApiFetch } from './admin-client';

export type WorkshopLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type WorkshopFormat = 'Online' | 'Hybrid' | 'In-person';
export type WorkshopStatus = 'Open' | 'Coming soon' | 'Waitlist' | 'Closed';

export type WorkshopCurriculumItem = { title: string; description: string };
export type WorkshopInstructor = {
  name: string;
  role: string;
  bio?: string;
  github?: string;
  linkedin?: string;
};
export type WorkshopResource = { label: string; href: string };

export type WorkshopAdminItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: WorkshopLevel;
  format: WorkshopFormat;
  tags: string[];
  coverImageUrl?: string | null;
  date?: string | null;
  dateLabel?: string | null;
  time?: string | null;
  duration?: string | null;
  location?: string | null;
  capacity?: number | null;
  status?: WorkshopStatus | null;
  prerequisites?: string[] | null;
  outcomes?: string[] | null;
  curriculum?: WorkshopCurriculumItem[] | null;
  instructor?: WorkshopInstructor | null;
  resources?: WorkshopResource[] | null;
  featured?: boolean | null;
};

export type WorkshopBody = {
  slug: string;
  title: string;
  description: string;
  level: WorkshopLevel;
  format: WorkshopFormat;
  tags: string[];
  coverImageUrl?: string | null;
  date?: string | null;
  dateLabel?: string | null;
  time?: string | null;
  duration?: string | null;
  location?: string | null;
  capacity?: number | null;
  status?: WorkshopStatus | null;
  prerequisites?: string[] | null;
  outcomes?: string[] | null;
  curriculum?: WorkshopCurriculumItem[] | null;
  instructor?: WorkshopInstructor | null;
  resources?: WorkshopResource[] | null;
  featured?: boolean | null;
  coverImageDeleteUrl?: string;
};

type WorkshopRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: WorkshopLevel;
  format: WorkshopFormat;
  tags: string[];
  cover_image_url: string | null;
  date: string | null;
  date_label: string | null;
  time: string | null;
  duration: string | null;
  location: string | null;
  capacity: number | null;
  status: WorkshopStatus | null;
  prerequisites: string[] | null;
  outcomes: string[] | null;
  curriculum: WorkshopCurriculumItem[] | null;
  instructor: WorkshopInstructor | null;
  resources: WorkshopResource[] | null;
  featured: boolean | null;
};

function toAdminItem(row: WorkshopRow): WorkshopAdminItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    level: row.level,
    format: row.format,
    tags: row.tags,
    coverImageUrl: row.cover_image_url ?? null,
    date: row.date ?? null,
    dateLabel: row.date_label ?? null,
    time: row.time ?? null,
    duration: row.duration ?? null,
    location: row.location ?? null,
    capacity: row.capacity ?? null,
    status: row.status ?? null,
    prerequisites: row.prerequisites ?? null,
    outcomes: row.outcomes ?? null,
    curriculum: row.curriculum ?? null,
    instructor: row.instructor ?? null,
    resources: row.resources ?? null,
    featured: row.featured ?? null,
  };
}

export async function listWorkshops(): Promise<WorkshopAdminItem[]> {
  const res = await adminApiFetch('/api/admin/workshops');
  const rows = (await res.json()) as WorkshopRow[];
  return rows.map(toAdminItem);
}

export async function getWorkshop(id: string): Promise<WorkshopAdminItem> {
  const res = await adminApiFetch(`/api/admin/workshops/${encodeURIComponent(id)}`);
  return toAdminItem((await res.json()) as WorkshopRow);
}

export async function createWorkshop(body: WorkshopBody): Promise<WorkshopAdminItem> {
  const res = await adminApiFetch('/api/admin/workshops', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return toAdminItem((await res.json()) as WorkshopRow);
}

export async function updateWorkshop(
  id: string,
  body: WorkshopBody,
): Promise<WorkshopAdminItem> {
  const res = await adminApiFetch(`/api/admin/workshops/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return toAdminItem((await res.json()) as WorkshopRow);
}

export async function deleteWorkshop(id: string): Promise<void> {
  await adminApiFetch(`/api/admin/workshops/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}