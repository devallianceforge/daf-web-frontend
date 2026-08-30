'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { NAV_LINKS } from '@/data/site';
import { MagneticButton } from './MagneticButton';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [signalOffset, setSignalOffset] = useState(0);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  function isActive(href: string) {
    if (href === '/') {
      return pathname === '/';
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  function handleMouseMove(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    const rect = event.currentTarget.getBoundingClientRect();

    const pointerX = event.clientX - rect.left;
    const center = rect.width / 2;

    const normalized = (pointerX - center) / center;

    setSignalOffset(normalized * 12);
  }

  function handleMouseEnter(href: string) {
    setHoveredHref(href);
  }

  function handleMouseLeaveNav() {
    setHoveredHref(null);
    setSignalOffset(0);
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-1000 border-b border-transparent py-4.5 backdrop-blur-2xl transition-colors duration-300 ease-daf',
          scrolled
            ? 'border-border bg-bg/85'
            : 'bg-bg/55'
        )}
      >
        <div className="mx-auto flex max-w-310 items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/logo.png"
              alt="DAF"
              width={1048}
              height={130}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-9 text-sm lg:flex"
            onMouseLeave={handleMouseLeaveNav}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              const signalActive =
                hoveredHref === link.href ||
                (!hoveredHref && active);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() =>
                    handleMouseEnter(link.href)
                  }
                  onMouseMove={handleMouseMove}
                  className={cn(
                    'group relative py-2 transition-colors duration-300 ease-daf',
                    active
                      ? 'text-text'
                      : 'text-text-muted hover:text-text'
                  )}
                >
                  <span
                    className={cn(
                      'relative z-10 transition-all duration-300',
                      active &&
                        'bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent'
                    )}
                  >
                    {link.label}
                  </span>

                  {signalActive && (
                    <motion.span
                      layoutId="daf-nav-signal"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                        mass: 0.65
                      }}
                      className="pointer-events-none absolute inset-x-0 -bottom-1 flex justify-center"
                    >
                      <span className="relative flex h-3 w-full items-center justify-center">
                        {/* Signal trace */}
                        <span className="absolute h-px w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-90" />

                        {/* Secondary blue trace */}
                        <span className="absolute h-px w-[60%] bg-gradient-to-r from-violet-400 via-blue-400 to-transparent blur-[1px]" />

                        {/* Reactive signal node */}
                        <motion.span
                          animate={{
                            x: hoveredHref
                              ? signalOffset
                              : 0
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 22
                          }}
                          className="relative"
                        >
                          <span className="block h-2 w-2 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 shadow-[0_0_14px_rgba(99,102,241,0.95),0_0_26px_rgba(59,130,246,0.45)]" />

                          <span className="absolute inset-[-5px] rounded-full border border-violet-400/25" />

                          <span className="absolute inset-[-9px] animate-ping rounded-full border border-blue-400/10" />
                        </motion.span>
                      </span>
                    </motion.span>
                  )}

                  {/* Terminal route preview */}
                  {/* <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 translate-y-[-3px] whitespace-nowrap rounded-md border border-violet-500/15 bg-bg/90 px-2 py-1 font-mono text-[9px] text-blue-300 opacity-0 backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"> &gt; {link.href} </span> */}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">

            

            <MagneticButton href="/join" size="sm" className="hidden sm:inline-flex">
 main
              Join DAF
            </MagneticButton>

            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-1.25 rounded-md p-1.5 lg:hidden"
            >
              <span className="h-0.5 w-5.5 rounded bg-text" />
              <span className="h-0.5 w-5.5 rounded bg-text" />
              <span className="h-0.5 w-5.5 rounded bg-text" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}