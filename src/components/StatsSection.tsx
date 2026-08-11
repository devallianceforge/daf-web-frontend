'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { STATS } from '@/data/site';

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{value}</span>;
}

export function StatsSection() {
  return (
    <section className="border-y border-border py-16">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-9 px-6 text-center md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-[clamp(30px,4vw,48px)] font-bold">
              {stat.display ?? (
                <>
                  <Counter target={stat.value ?? 0} />
                  {stat.suffix}
                </>
              )}
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
