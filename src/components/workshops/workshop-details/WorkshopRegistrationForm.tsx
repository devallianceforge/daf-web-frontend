'use client';

import { FormEvent, useState } from 'react';

type WorkshopRegistrationFormProps = {
  workshopTitle: string;
  workshopSlug: string;
  workshopDate?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  experience: string;
  github: string;
  goal: string;
};

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  experience: '',
  github: '',
  goal: ''
};

export function WorkshopRegistrationForm({
  workshopTitle,
  workshopSlug,
  workshopDate
}: WorkshopRegistrationFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  function updateField(
    field: keyof FormState,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/workshops/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workshopTitle,
          workshopSlug,
          workshopDate,
          ...form
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || 'Registration could not be submitted.'
        );
      }

      setStatus('success');
      setMessage(
        'Your workshop registration has been submitted successfully.'
      );
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus('error');

      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[24px] border border-mint/25 bg-mint/[0.06] p-7 sm:p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
          registration_received
        </div>

        <h2 className="mt-4 font-display text-[28px] font-semibold">
          You&apos;re on the list.
        </h2>

        <p className="mt-3 max-w-[560px] text-[14px] leading-6 text-text-muted">
          {message} The DAF team can contact you using the email address you
          provided.
        </p>

        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 font-mono text-[11px] text-mint transition-opacity hover:opacity-70"
        >
          submit_another_registration()
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[26px] border border-border bg-surface p-6 sm:p-8"
    >
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
          participant_details
        </span>

        <h2 className="mt-3 font-display text-[28px] font-semibold">
          Reserve your seat
        </h2>

        <p className="mt-3 text-[13.5px] leading-6 text-text-muted">
          Tell us a little about yourself so the workshop team can prepare for
          the session.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) =>
              updateField('name', event.target.value)
            }
            className={inputClassName}
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              updateField('email', event.target.value)
            }
            className={inputClassName}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Phone" required>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(event) =>
              updateField('phone', event.target.value)
            }
            className={inputClassName}
            placeholder="+880..."
          />
        </Field>

        <Field label="Experience level" required>
          <select
            required
            value={form.experience}
            onChange={(event) =>
              updateField('experience', event.target.value)
            }
            className={inputClassName}
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Professional">Professional</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="GitHub / Portfolio">
          <input
            type="url"
            value={form.github}
            onChange={(event) =>
              updateField('github', event.target.value)
            }
            className={inputClassName}
            placeholder="https://github.com/..."
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="What do you want to learn from this workshop?">
          <textarea
            rows={5}
            value={form.goal}
            onChange={(event) =>
              updateField('goal', event.target.value)
            }
            className={`${inputClassName} resize-none`}
            placeholder="Tell us what you hope to learn..."
          />
        </Field>
      </div>

      {status === 'error' && (
        <div className="mt-5 rounded-[14px] border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-[13px] text-red-300">
          {message}
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <span className="font-mono text-[10px] text-text-dim">
          workshop.register()
        </span>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-full border border-mint/30 bg-mint/10 px-6 py-3 text-sm font-semibold text-mint transition-all duration-300 hover:border-mint/50 hover:bg-mint/[0.14] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'submitting'
            ? 'Submitting...'
            : 'Submit registration'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
        {label}
        {required && <span className="ml-1 text-mint">*</span>}
      </span>

      {children}
    </label>
  );
}

const inputClassName =
  'w-full rounded-[14px] border border-border bg-bg/70 px-4 py-3 text-[13px] text-text outline-none transition-all duration-300 placeholder:text-text-dim focus:border-mint/40 focus:ring-2 focus:ring-mint/[0.06]';