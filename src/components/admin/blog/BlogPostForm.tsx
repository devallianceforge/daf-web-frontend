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
  createBlogPost,
  getBlogPost,
  updateBlogPost,
  type BlogPostBody,
} from '@/lib/api/blog-posts';

const inputClass =
  'w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-mint focus:outline-none transition-colors duration-300 ease-daf';

const labelClass =
  'mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-dim';

export function BlogPostForm({
  mode,
  postId,
}: {
  mode: 'create' | 'edit';
  postId?: string;
}) {
  const router = useRouter();

  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [author, setAuthor] = useState('');

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
    if (mode !== 'edit' || !postId) return;

    let active = true;

    (async () => {
      try {
        const post = await getBlogPost(postId);
        if (!active) return;

        setSlug(post.slug);
        setTitle(post.title);
        setExcerpt(post.excerpt);
        setDate(post.date);
        setReadTime(post.readTime);
        setTagsText(post.tags.join(', '));
        setAuthor(post.author);
        setCoverImageUrl(post.coverImageUrl ?? '');
        setPreviewUrl(post.coverImageUrl ?? '');
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
  }, [mode, postId]);

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

  function buildBody(): BlogPostBody {
    return {
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      date: date.trim(),
      readTime: readTime.trim(),
      tags: tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      author: author.trim(),
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
      if (mode === 'edit' && postId) {
        await updateBlogPost(postId, body);
      } else {
        await createBlogPost(body);
      }
      router.replace('/admin/blog');
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
        <span className="font-mono text-sm text-text-muted">loading post…</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-border px-4 py-12 text-center">
        <p className="mb-4 text-sm text-red-400">{loadError}</p>
        <Link
          href="/admin/blog"
          className="inline-flex rounded-full border border-border-hi px-4 py-2 text-sm text-text transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
        >
          Back to blog
        </Link>
      </div>
    );
  }

  const isNew = mode === 'create';

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text">
          {isNew ? 'New post' : 'Edit post'}
        </h1>
        <p className="mt-1 font-mono text-xs text-text-dim">
          {isNew ? 'Create' : 'Update'} a record in the blog collection.
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
                placeholder="why-we-started-dev-alliance-forge"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-read-time" className={labelClass}>
                Read time
              </label>
              <input
                id="field-read-time"
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="4 min read"
                required
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="field-author" className={labelClass}>
                Author
              </label>
              <input
                id="field-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="DAF Founding Team"
                required
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-title" className={labelClass}>
                Title
              </label>
              <input
                id="field-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Why We Started Dev Alliance Forge"
                required
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-excerpt" className={labelClass}>
                Excerpt
              </label>
              <textarea
                id="field-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary shown on the blog index."
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
                placeholder="Community, Story"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/blog"
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
            {submitting ? 'Saving…' : isNew ? 'Create post' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}