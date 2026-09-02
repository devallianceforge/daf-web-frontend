'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon, Pencil, Plus, Trash2 } from 'lucide-react';

import { adminApiErrorMessage } from '@/lib/api/admin-client';
import {
  deleteProject,
  listProjects,
  type ProjectAdminItem,
} from '@/lib/api/projects';

type LoadState = 'loading' | 'error' | 'ready';

export function ProjectsAdminList() {
  const [state, setState] = useState<LoadState>('loading');
  const [projects, setProjects] = useState<ProjectAdminItem[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    let rows: ProjectAdminItem[];
    try {
      rows = await listProjects();
    } catch (err) {
      setLoadError(adminApiErrorMessage(err));
      setState('error');
      return;
    }
    setLoadError(null);
    setProjects(rows);
    setState('ready');
  }, []);

  useEffect(() => {
    let active = true;

    (async () => {
      let rows: ProjectAdminItem[];
      try {
        rows = await listProjects();
      } catch (err) {
        if (active) {
          setLoadError(adminApiErrorMessage(err));
          setState('error');
        }
        return;
      }
      if (!active) return;
      setLoadError(null);
      setProjects(rows);
      setState('ready');
    })();

    return () => {
      active = false;
    };
  }, []);

  function retry() {
    setState('loading');
    void fetchProjects();
  }

  async function handleDelete(id: string) {
    const project = projects.find((item) => item.id === id);
    if (!project) return;

    if (!window.confirm(`Delete "${project.name}"? This cannot be undone.`)) return;

    setDeletingId(id);
    setActionError(null);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setActionError(adminApiErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-[960px]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Projects</h1>
          <p className="mt-1 font-mono text-xs text-text-dim">
            {projects.length} total
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-daf-gradient px-4 py-2 text-[13px] font-semibold text-[#050508] transition-shadow duration-300 ease-daf hover:shadow-[0_8px_30px_-6px_rgba(124,58,237,0.55)]"
        >
          <Plus className="h-4 w-4" />
          New project
        </Link>
      </div>

      {actionError && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {actionError}
        </div>
      )}

      {state === 'loading' && (
        <div className="flex items-center gap-3 py-16">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-border-hi border-t-mint" />
          <span className="font-mono text-sm text-text-muted">loading projects…</span>
        </div>
      )}

      {state === 'error' && (
        <div className="rounded-lg border border-border px-4 py-8 text-center">
          <p className="mb-4 text-sm text-red-400">{loadError}</p>
          <button
            type="button"
            onClick={retry}
            className="rounded-full border border-border-hi px-4 py-2 text-sm text-text transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
          >
            Retry
          </button>
        </div>
      )}

      {state === 'ready' && projects.length === 0 && (
        <div className="rounded-lg border border-border px-4 py-12 text-center">
          <p className="text-sm text-text-muted">
            No projects yet. Create the first one.
          </p>
        </div>
      )}

      {state === 'ready' && projects.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border font-mono text-xs uppercase tracking-wider text-text-dim">
                <th className="px-4 py-3 font-medium">Cover</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Contributors</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-border last:border-b-0 hover:bg-bg-alt"
                >
                  <td className="px-4 py-3">
                    {project.coverImageUrl ? (
                      <Image
                        src={project.coverImageUrl}
                        alt=""
                        width={64}
                        height={48}
                        unoptimized
                        className="h-[48px] w-16 rounded-md border border-border object-cover"
                      />
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-bg-alt text-text-dim">
                        <ImageIcon className="h-5 w-5" />
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text">{project.name}</p>
                    <p className="text-xs text-text-dim">{project.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {project.contributors}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border-hi px-2.5 py-1.5 text-[13px] text-text transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => void handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border-hi px-2.5 py-1.5 text-[13px] text-text transition-colors duration-300 ease-daf hover:border-red-500/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === project.id ? (
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}