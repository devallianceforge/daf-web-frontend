'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut, type User } from 'firebase/auth';

import { getFirebaseAuth } from '@/lib/firebase';
import { cn } from '@/lib/utils';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Workshops', href: '/admin/workshops' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Admins', href: '/admin/admins' }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;

    const unsubscribe = getFirebaseAuth().onAuthStateChanged(
      (nextUser) => {
        if (!active) return;
        setUser(nextUser);
        setStatus(nextUser ? 'authenticated' : 'unauthenticated');
      },
      () => {
        if (!active) return;
        setStatus('unauthenticated');
      }
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.replace('/admin/login');
      router.refresh();
    } else if (status === 'authenticated' && isLoginPage) {
      router.replace('/admin/events');
      router.refresh();
    }
  }, [status, isLoginPage, router]);

  async function handleSignOut() {
    try {
      await signOut(getFirebaseAuth());
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-bg">{children}</div>;
  }

  if (status !== 'authenticated') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-border-hi border-t-mint" />
          <span className="font-mono text-sm text-text-muted">authenticating…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-alt">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border px-5 py-6">
        <Link href="/admin" className="mb-8 font-display text-lg font-bold text-text">
          DAF<span className="text-mint">·</span>Admin
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {ADMIN_NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm transition-colors duration-300 ease-daf',
                  active
                    ? 'bg-mint/[0.1] text-mint'
                    : 'text-text-muted hover:bg-border hover:text-text'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border pt-4">
          {user && (
            <div className="mb-3 px-3">
              <p className="truncate text-[13px] text-text">{user.email ?? 'Signed in'}</p>
              <p className="truncate font-mono text-[11px] text-text-dim">{user.uid}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-lg border border-border-hi px-3 py-2 text-sm text-text transition-colors duration-300 ease-daf hover:border-red-500/50 hover:text-red-400"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 px-8 py-8">{children}</div>
    </div>
  );
}