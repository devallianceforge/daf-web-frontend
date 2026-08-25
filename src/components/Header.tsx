'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/data/site';
import { MagneticButton } from './MagneticButton';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[1000] border-b border-transparent py-[18px] backdrop-blur-2xl transition-colors duration-300 ease-daf',
          scrolled ? 'border-border bg-bg/85' : 'bg-bg/55'
        )}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Dev Alliance Forge"
              width={1048}
              height={130}
              sizes="225px"
              className="h-7 w-auto"
              priority
            />
          </Link>

          <nav className="hidden gap-9 text-sm text-text-muted md:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group relative py-1 transition-colors hover:text-text">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-daf-gradient transition-[width] duration-300 ease-daf group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticButton href="/contact" size="sm" className="hidden sm:inline-flex">
              Join DAF
            </MagneticButton>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-[5px] rounded-md p-1.5 md:hidden"
            >
              <span className="h-0.5 w-[22px] rounded bg-text" />
              <span className="h-0.5 w-[22px] rounded bg-text" />
              <span className="h-0.5 w-[22px] rounded bg-text" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
