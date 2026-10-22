import { adminApiFetch } from './admin-client';

export type ProjectAdminItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  repoUrl: string;
  contributors: number;
  coverImageUrl?: string | null;
};

export type ProjectBody = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  repoUrl: string;
  contributors: number;
  coverImageUrl?: string | null;
  coverImageDeleteUrl?: string;
};

type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  repo_url: string;
  contributors: number;
  cover_image_url: string | null;
};

function toAdminItem(row: ProjectRow): ProjectAdminItem {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    tags: row.tags,
    repoUrl: row.repo_url,
    contributors: row.contributors,
    coverImageUrl: row.cover_image_url ?? null,
  };
}

export async function listProjects(): Promise<ProjectAdminItem[]> {
  const res = await adminApiFetch('/api/admin/projects');
  const rows = (await res.json()) as ProjectRow[];
  return rows.map(toAdminItem);
}

export async function getProject(id: string): Promise<ProjectAdminItem> {
  const res = await adminApiFetch(`/api/admin/projects/${encodeURIComponent(id)}`);
  return toAdminItem((await res.json()) as ProjectRow);
}

export async function createProject(body: ProjectBody): Promise<ProjectAdminItem> {
  const res = await adminApiFetch('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return toAdminItem((await res.json()) as ProjectRow);
}

export async function updateProject(
  id: string,
  body: ProjectBody,
): Promise<ProjectAdminItem> {
  const res = await adminApiFetch(`/api/admin/projects/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return toAdminItem((await res.json()) as ProjectRow);
}

export async function deleteProject(id: string): Promise<void> {
  await adminApiFetch(`/api/admin/projects/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}