import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="mb-6 mt-12 font-display text-3xl font-semibold first:mt-0" {...props} />
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="mb-4 mt-10 font-display text-2xl font-semibold" {...props} />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className="mb-3 mt-8 font-display text-xl font-semibold" {...props} />
    ),
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
      <p className="mb-5 leading-relaxed text-text-muted" {...props} />
    ),
    a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
      href?.startsWith('/') ? (
        <Link href={href} className="text-mint underline underline-offset-4 hover:text-mint/80" {...props} />
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mint underline underline-offset-4 hover:text-mint/80"
          {...props}
        />
      ),
    ul: (props: HTMLAttributes<HTMLUListElement>) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-text-muted" {...props} />
    ),
    ol: (props: HTMLAttributes<HTMLOListElement>) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-text-muted" {...props} />
    ),
    li: (props: HTMLAttributes<HTMLLIElement>) => <li className="pl-1" {...props} />,
    blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="mb-5 border-l-2 border-mint/40 pl-5 italic text-text-muted"
        {...props}
      />
    ),
    code: (props: HTMLAttributes<HTMLElement>) => (
      <code
        className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-mint"
        {...props}
      />
    ),
    pre: (props: HTMLAttributes<HTMLPreElement>) => (
      <pre
        className="mb-6 overflow-x-auto rounded-daf border border-border bg-surface p-5 font-mono text-[13px] leading-relaxed [&_code]:border-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-text"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-border" />,
    strong: (props: HTMLAttributes<HTMLElement>) => (
      <strong className="font-semibold text-text" {...props} />
    ),
    ...components
  };
}
