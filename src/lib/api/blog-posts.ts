import { adminApiFetch } from './admin-client';

export type BlogPostAdminItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  coverImageUrl?: string | null;
};

export type BlogPostBody = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  coverImageUrl?: string | null;
  coverImageDeleteUrl?: string;
};

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
  tags: string[];
  author: string;
  cover_image_url: string | null;
};

function toAdminItem(row: BlogPostRow): BlogPostAdminItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    readTime: row.read_time,
    tags: row.tags,
    author: row.author,
    coverImageUrl: row.cover_image_url ?? null,
  };
}

export async function listBlogPosts(): Promise<BlogPostAdminItem[]> {
  const res = await adminApiFetch('/api/admin/blog-posts');
  const rows = (await res.json()) as BlogPostRow[];
  return rows.map(toAdminItem);
}

export async function getBlogPost(id: string): Promise<BlogPostAdminItem> {
  const res = await adminApiFetch(`/api/admin/blog-posts/${encodeURIComponent(id)}`);
  return toAdminItem((await res.json()) as BlogPostRow);
}

export async function createBlogPost(body: BlogPostBody): Promise<BlogPostAdminItem> {
  const res = await adminApiFetch('/api/admin/blog-posts', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return toAdminItem((await res.json()) as BlogPostRow);
}

export async function updateBlogPost(
  id: string,
  body: BlogPostBody,
): Promise<BlogPostAdminItem> {
  const res = await adminApiFetch(`/api/admin/blog-posts/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return toAdminItem((await res.json()) as BlogPostRow);
}

export async function deleteBlogPost(id: string): Promise<void> {
  await adminApiFetch(`/api/admin/blog-posts/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}