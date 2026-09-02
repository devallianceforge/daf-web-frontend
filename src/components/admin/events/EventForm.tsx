'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2, UploadCloud } from 'lucide-react';

import type { EventItem } from '@/data/events';
import { adminApiErrorMessage } from '@/lib/api/admin-client';
import {
  createEvent,
  getEvent,
  updateEvent,
  uploadEventImage,
  type EventBody,
} from '@/lib/api/events';

type AgendaRow = { time: string; title: string };
type SpeakerRow = { name: string; role: string };

type FormFields = {
  slug: string;
  title: string;
  description: string;
  date: string;
  month: string;
  day: string;
  format: EventItem['format'];
  tagsText: string;
  location: string;
  agenda: AgendaRow[];
  speakers: SpeakerRow[];
};

const EMPTY_FORM: FormFields = {
  slug: '',
  title: '',
  description: '',
  date: '',
  month: '',
  day: '',
  format: 'Online',
  tagsText: '',
  location: '',
  agenda: [{ time: '', title: '' }],
  speakers: [{ name: '', role: '' }],
};

const FORMAT_OPTIONS: EventItem['format'][] = ['Online', 'Hybrid', 'In-person'];

const inputClass =
  'w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-mint focus:outline-none transition-colors duration-300 ease-daf';

const labelClass =
  'mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-dim';

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

function deriveDateLabel(date: string): { month: string; day: string } | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return {
    month: MONTHS[parsed.getUTCMonth()] ?? '',
    day: String(parsed.getUTCDate()).padStart(2, '0'),
  };
}

export function EventForm({
  mode,
  eventId,
}: {
  mode: 'create' | 'edit';
  eventId?: string;
}) {
  const router = useRouter();

  const [form, setForm] = useState<FormFields>(EMPTY_FORM);
  const [loading, setLoading] = useState(mode === 'edit');
  const [loadError, setLoadError] = useState<string | null>(null);

  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverImageDeleteUrl, setCoverImageDeleteUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== 'edit' || !eventId) return;

    let active = true;

    (async () => {
      try {
        const event = await getEvent(eventId);
        if (!active) return;

        setForm({
          slug: event.slug,
          title: event.title,
          description: event.description,
          date: event.date,
          month: event.dateLabel.month,
          day: event.dateLabel.day,
          format: event.format,
          tagsText: event.tags.join(', '),
          location: event.location ?? '',
          agenda:
            event.agenda && event.agenda.length
              ? event.agenda.map((row) => ({ time: row.time, title: row.title }))
              : [{ time: '', title: '' }],
          speakers:
            event.speakers && event.speakers.length
              ? event.speakers.map((row) => ({ name: row.name, role: row.role }))
              : [{ name: '', role: '' }],
        });
        setCoverImageUrl(event.coverImageUrl ?? '');
        setPreviewUrl(event.coverImageUrl ?? '');
      } catch (err) {
        if (!active) return;
        setLoadError(adminApiErrorMessage(err));
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [mode, eventId]);

  function setField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateAgenda(index: number, field: keyof AgendaRow, value: string) {
    setForm((prev) => ({
      ...prev,
      agenda: prev.agenda.map((row, i) =>
        i === index ? { ...row, [field]: value } : row,
      ),
    }));
  }

  function updateSpeaker(index: number, field: keyof SpeakerRow, value: string) {
    setForm((prev) => ({
      ...prev,
      speakers: prev.speakers.map((row, i) =>
        i === index ? { ...row, [field]: value } : row,
      ),
    }));
  }

  function handleDateChange(value: string) {
    const derived = deriveDateLabel(value);
    setForm((prev) => ({
      ...prev,
      date: value,
      month: prev.month ? prev.month : (derived?.month ?? ''),
      day: prev.day ? prev.day : (derived?.day ?? ''),
    }));
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || uploading) return;

    setUploading(true);
    setUploadError(null);
    try {
      const { url, deleteUrl } = await uploadEventImage(file);
      setCoverImageUrl(url);
      setCoverImageDeleteUrl(deleteUrl ?? '');
      setPreviewUrl(url);
    } catch (err) {
      setUploadError(adminApiErrorMessage(err));
      event.target.value = '';
    } finally {
      setUploading(false);
    }
  }

  function buildBody(): EventBody {
    const agenda = form.agenda
      .map((row) => ({ time: row.time.trim(), title: row.title.trim() }))
      .filter((row) => row.time || row.title);
    const speakers = form.speakers
      .map((row) => ({ name: row.name.trim(), role: row.role.trim() }))
      .filter((row) => row.name || row.role);

    return {
      slug: form.slug.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date.trim(),
      dateLabel: { month: form.month.trim(), day: form.day.trim() },
      format: form.format,
      tags: form.tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      coverImageUrl: coverImageUrl.trim() || null,
      location: form.location.trim() || null,
      agenda: agenda.length ? agenda : null,
      speakers: speakers.length ? speakers : null,
      coverImageDeleteUrl: coverImageDeleteUrl || undefined,
    };
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (uploading || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const body = buildBody();

      if (mode === 'edit' && eventId) {
        await updateEvent(eventId, body);
      } else {
        await createEvent(body);
      }

      router.replace('/admin/events');
      router.refresh();
    } catch (err) {
      setSubmitError(adminApiErrorMessage(err));
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-20">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-border-hi border-t-mint" />
        <span className="font-mono text-sm text-text-muted">loading event…</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-border px-4 py-12 text-center">
        <p className="mb-4 text-sm text-red-400">{loadError}</p>
        <Link
          href="/admin/events"
          className="inline-flex rounded-full border border-border-hi px-4 py-2 text-sm text-text transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
        >
          Back to events
        </Link>
      </div>
    );
  }

  const isNew = mode === 'create';

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text">
          {isNew ? 'New event' : 'Edit event'}
        </h1>
        <p className="mt-1 font-mono text-xs text-text-dim">
          {isNew ? 'Create' : 'Update'} a record in the events collection.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
            Cover image
          </h2>

          {previewUrl ? (
            <div className="mb-4">
              <Image
                src={previewUrl}
                alt="Cover preview"
                width={640}
                height={360}
                unoptimized
                className="h-40 w-full rounded-lg border border-border object-cover"
              />
              <p className="mt-2 font-mono text-[11px] text-text-dim">
                Preview from the image service.
              </p>
            </div>
          ) : (
            <div className="mb-4 flex h-40 items-center justify-center rounded-lg border border-dashed border-border-hi text-text-dim">
              <span className="font-mono text-xs">no cover image</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <label
              htmlFor="cover-image"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border-hi px-4 py-2 text-sm text-text transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
            >
              <UploadCloud className="h-4 w-4" />
              {uploading ? 'Uploading image…' : coverImageUrl ? 'Replace image' : 'Upload image'}
              <input
                id="cover-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {uploading && (
              <span className="inline-flex items-center gap-2 font-mono text-xs text-text-muted">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                uploading…
              </span>
            )}
          </div>

          {uploadError && (
            <p className="mt-3 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              Upload failed: {uploadError}
            </p>
          )}
        </section>

        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
            Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="field-slug" className={labelClass}>
                Slug
              </label>
              <input
                id="field-slug"
                type="text"
                value={form.slug}
                onChange={(e) => setField('slug', e.target.value)}
                placeholder="build-night-open-source-sprint"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-format" className={labelClass}>
                Format
              </label>
              <select
                id="field-format"
                value={form.format}
                onChange={(e) =>
                  setField('format', e.target.value as EventItem['format'])
                }
                className={inputClass}
              >
                {FORMAT_OPTIONS.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-title" className={labelClass}>
                Title
              </label>
              <input
                id="field-title"
                type="text"
                value={form.title}
                onChange={(e) => setField('title', e.target.value)}
                placeholder="DAF Build Night: Open Source Sprint"
                required
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-description" className={labelClass}>
                Description
              </label>
              <textarea
                id="field-description"
                value={form.description}
                onChange={(e) => setField('description', e.target.value)}
                placeholder="A focused evening shipping real PRs to community projects."
                required
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-date" className={labelClass}>
                Date (ISO)
              </label>
              <input
                id="field-date"
                type="date"
                value={form.date}
                onChange={(e) => handleDateChange(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="field-month" className={labelClass}>
                  Month label
                </label>
                <input
                  id="field-month"
                  type="text"
                  value={form.month}
                  onChange={(e) => setField('month', e.target.value)}
                  placeholder="SEP"
                  maxLength={3}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="field-day" className={labelClass}>
                  Day label
                </label>
                <input
                  id="field-day"
                  type="text"
                  value={form.day}
                  onChange={(e) => setField('day', e.target.value)}
                  placeholder="14"
                  maxLength={2}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-tags" className={labelClass}>
                Tags (comma separated)
              </label>
              <input
                id="field-tags"
                type="text"
                value={form.tagsText}
                onChange={(e) => setField('tagsText', e.target.value)}
                placeholder="Open Source, All levels"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-location" className={labelClass}>
                Location (optional)
              </label>
              <input
                id="field-location"
                type="text"
                value={form.location}
                onChange={(e) => setField('location', e.target.value)}
                placeholder="Dhaka Hub + Discord stage"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Agenda (optional)
            </h2>
            <button
              type="button"
              onClick={() =>
                setField('agenda', [...form.agenda, { time: '', title: '' }])
              }
              className="inline-flex items-center gap-1 rounded-md border border-border-hi px-2 py-1 text-xs text-text-muted transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
            >
              <Plus className="h-3 w-3" />
              Add item
            </button>
          </div>

          {form.agenda.map((row, index) => (
            <div key={index} className="mb-3 grid grid-cols-[140px_1fr_auto] gap-3">
              <input
                type="text"
                value={row.time}
                onChange={(e) => updateAgenda(index, 'time', e.target.value)}
                placeholder="6:00 PM"
                aria-label={`Agenda time ${index + 1}`}
                className={inputClass}
              />
              <input
                type="text"
                value={row.title}
                onChange={(e) => updateAgenda(index, 'title', e.target.value)}
                placeholder="Doors open, pick an issue"
                aria-label={`Agenda title ${index + 1}`}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() =>
                  setField(
                    'agenda',
                    form.agenda.filter((_, i) => i !== index),
                  )
                }
                disabled={form.agenda.length === 1}
                aria-label={`Remove agenda item ${index + 1}`}
                className="rounded-lg border border-border-hi px-2 text-text-dim transition-colors duration-300 ease-daf hover:border-red-500/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Speakers (optional)
            </h2>
            <button
              type="button"
              onClick={() =>
                setField('speakers', [...form.speakers, { name: '', role: '' }])
              }
              className="inline-flex items-center gap-1 rounded-md border border-border-hi px-2 py-1 text-xs text-text-muted transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
            >
              <Plus className="h-3 w-3" />
              Add speaker
            </button>
          </div>

          {form.speakers.map((row, index) => (
            <div key={index} className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                type="text"
                value={row.name}
                onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                placeholder="DAF Core Team"
                aria-label={`Speaker name ${index + 1}`}
                className={inputClass}
              />
              <input
                type="text"
                value={row.role}
                onChange={(e) => updateSpeaker(index, 'role', e.target.value)}
                placeholder="Mentors on rotation"
                aria-label={`Speaker role ${index + 1}`}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() =>
                  setField(
                    'speakers',
                    form.speakers.filter((_, i) => i !== index),
                  )
                }
                disabled={form.speakers.length === 1}
                aria-label={`Remove speaker ${index + 1}`}
                className="rounded-lg border border-border-hi px-2 text-text-dim transition-colors duration-300 ease-daf hover:border-red-500/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </section>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/events"
            className="rounded-full border border-border-hi px-5 py-2.5 text-sm text-text-muted transition-colors duration-300 ease-daf hover:text-text"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || uploading}
            className="inline-flex items-center gap-2 rounded-full bg-daf-gradient px-5 py-2.5 text-sm font-semibold text-[#050508] transition-shadow duration-300 ease-daf hover:shadow-[0_8px_30px_-6px_rgba(124,58,237,0.55)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting
              ? 'Saving…'
              : isNew
                ? 'Create event'
                : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}