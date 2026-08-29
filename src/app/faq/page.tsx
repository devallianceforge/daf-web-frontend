import type { Metadata } from 'next';
import { FAQ } from '@/data/faq';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'FAQ — Dev Alliance Forge',
  description: 'Frequently asked questions about joining and participating in Dev Alliance Forge.'
};

export default function FaqPage() {
  return (
    <main className="pb-[120px] pt-[160px]">
      <div className="mx-auto max-w-[880px] px-6">
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
            FAQ
          </span>
          <h1 className="mb-6 font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
            Answers before you ask.
          </h1>
          <p className="text-lg text-text-muted">
            The questions we hear most often. Anything else — email us through the contact page.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-daf border border-border bg-surface px-7 py-5 transition-colors duration-300 ease-daf open:border-border-hi">
                <summary className="flex items-center justify-between gap-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="font-mono text-xl text-mint transition-transform duration-300 ease-daf group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-text-muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}