import { Suspense } from 'react';
import { Mail, MapPin, Phone, ShieldAlert } from 'lucide-react';
import PageHero from '@/components/PageHero';
import QuoteForm from '@/components/QuoteForm';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/MotionPrimitives';
import { pageMetadata } from '@/lib/seo';
import { COMPANY } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact Us & Request a Quote | Convergence Technology',
  description:
    'Request a consultation or quote for NOC operations, consultancy, data center solutions, IT hardware rentals or OEM spare parts.',
  path: '/contact',
});

const PRIVACY_POINTS = [
  'The details you submit through this form, such as your name, company, contact details, and equipment or project requirements, are used to review and respond to your enquiry.',
  'Submissions are delivered to Convergence Technology by email through a third-party email delivery service (EmailJS).',
  'Please do not include passwords, private keys, or sensitive system credentials in this form or in any follow-up email.',
  'This form uses basic spam protection and input validation.',
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        crumb="Contact"
        eyebrow="Contact Us"
        title="Request a Quote"
        description="Tell us what you are planning or what needs attention. Our team will review your requirements and discuss a practical next step."
      />

      <section className="section-y bg-surface">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Contact details sidebar */}
            <FadeInUp className="lg:col-span-4" delay={0.1}>
              <div data-theme="dark" className="relative overflow-hidden rounded-2xl bg-black p-8 text-white shadow-[0_0_0_1px_rgba(249,8,8,0.15),0_20px_60px_-20px_rgba(249,8,8,0.2)]">
                <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-brand" />
                <h2 className="text-xl font-bold">Contact details</h2>
                <StaggerContainer as="ul" className="mt-6 space-y-5 text-[15px]">
                  <StaggerItem as="li">
                    <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-4 text-slate-200 transition-colors hover:text-white">
                      <Mail aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Email</span>
                        {COMPANY.email}
                      </span>
                    </a>
                  </StaggerItem>
                  <StaggerItem as="li">
                    <a href={COMPANY.phoneHref} className="flex items-start gap-4 text-slate-200 transition-colors hover:text-white">
                      <Phone aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Phone</span>
                        {COMPANY.phone}
                      </span>
                    </a>
                  </StaggerItem>
                  <StaggerItem as="li" className="flex items-start gap-4 text-slate-200">
                    <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Location</span>
                      {COMPANY.country}
                    </span>
                  </StaggerItem>
                </StaggerContainer>
                <p className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6 text-sm leading-relaxed text-slate-300">
                  <ShieldAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  Do not send passwords, private keys, or sensitive system credentials through this website.
                </p>
              </div>
            </FadeInUp>

            {/* Quote form */}
            <FadeInUp className="lg:col-span-8" delay={0.2}>
              <Suspense
                fallback={
                  <div className="min-h-[640px] animate-pulse rounded-2xl border border-slate-200 bg-white" aria-hidden />
                }
              >
                <QuoteForm />
              </Suspense>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Privacy notice */}
      <section id="privacy-notice" aria-labelledby="privacy-heading" className="scroll-mt-32 bg-white py-16 lg:py-20">
        <div className="container">
          <FadeInUp className="mx-auto max-w-3xl">
            <p className="eyebrow mb-4 text-brand-700">Your information</p>
            <h2 id="privacy-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Privacy Notice
            </h2>
            <ul className="mt-6 space-y-4">
              {PRIVACY_POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {p}
                </li>
              ))}
              <li className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>
                  To ask about, correct, or delete information you have sent us, contact{' '}
                  <a href={`mailto:${COMPANY.email}`} className="font-medium text-brand-700 underline underline-offset-2">
                    {COMPANY.email}
                  </a>
                  .
                </span>
              </li>
            </ul>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
