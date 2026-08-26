'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !message) {
      setError('Please fill in every field.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? 'Something went wrong.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-daf border border-mint/30 bg-mint/6 p-8 text-center">
        <p className="mb-2 font-display text-xl font-semibold text-mint">Message sent.</p>
        <p className="text-sm text-text-muted">We&apos;ll get back to you as soon as we can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-text-dim">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors duration-200 focus:border-mint"
            placeholder="Ada Lovelace"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-text-dim">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors duration-200 focus:border-mint"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-text-dim">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors duration-200 focus:border-mint"
          placeholder="Tell us what you're building, or how we can help."
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-daf-gradient px-6 py-3 text-sm font-semibold text-[#050508] transition-opacity duration-200 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
