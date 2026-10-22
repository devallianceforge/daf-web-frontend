'use client';

import { useCallback, useEffect, useState } from 'react';
import { Check, Copy, UserPlus } from 'lucide-react';

import { adminApiErrorMessage } from '@/lib/api/admin-client';
import { createAdmin, deleteAdmin, listAdmins, type AdminItem } from '@/lib/api/admins';

type LoadState = 'loading' | 'error' | 'ready';

const inputClass =
  'w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-mint focus:outline-none transition-colors duration-300 ease-daf';

const labelClass =
  'mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-dim';

export function AdminsAdminPage() {
  const [state, setState] = useState<LoadState>('loading');
  const [admins, setAdmins] = useState<AdminItem[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [resetLink, setResetLink] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const [revokingUid, setRevokingUid] = useState<string | null>(null);

  const fetchAdmins = useCallback(async () => {
    let rows: AdminItem[];
    try {
      rows = await listAdmins();
    } catch (err) {
      setLoadError(adminApiErrorMessage(err));
      setState('error');
      return;
    }
    setLoadError(null);
    setAdmins(rows);
    setState('ready');
  }, []);

  useEffect(() => {
    let active = true;

    (async () => {
      let rows: AdminItem[];
      try {
        rows = await listAdmins();
      } catch (err) {
        if (active) {
          setLoadError(adminApiErrorMessage(err));
          setState('error');
        }
        return;
      }
      if (!active) return;
      setLoadError(null);
      setAdmins(rows);
      setState('ready');
    })();

    return () => {
      active = false;
    };
  }, []);

  function retry() {
    setState('loading');
    void fetchAdmins();
  }

  async function handleAddAdmin(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setActionError(null);
    setResetLink(null);
    setCopied(false);

    try {
      const { admin, resetLink: link } = await createAdmin({
        email: email.trim(),
        displayName: displayName.trim() || undefined,
      });
      setAdmins((prev) => [...prev, admin]);
      setEmail('');
      setDisplayName('');
      if (link) {
        setResetLink(link);
        setResetEmail(admin.email);
      }
    } catch (err) {
      setActionError(adminApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRevoke(admin: AdminItem) {
    const label = admin.displayName ? `"${admin.displayName}"` : admin.email;
    if (!window.confirm(`Revoke admin access for ${label}? They will lose access immediately.`)) return;

    setRevokingUid(admin.uid);
    setActionError(null);
    try {
      await deleteAdmin(admin.uid);
      setAdmins((prev) => prev.filter((item) => item.uid !== admin.uid));
    } catch (err) {
      setActionError(adminApiErrorMessage(err));
    } finally {
      setRevokingUid(null);
    }
  }

  async function handleCopy() {
    if (!resetLink) return;
    try {
      await navigator.clipboard.writeText(resetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mx-auto max-w-[960px]">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text">Admins</h1>
        <p className="mt-1 font-mono text-xs text-text-dim">
          {state === 'ready' ? `${admins.length} total` : '…'} · manage access
        </p>
      </div>

      {actionError && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {actionError}
        </div>
      )}

      <section className="mb-8 rounded-lg border border-border bg-bg-alt p-5">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
          Add admin
        </h2>

        <form onSubmit={handleAddAdmin} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="admin-email" className={labelClass}>
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="person@example.com"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="admin-display-name" className={labelClass}>
              Display name (optional)
            </label>
            <input
              id="admin-display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Jane Doe"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-daf-gradient px-5 py-2.5 text-sm font-semibold text-[#050508] transition-shadow duration-300 ease-daf hover:shadow-[0_8px_30px_-6px_rgba(124,58,237,0.55)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <UserPlus className="h-4 w-4" />
              {submitting ? 'Adding…' : 'Add admin'}
            </button>
          </div>
        </form>
      </section>

      {resetLink && (
        <div className="mb-8 rounded-lg border border-mint/30 bg-mint/[0.08] p-5">
          <h2 className="font-display text-base font-bold text-mint">Admin invited</h2>
          <p className="mt-1 text-sm text-text-muted">
            Send this link to the new admin — it lets them set their own password
            and sign in. Share it manually (Slack, email client, whatever you use).
          </p>
          <div className="mt-3 flex items-stretch gap-2">
            <code className="flex-1 break-all rounded-lg border border-border bg-bg px-3 py-2.5 font-mono text-xs text-text">
              {resetLink}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-hi px-3 text-sm text-text transition-colors duration-300 ease-daf hover:border-mint hover:text-mint"
            >
              {copied ? <Check className="h-4 w-4 text-mint" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="mt-2 font-mono text-[11px] text-text-dim">{resetEmail}</p>
        </div>
      )}

      {state === 'loading' && (
        <div className="flex items-center gap-3 py-16">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-border-hi border-t-mint" />
          <span className="font-mono text-sm text-text-muted">loading admins…</span>
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

      {state === 'ready' && admins.length === 0 && (
        <div className="rounded-lg border border-border px-4 py-12 text-center">
          <p className="text-sm text-text-muted">
            No admins yet. Add the first one above.
          </p>
        </div>
      )}

      {state === 'ready' && admins.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border font-mono text-xs uppercase tracking-wider text-text-dim">
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Display name</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin.uid}
                  className="border-b border-border last:border-b-0 hover:bg-bg-alt"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-text">{admin.email}</p>
                    <p className="font-mono text-[11px] text-text-dim">{admin.uid}</p>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {admin.displayName ?? <span className="text-text-dim">—</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">
                    {formatDate(admin.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => void handleRevoke(admin)}
                        disabled={revokingUid === admin.uid}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border-hi px-2.5 py-1.5 text-[13px] text-text transition-colors duration-300 ease-daf hover:border-red-500/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {revokingUid === admin.uid && (
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
                        )}
                        Revoke
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

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}