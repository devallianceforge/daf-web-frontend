import { adminApiFetch } from './admin-client';
import type { EventItem } from '@/data/events';

/**
 * Event as returned by the admin API, extended with the row `id` (needed for
 * edit/delete). The backend echoes the write-only `coverImageDeleteUrl` only
 * on the request side and never in responses.
 */
export type EventAdminItem = EventItem & {
  id: string;
};

/**
 * Request body accepted by GET/PUT /api/admin/events. Mirrors the backend's
 * Zod schema (src/lib/validation/events.ts in daf-backend) exactly.
 */
export type EventBody = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: { month: string; day: string };
  format: EventItem['format'];
  tags: string[];
  coverImageUrl?: string | null;
  location?: string | null;
  agenda?: { time: string; title: string }[] | null;
  speakers?: { name: string; role: string }[] | null;
  coverImageDeleteUrl?: string;
};

type EventRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  date_label: { month: string; day: string };
  format: EventItem['format'];
  tags: string[];
  cover_image_url: string | null;
  location: string | null;
  agenda: { time: string; title: string }[] | null;
  speakers: { name: string; role: string }[] | null;
};

function toAdminItem(row: EventRow): EventAdminItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date,
    dateLabel: row.date_label,
    format: row.format,
    tags: row.tags,
    coverImageUrl: row.cover_image_url ?? undefined,
    location: row.location ?? undefined,
    agenda: row.agenda ?? undefined,
    speakers: row.speakers ?? undefined,
  };
}

export async function listEvents(): Promise<EventAdminItem[]> {
  const res = await adminApiFetch('/api/admin/events');
  const rows = (await res.json()) as EventRow[];
  return rows.map(toAdminItem);
}

export async function getEvent(id: string): Promise<EventAdminItem> {
  const res = await adminApiFetch(`/api/admin/events/${encodeURIComponent(id)}`);
  return toAdminItem((await res.json()) as EventRow);
}

export async function createEvent(body: EventBody): Promise<EventAdminItem> {
  const res = await adminApiFetch('/api/admin/events', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return toAdminItem((await res.json()) as EventRow);
}

export async function updateEvent(
  id: string,
  body: EventBody,
): Promise<EventAdminItem> {
  const res = await adminApiFetch(`/api/admin/events/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return toAdminItem((await res.json()) as EventRow);
}

export async function deleteEvent(id: string): Promise<void> {
  await adminApiFetch(`/api/admin/events/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export async function uploadEventImage(
  file: File,
): Promise<{ url: string; deleteUrl: string | null }> {
  const form = new FormData();
  form.append('image', file);

  const res = await adminApiFetch('/api/admin/images/upload', {
    method: 'POST',
    body: form,
  });

  return (await res.json()) as { url: string; deleteUrl: string | null };
}