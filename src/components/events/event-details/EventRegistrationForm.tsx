'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type EventRegistrationFormProps = {
  eventTitle: string;
  eventSlug: string;
  eventDate: string;
};

const EXPERIENCE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Professional'
];

export function EventRegistrationForm({
  eventTitle,
  eventSlug,
  eventDate
}: EventRegistrationFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const experience = String(data.get('experience') ?? '').trim();
    const github = String(data.get('github') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !phone || !experience) {
      setStatus('error');
      setError('Please fill in all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventTitle,
          eventSlug,
          eventDate,
          name,
          email,
          phone,
          experience,
          github,
          message
        })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);

        throw new Error(
          body?.error ?? 'Something went wrong while submitting.'
        );
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');

      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[26px] border border-mint/30 bg-mint/[0.06] p-8 text-center sm:p-10">
        <div className="font-mono text-[11px] text-mint">
          $ registration --submitted
        </div>

        <h2 className="mt-4 font-display text-[28px] font-semibold">
          Registration received.
        </h2>

        <p className="mx-auto mt-3 max-w-[520px] text-[14px] leading-6 text-text-muted">
          Your interest in {eventTitle} has been submitted successfully. The
          DAF team can contact you using the information you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim"
          >
            Full name *
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
            className="rounded-xl border border-border bg-[#09090f] px-4 py-3 text-sm text-text outline-none transition-colors duration-200 placeholder:text-text-dim focus:border-mint/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim"
          >
            Email *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="rounded-xl border border-border bg-[#09090f] px-4 py-3 text-sm text-text outline-none transition-colors duration-200 placeholder:text-text-dim focus:border-mint/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim"
          >
            Phone *
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+880 1XXXXXXXXX"
            className="rounded-xl border border-border bg-[#09090f] px-4 py-3 text-sm text-text outline-none transition-colors duration-200 placeholder:text-text-dim focus:border-mint/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="experience"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim"
          >
            Experience level *
          </label>

          <select
            id="experience"
            name="experience"
            required
            defaultValue=""
            className="rounded-xl border border-border bg-[#09090f] px-4 py-3 text-sm text-text outline-none transition-colors duration-200 focus:border-mint/40"
          >
            <option value="" disabled>
              Select level
            </option>

            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="github"
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim"
        >
          GitHub / Portfolio
          <span className="ml-2 normal-case tracking-normal text-text-dim/70">
            optional
          </span>
        </label>

        <input
          id="github"
          name="github"
          type="url"
          placeholder="https://github.com/username"
          className="rounded-xl border border-border bg-[#09090f] px-4 py-3 text-sm text-text outline-none transition-colors duration-200 placeholder:text-text-dim focus:border-mint/40"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim"
        >
          Why do you want to attend?
          <span className="ml-2 normal-case tracking-normal text-text-dim/70">
            optional
          </span>
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={3000}
          placeholder="Tell us what you hope to learn, build, or contribute."
          className="resize-none rounded-xl border border-border bg-[#09090f] px-4 py-3 text-sm leading-6 text-text outline-none transition-colors duration-200 placeholder:text-text-dim focus:border-mint/40"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="font-mono text-[10px] text-text-dim">
          registering_for: <span className="text-mint">{eventTitle}</span>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center rounded-full bg-daf-gradient px-6 py-3 text-sm font-semibold text-[#050508] transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(124,58,237,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting'
            ? 'Submitting...'
            : 'Submit registration'}
        </button>
      </div>
    </form>
  );
}