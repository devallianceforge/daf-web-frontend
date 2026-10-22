'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud } from 'lucide-react';

import {
  adminApiErrorMessage,
  adminApiUploadImage,
} from '@/lib/api/admin-client';
import {
  createProject,
  getProject,
  updateProject,
  type ProjectBody,
} from '@/lib/api/projects';

const inputClass =
  'w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-mint focus:outline-none transition-colors duration-300 ease-daf';

const labelClass =
  'mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-dim';

export function ProjectForm({
  mode,
  projectId,
}: {
  mode: 'create' | 'edit';
  projectId?: string;
}) {
  const router = useRouter();

  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [contributors, setContributors] = useState('');

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
    if (mode !== 'edit' || !projectId) return;

    let active = true;

    (async () => {
      try {
        const project = await getProject(projectId);
        if (!active) return;

        setSlug(project.slug);
        setName(project.name);
        setDescription(project.description);
        setTagsText(project.tags.join(', '));
        setRepoUrl(project.repoUrl);
        setContributors(String(project.contributors));
        setCoverImageUrl(project.coverImageUrl ?? '');
        setPreviewUrl(project.coverImageUrl ?? '');
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
  }, [mode, projectId]);

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

  function buildBody(): ProjectBody {
    return {
      slug: slug.trim(),
      name: name.trim(),
      description: description.trim(),
      tags: tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      repoUrl: repoUrl.trim(),
      contributors: Number.parseInt(contributors, 10) || 0,
      coverImageUrl: coverImageUrl.trim() || null,
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
      if (mode === 'edit' && projectId) {
        await updateProject(projectId, body);
      } else {
        await createProject(body);
      }
      router.replace('/admin/projects');
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
        <span className="font-mono text-sm text-text-muted">loading project…</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-border px-4 py-12 text-center">
        <p className="mb-4 text-sm text-red-400">{loadError}</p>
        <Link
          href="/admin/projects"
          className="inline-flex rounded-full border border-border-hi px-4 py-2 text-sm text-text transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  const isNew = mode === 'create';

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text">
          {isNew ? 'New project' : 'Edit project'}
        </h1>
        <p className="mt-1 font-mono text-xs text-text-dim">
          {isNew ? 'Create' : 'Update'} a record in the projects collection.
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
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="daf-resource-hub"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-contributors" className={labelClass}>
                Contributors
              </label>
              <input
                id="field-contributors"
                type="number"
                min={0}
                value={contributors}
                onChange={(e) => setContributors(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-name" className={labelClass}>
                Name
              </label>
              <input
                id="field-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="DAF Resource Hub"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A community-maintained, searchable index of tutorials and guides."
                required
                rows={3}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-tags" className={labelClass}>
                Tags (comma separated)
              </label>
              <input
                id="field-tags"
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Next.js, TypeScript, Docs"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-repo-url" className={labelClass}>
                Repository URL
              </label>
              <input
                id="field-repo-url"
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/devallianceforge"
                required
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/projects"
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
                ? 'Create project'
                : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}