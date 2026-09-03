'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';

export function SiteChrome() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  return <Header />;
}