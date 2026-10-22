'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2, UploadCloud } from 'lucide-react';

import {
  adminApiErrorMessage,
  adminApiUploadImage,
} from '@/lib/api/admin-client';
import {
  createWorkshop,
  getWorkshop,
  updateWorkshop,
  type WorkshopBody,
  type WorkshopFormat,
  type WorkshopLevel,
  type WorkshopStatus,
} from '@/lib/api/workshops';

type CurriculumRow = { title: string; description: string };
type ResourceRow = { label: string; href: string };

type FormFields = {
  slug: string;
  title: string;
  description: string;
  level: WorkshopLevel;
  format: WorkshopFormat;
  tagsText: string;
  date: string;
  dateLabel: string;
  time: string;
  duration: string;
  location: string;
  capacity: string;
  status: WorkshopStatus;
  prerequisitesText: string;
  outcomesText: string;
  curriculum: CurriculumRow[];
  resources: ResourceRow[];
  featured: boolean;
  instructorName: string;
  instructorRole: string;
  instructorBio: string;
  instructorGithub: string;
  instructorLinkedin: string;
};

const EMPTY_FORM: FormFields = {
  slug: '',
  title: '',
  description: '',
  level: 'Beginner',
  format: 'Online',
  tagsText: '',
  date: '',
  dateLabel: '',
  time: '',
  duration: '',
  location: '',
  capacity: '',
  status: 'Coming soon',
  prerequisitesText: '',
  outcomesText: '',
  curriculum: [{ title: '', description: '' }],
  resources: [{ label: '', href: '' }],
  featured: false,
  instructorName: '',
  instructorRole: '',
  instructorBio: '',
  instructorGithub: '',
  instructorLinkedin: '',
};

const LEVEL_OPTIONS: WorkshopLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
const FORMAT_OPTIONS: WorkshopFormat[] = ['Online', 'Hybrid', 'In-person'];
const STATUS_OPTIONS: WorkshopStatus[] = ['Open', 'Coming soon', 'Waitlist', 'Closed'];

const inputClass =
  'w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-mint focus:outline-none transition-colors duration-300 ease-daf';

const labelClass =
  'mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-dim';

export function WorkshopForm({
  mode,
  workshopId,
}: {
  mode: 'create' | 'edit';
  workshopId?: string;
}) {
  const router = useRouter();

  const [form, setForm] = useState<FormFields>(EMPTY_FORM);

  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverImageDeleteUrl, setCoverImageDeleteUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [loading, setLoading] = useState(mode === 'edit');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== 'edit' || !workshopId) return;

    let active = true;

    (async () => {
      try {
        const workshop = await getWorkshop(workshopId);
        if (!active) return;

        setForm({
          slug: workshop.slug,
          title: workshop.title,
          description: workshop.description,
          level: workshop.level,
          format: workshop.format,
          tagsText: workshop.tags.join(', '),
          date: workshop.date ?? '',
          dateLabel: workshop.dateLabel ?? '',
          time: workshop.time ?? '',
          duration: workshop.duration ?? '',
          location: workshop.location ?? '',
          capacity: workshop.capacity != null ? String(workshop.capacity) : '',
          status: workshop.status ?? 'Coming soon',
          prerequisitesText: (workshop.prerequisites ?? []).join(', '),
          outcomesText: (workshop.outcomes ?? []).join(', '),
          curriculum:
            workshop.curriculum && workshop.curriculum.length
              ? workshop.curriculum.map((item) => ({
                  title: item.title,
                  description: item.description,
                }))
              : [{ title: '', description: '' }],
          resources:
            workshop.resources && workshop.resources.length
              ? workshop.resources.map((r) => ({ label: r.label, href: r.href }))
              : [{ label: '', href: '' }],
          featured: workshop.featured ?? false,
          instructorName: workshop.instructor?.name ?? '',
          instructorRole: workshop.instructor?.role ?? '',
          instructorBio: workshop.instructor?.bio ?? '',
          instructorGithub: workshop.instructor?.github ?? '',
          instructorLinkedin: workshop.instructor?.linkedin ?? '',
        });
        setCoverImageUrl(workshop.coverImageUrl ?? '');
        setPreviewUrl(workshop.coverImageUrl ?? '');
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
  }, [mode, workshopId]);

  function setField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateCurriculum(index: number, field: keyof CurriculumRow, value: string) {
    setForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((row, i) =>
        i === index ? { ...row, [field]: value } : row,
      ),
    }));
  }

  function updateResource(index: number, field: keyof ResourceRow, value: string) {
    setForm((prev) => ({
      ...prev,
      resources: prev.resources.map((row, i) =>
        i === index ? { ...row, [field]: value } : row,
      ),
    }));
  }

  function removeRow(kind: 'curriculum' | 'resources', index: number) {
    setForm((prev) => ({
      ...prev,
      [kind]: prev[kind].filter((_, i) => i !== index),
    }));
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || uploading) return;

    setUploading(true);
    setUploadError(null);
    try {
      const { url, deleteUrl } = await adminApiUploadImage(file);
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

  function buildBody(): WorkshopBody {
    const curriculum = form.curriculum
      .map((row) => ({
        title: row.title.trim(),
        description: row.description.trim(),
      }))
      .filter((row) => row.title || row.description);

    const resources = form.resources
      .map((row) => ({ label: row.label.trim(), href: row.href.trim() }))
      .filter((row) => row.label || row.href);

    const instructor =
      form.instructorName.trim() || form.instructorRole.trim()
        ? {
            name: form.instructorName.trim(),
            role: form.instructorRole.trim(),
            bio: form.instructorBio.trim() || undefined,
            github: form.instructorGithub.trim() || undefined,
            linkedin: form.instructorLinkedin.trim() || undefined,
          }
        : null;

    const capacityNum = Number.parseInt(form.capacity, 10);

    return {
      slug: form.slug.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      level: form.level,
      format: form.format,
      tags: form.tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      coverImageUrl: coverImageUrl.trim() || null,
      date: form.date.trim() || null,
      dateLabel: form.dateLabel.trim() || null,
      time: form.time.trim() || null,
      duration: form.duration.trim() || null,
      location: form.location.trim() || null,
      capacity: Number.isInteger(capacityNum) && capacityNum > 0 ? capacityNum : null,
      status: form.status,
      prerequisites: form.prerequisitesText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      outcomes: form.outcomesText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      curriculum: curriculum.length ? curriculum : null,
      instructor,
      resources: resources.length ? resources : null,
      featured: form.featured,
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
      if (mode === 'edit' && workshopId) {
        await updateWorkshop(workshopId, body);
      } else {
        await createWorkshop(body);
      }
      router.replace('/admin/workshops');
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
        <span className="font-mono text-sm text-text-muted">loading workshop…</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-border px-4 py-12 text-center">
        <p className="mb-4 text-sm text-red-400">{loadError}</p>
        <Link
          href="/admin/workshops"
          className="inline-flex rounded-full border border-border-hi px-4 py-2 text-sm text-text transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
        >
          Back to workshops
        </Link>
      </div>
    );
  }

  const isNew = mode === 'create';

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text">
          {isNew ? 'New workshop' : 'Edit workshop'}
        </h1>
        <p className="mt-1 font-mono text-xs text-text-dim">
          {isNew ? 'Create' : 'Update'} a record in the workshops collection.
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
              {uploading
                ? 'Uploading image…'
                : coverImageUrl
                  ? 'Replace image'
                  : 'Upload image'}
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
                placeholder="git-github-from-zero"
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
                  setField('format', e.target.value as WorkshopFormat)
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
                placeholder="Git & GitHub from Zero"
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
                placeholder="Version control fundamentals for first-time contributors."
                required
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-level" className={labelClass}>
                Level
              </label>
              <select
                id="field-level"
                value={form.level}
                onChange={(e) => setField('level', e.target.value as WorkshopLevel)}
                className={inputClass}
              >
                {LEVEL_OPTIONS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="field-status" className={labelClass}>
                Status
              </label>
              <select
                id="field-status"
                value={form.status}
                onChange={(e) => setField('status', e.target.value as WorkshopStatus)}
                className={inputClass}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
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
                placeholder="Git, Fundamentals, Open Source"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
            Logistics
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="field-date" className={labelClass}>
                Date (ISO)
              </label>
              <input
                id="field-date"
                type="date"
                value={form.date}
                onChange={(e) => setField('date', e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-date-label" className={labelClass}>
                Date label
              </label>
              <input
                id="field-date-label"
                type="text"
                value={form.dateLabel}
                onChange={(e) => setField('dateLabel', e.target.value)}
                placeholder="September 20, 2026"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-time" className={labelClass}>
                Time
              </label>
              <input
                id="field-time"
                type="text"
                value={form.time}
                onChange={(e) => setField('time', e.target.value)}
                placeholder="7:00 PM BST"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-duration" className={labelClass}>
                Duration
              </label>
              <input
                id="field-duration"
                type="text"
                value={form.duration}
                onChange={(e) => setField('duration', e.target.value)}
                placeholder="2 hours"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-location" className={labelClass}>
                Location
              </label>
              <input
                id="field-location"
                type="text"
                value={form.location}
                onChange={(e) => setField('location', e.target.value)}
                placeholder="DAF Discord Stage"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-capacity" className={labelClass}>
                Capacity
              </label>
              <input
                id="field-capacity"
                type="number"
                min={0}
                value={form.capacity}
                onChange={(e) => setField('capacity', e.target.value)}
                placeholder="50"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-text">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setField('featured', e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-bg accent-[#6366f1]"
                />
                Featured workshop
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
            Learning
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="field-prerequisites" className={labelClass}>
                Prerequisites (comma separated)
              </label>
              <input
                id="field-prerequisites"
                type="text"
                value={form.prerequisitesText}
                onChange={(e) => setField('prerequisitesText', e.target.value)}
                placeholder="A GitHub account, A laptop with Git installed"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-outcomes" className={labelClass}>
                Outcomes (comma separated)
              </label>
              <input
                id="field-outcomes"
                type="text"
                value={form.outcomesText}
                onChange={(e) => setField('outcomesText', e.target.value)}
                placeholder="Understand how Git tracks project history, Use branches confidently"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Curriculum
            </h2>
            <button
              type="button"
              onClick={() =>
                setField('curriculum', [
                  ...form.curriculum,
                  { title: '', description: '' },
                ])
              }
              className="inline-flex items-center gap-1 rounded-md border border-border-hi px-2 py-1 text-xs text-text-muted transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
            >
              <Plus className="h-3 w-3" />
              Add item
            </button>
          </div>

          {form.curriculum.map((row, index) => (
            <div key={index} className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                type="text"
                value={row.title}
                onChange={(e) => updateCurriculum(index, 'title', e.target.value)}
                placeholder="Why version control"
                aria-label={`Curriculum title ${index + 1}`}
                className={inputClass}
              />
              <input
                type="text"
                value={row.description}
                onChange={(e) =>
                  updateCurriculum(index, 'description', e.target.value)
                }
                placeholder="Understand repositories, commits, and history."
                aria-label={`Curriculum description ${index + 1}`}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeRow('curriculum', index)}
                disabled={form.curriculum.length === 1}
                aria-label={`Remove curriculum item ${index + 1}`}
                className="rounded-lg border border-border-hi px-2 text-text-dim transition-colors duration-300 ease-daf hover:border-red-500/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
            Instructor
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="field-instructor-name" className={labelClass}>
                Name
              </label>
              <input
                id="field-instructor-name"
                type="text"
                value={form.instructorName}
                onChange={(e) => setField('instructorName', e.target.value)}
                placeholder="DAF Mentor Team"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-instructor-role" className={labelClass}>
                Role
              </label>
              <input
                id="field-instructor-role"
                type="text"
                value={form.instructorRole}
                onChange={(e) => setField('instructorRole', e.target.value)}
                placeholder="Community mentors"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-instructor-bio" className={labelClass}>
                Bio
              </label>
              <textarea
                id="field-instructor-bio"
                value={form.instructorBio}
                onChange={(e) => setField('instructorBio', e.target.value)}
                rows={2}
                placeholder="A short bio for the instructor."
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-instructor-github" className={labelClass}>
                GitHub
              </label>
              <input
                id="field-instructor-github"
                type="text"
                value={form.instructorGithub}
                onChange={(e) => setField('instructorGithub', e.target.value)}
                placeholder="https://github.com/…"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-instructor-linkedin" className={labelClass}>
                LinkedIn
              </label>
              <input
                id="field-instructor-linkedin"
                type="text"
                value={form.instructorLinkedin}
                onChange={(e) => setField('instructorLinkedin', e.target.value)}
                placeholder="https://linkedin.com/in/…"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-bg-alt p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Resources
            </h2>
            <button
              type="button"
              onClick={() =>
                setField('resources', [...form.resources, { label: '', href: '' }])
              }
              className="inline-flex items-center gap-1 rounded-md border border-border-hi px-2 py-1 text-xs text-text-muted transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
            >
              <Plus className="h-3 w-3" />
              Add resource
            </button>
          </div>

          {form.resources.map((row, index) => (
            <div key={index} className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                type="text"
                value={row.label}
                onChange={(e) => updateResource(index, 'label', e.target.value)}
                placeholder="Git Documentation"
                aria-label={`Resource label ${index + 1}`}
                className={inputClass}
              />
              <input
                type="text"
                value={row.href}
                onChange={(e) => updateResource(index, 'href', e.target.value)}
                placeholder="https://git-scm.com/docs"
                aria-label={`Resource href ${index + 1}`}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeRow('resources', index)}
                disabled={form.resources.length === 1}
                aria-label={`Remove resource ${index + 1}`}
                className="rounded-lg border border-border-hi px-2 text-text-dim transition-colors duration-300 ease-daf hover:border-red-500/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </section>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/workshops"
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
                ? 'Create workshop'
                : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}