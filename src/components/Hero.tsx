'use client';

import { useEffect, useState } from 'react';
import { ParticleField } from './ParticleField';
import { MagneticButton } from './MagneticButton';
import { PixelScatterLogo } from './PixelScatterLogo';
import { HERO } from '@/data/site';

function useBootLine() {
  const [text, setText] = useState('');

  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;
    let typeInterval: ReturnType<typeof setInterval>;
    let restartTimeout: ReturnType<typeof setTimeout>;

    function typeMessage() {
      const message = HERO.bootMessages[messageIndex % HERO.bootMessages.length]!;
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
    <section className="relative flex min-h-svh items-center overflow-hidden pt-[96px] lg:pt-[120px]">
      <ParticleField />
      <div
        className="pointer-events-none absolute left-1/2 top-[-300px] z-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full blur-[10px]"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 60%)' }}
      />
      <div className="container relative z-[2] mx-auto flex w-full max-w-[1240px] flex-col gap-4 px-6 py-5 lg:h-[calc(100vh-120px)] lg:min-h-[540px] lg:flex-row lg:items-stretch lg:gap-0 lg:py-0">
        <div className="flex max-w-[820px] flex-col justify-center lg:w-1/2 lg:max-w-none lg:pr-16">
          <div className="mb-3 flex min-h-[20px] items-center gap-0.5 font-mono text-[13px] text-mint lg:mb-[22px]">
            {bootText}
            <span className="ml-[3px] inline-block h-4 w-2 animate-blink bg-mint" />
          </div>

          <h1 className="mb-3 font-display text-[clamp(40px,7vw,84px)] font-semibold leading-[1.02] tracking-tight lg:mb-6">
            {HERO.headline.map((line, i) =>
              i === 1 ? (
                <span key={line} className="block bg-daf-gradient bg-clip-text text-transparent">
                  {line}
                </span>
              ) : (
                <span key={line} className="block">
                  {line}
                </span>
              )
            )}
          </h1>

          <p className="mb-4 max-w-[560px] text-base text-text-muted lg:mb-10 lg:text-lg">{HERO.subhead}</p>

          <div className="mb-6 flex flex-wrap gap-2 lg:mb-16 lg:gap-4">
            <MagneticButton href={HERO.primaryCta.href}>{HERO.primaryCta.label}</MagneticButton>
            <MagneticButton href={HERO.secondaryCta.href} variant="ghost">
              {HERO.secondaryCta.label}
            </MagneticButton>
          </div>
        </div>

        <div className="relative h-[130px] w-full lg:h-full lg:w-1/2">
          <PixelScatterLogo sizingMode="fill" />
        </div>
      </div>
    </section>
  );
}
