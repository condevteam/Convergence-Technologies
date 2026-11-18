'use client';

import emailjs from '@emailjs/browser';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { COMPANY, PRIVACY_HREF, SERVICE_OPTIONS, resolveServiceParam } from '@/lib/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/**
 * EmailJS setup
 * -------------
 * Template variables (must match exactly in your EmailJS template):
 *   {{fullName}}  {{company}}  {{email}}  {{phone}}  {{service}}
 *   {{details}}  {{specs}}  {{timeframe}}  {{location}}  {{notes}}
 * Set "Reply-To" in the template to {{email}} so you can reply straight to the sender.
 */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const MIN_FILL_MS = 2000;

type Values = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  specs: string;
  timeframe: string;
  location: string;
  notes: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: Values = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  details: '',
  specs: '',
  timeframe: '',
  location: '',
  notes: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  if (v.company.trim().length < 2) e.company = 'Please enter your company or organisation.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid business email address.';
  if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Please enter a valid telephone number.';
  if (!v.service) e.service = 'Please select the service you require.';
  if (v.details.trim().length < 10) e.details = 'Please describe your equipment or project (at least a sentence).';
  return e;
}

const FIELD_ORDER: Array<keyof Values> = [
  'fullName', 'company', 'email', 'phone', 'service',
  'details', 'specs', 'timeframe', 'location', 'notes',
];

const inputClass = (invalid: boolean) =>
  cn(
    'w-full rounded-md border bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400',
    'transition-all duration-200 outline-none',
    'focus:border-brand focus:ring-2 focus:ring-brand/25',
    invalid ? 'border-brand-700 bg-brand-50/40' : 'border-slate-300 hover:border-slate-400',
  );

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const preselect = resolveServiceParam(searchParams.get('service'));

  const [values, setValues] = useState<Values>({ ...EMPTY, service: preselect });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const honeypot = useRef<HTMLInputElement>(null);
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (preselect) setValues((v) => ({ ...v, service: preselect }));
  }, [preselect]);

  const set =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(`qf-${firstInvalid}`)?.focus();
      return;
    }

    if (honeypot.current?.value) {
      setStatus('success');
      return;
    }
    if (Date.now() - mountedAt.current < MIN_FILL_MS) {
      setErrorMessage('Please review your enquiry and try submitting again.');
      setStatus('error');
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setErrorMessage(
        'The enquiry form is not configured yet. Please email or call us using the details on this page.',
      );
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');
    try {
      const serviceLabel =
        SERVICE_OPTIONS.find((o) => o.value === values.service)?.label ?? values.service;
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          fullName: values.fullName.trim(),
          company: values.company.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          service: serviceLabel,
          details: values.details.trim(),
          specs: values.specs.trim() || 'Not provided',
          timeframe: values.timeframe.trim() || 'Not provided',
          location: values.location.trim() || 'Not provided',
          notes: values.notes.trim() || 'Not provided',
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus('success');
      setValues({ ...EMPTY });
    } catch {
      setErrorMessage(
        `We could not send your enquiry. Please try again, or email ${COMPANY.email} directly.`,
      );
      setStatus('error');
    }
  }

  /* ------------------------------ success view ------------------------------ */
  if (status === 'success') {
    return (
      <motion.div
        role="status"
        className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-card"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <CheckCircle2 aria-hidden className="mx-auto h-14 w-14 text-brand" />
        </motion.div>
        <motion.h2
          className="mt-6 text-2xl font-bold text-slate-900"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          Thank you. Your enquiry has been sent.
        </motion.h2>
        <motion.p
          className="mx-auto mt-3 max-w-md text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          Our team will review your requirements and discuss a practical next step.
        </motion.p>
        <motion.button
          type="button"
          onClick={() => {
            setStatus('idle');
            setValues({ ...EMPTY, service: preselect });
          }}
          className="mt-8 rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-brand hover:text-brand-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send another enquiry
        </motion.button>
      </motion.div>
    );
  }

  const sending = status === 'sending';

  /* --------------------------------- form --------------------------------- */
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={sending}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-9"
    >
      <h2 className="text-2xl font-bold text-slate-900">Request a Quote</h2>
      <p className="mt-2 text-sm text-muted">
        Fields marked <span className="font-semibold text-brand-700">*</span> are required.
      </p>

      {/* Honeypot – hidden from people and assistive tech */}
      <div aria-hidden className="hidden">
        <label>
          Leave this field empty
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <input
            id="qf-fullName"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={values.fullName}
            onChange={set('fullName')}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'err-fullName' : undefined}
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        <Field id="company" label="Company / organisation" required error={errors.company}>
          <input
            id="qf-company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            value={values.company}
            onChange={set('company')}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'err-company' : undefined}
            className={inputClass(!!errors.company)}
          />
        </Field>

        <Field id="email" label="Business email" required error={errors.email}>
          <input
            id="qf-email"
            type="email"
            autoComplete="email"
            maxLength={120}
            value={values.email}
            onChange={set('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field id="phone" label="Telephone number" required error={errors.phone}>
          <input
            id="qf-phone"
            type="tel"
            autoComplete="tel"
            maxLength={25}
            placeholder="+94 11 000 0000"
            value={values.phone}
            onChange={set('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
            className={inputClass(!!errors.phone)}
          />
        </Field>

        <Field id="service" label="Service required" required error={errors.service} className="sm:col-span-2">
          <select
            id="qf-service"
            value={values.service}
            onChange={set('service')}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'err-service' : undefined}
            className={inputClass(!!errors.service)}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="details" label="Equipment / project details" required error={errors.details} className="sm:col-span-2">
          <textarea
            id="qf-details"
            rows={4}
            maxLength={2000}
            value={values.details}
            onChange={set('details')}
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? 'err-details' : undefined}
            className={inputClass(!!errors.details)}
          />
        </Field>

        <Field id="specs" label="Quantity and technical specifications (if applicable)" className="sm:col-span-2">
          <textarea
            id="qf-specs"
            rows={3}
            maxLength={2000}
            value={values.specs}
            onChange={set('specs')}
            className={inputClass(false)}
          />
        </Field>

        <Field id="timeframe" label="Required date or timeframe">
          <input
            id="qf-timeframe"
            type="text"
            maxLength={100}
            value={values.timeframe}
            onChange={set('timeframe')}
            className={inputClass(false)}
          />
        </Field>

        <Field id="location" label="Delivery / service location">
          <input
            id="qf-location"
            type="text"
            autoComplete="address-level2"
            maxLength={150}
            value={values.location}
            onChange={set('location')}
            className={inputClass(false)}
          />
        </Field>

        <Field id="notes" label="Additional notes" className="sm:col-span-2">
          <textarea
            id="qf-notes"
            rows={3}
            maxLength={2000}
            value={values.notes}
            onChange={set('notes')}
            className={inputClass(false)}
          />
        </Field>
      </div>

      <p className="mt-6 rounded-md bg-surface px-4 py-3 text-xs leading-relaxed text-muted">
        Do not include passwords, private keys, or sensitive system credentials in this form.
      </p>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-md border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
            <p>{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-8 py-4 text-[15px] font-semibold text-white shadow-glow transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          whileHover={sending ? {} : { scale: 1.02 }}
          whileTap={sending ? {} : { scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {sending ? (
            <>
              <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Get a Quote
              <Send aria-hidden className="h-4 w-4" />
            </>
          )}
        </motion.button>
        <p className="text-xs leading-relaxed text-muted sm:max-w-xs sm:text-right">
          By submitting, you acknowledge our{' '}
          <Link href={PRIVACY_HREF} className="font-medium text-brand-700 underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {sending ? 'Sending your enquiry' : ''}
      </span>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`qf-${id}`} className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="ml-1 text-brand-700" aria-hidden>*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`err-${id}`}
            className="mt-1.5 text-sm font-medium text-brand-700"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
