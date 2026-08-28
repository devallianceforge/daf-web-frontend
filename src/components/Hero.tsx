'use client';

import { useEffect, useState } from 'react';
import { ParticleField } from './ParticleField';
import { MagneticButton } from './MagneticButton';
import { PixelScatterLogo } from './PixelScatterLogo';

const BOOT_MESSAGES = ['$ daf --init', '$ compiling community...', '$ loading community builders... done', '$ ready.'];

function useBootLine() {
  const [text, setText] = useState('');

  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;
    let typeInterval: ReturnType<typeof setInterval>;
    let restartTimeout: ReturnType<typeof setTimeout>;

    function typeMessage() {
      const message = BOOT_MESSAGES[messageIndex % BOOT_MESSAGES.length]!;
      charIndex = 0;
      typeInterval = setInterval(() => {
        charIndex++;
        setText(message.slice(0, charIndex));
        if (charIndex >= message.length) {
          clearInterval(typeInterval);
          restartTimeout = setTimeout(() => {
            messageIndex++;
            typeMessage();
          }, 1100);
        }
      }, 45);
    }

    typeMessage();
    return () => {
      clearInterval(typeInterval);
      clearTimeout(restartTimeout);
    };
  }, []);

  return text;
}

export function Hero() {
  const bootText = useBootLine();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-[120px]">
      <ParticleField />
      <div
        className="pointer-events-none absolute left-1/2 top-[-300px] z-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full blur-[10px]"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 60%)' }}
      />
      <div className="container relative z-[2] mx-auto flex w-full max-w-[1240px] flex-col gap-14 px-6 py-10 lg:h-[calc(100vh-120px)] lg:min-h-[540px] lg:flex-row lg:items-stretch lg:gap-0 lg:py-0">
        <div className="flex max-w-[820px] flex-col justify-center lg:w-1/2 lg:max-w-none lg:pr-16">
          <div className="mb-[22px] flex min-h-[20px] items-center gap-0.5 font-mono text-[13px] text-mint">
            {bootText}
            <span className="ml-[3px] inline-block h-4 w-2 animate-blink bg-mint" />
          </div>

          <h1 className="mb-6 font-display text-[clamp(40px,7vw,84px)] font-semibold leading-[1.02] tracking-tight">
            <span className="block">We forge</span>
            <span className="block bg-daf-gradient bg-clip-text text-transparent">developers,</span>
            <span className="block">not just code.</span>
          </h1>

          <p className="mb-10 max-w-[560px] text-lg text-text-muted">
            Dev Alliance Forge is a volunteer-driven community where students, developers, and IT
            professionals learn, build, and elevate — together. Your alliance for innovation, your forge
            for impact.
          </p>

          <div className="mb-16 flex flex-wrap gap-4">
            <MagneticButton href="/contact">Join the Community</MagneticButton>
            <MagneticButton href="/events" variant="ghost">
              Explore Events
            </MagneticButton>
          </div>
        </div>

        <div className="relative h-[240px] w-full lg:h-full lg:w-1/2">
          <PixelScatterLogo sizingMode="fill" />
        </div>
      </div>

      <div className="absolute bottom-9 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider text-text-dim">
        <span>Scroll</span>
        <span className="h-9 w-px origin-top animate-scrollcue bg-gradient-to-b from-mint to-transparent" />
      </div>
    </section>
  );
}
