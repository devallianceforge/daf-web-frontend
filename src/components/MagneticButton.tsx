'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'sm';
  external?: boolean;
  className?: string;
};

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external = false,
  className
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0,0)';
  }

  return (
    <a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-shadow duration-300 ease-daf',
        size === 'md' ? 'px-6 py-3 text-sm' : 'px-4 py-2 text-[13px]',
        variant === 'primary'
          ? 'bg-daf-gradient text-[#050508] hover:shadow-[0_8px_30px_-6px_rgba(124,58,237,0.55)]'
          : 'border border-border-hi text-text hover:border-mint hover:bg-mint/[0.06]',
        className
      )}
      style={{ transition: 'transform 0.3s cubic-bezier(.16,.84,.32,1), box-shadow 0.3s, background 0.3s, border-color .3s' }}
    >
      {children}
    </a>
  );
}
