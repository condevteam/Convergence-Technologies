'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Mail,
  Phone,
  Radar,
  Siren,
  Workflow,
} from 'lucide-react';
import { motion } from 'framer-motion';
import ButtonLink from '@/components/ui/ButtonLink';
import SectionHeading from '@/components/ui/SectionHeading';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/MotionPrimitives';
import { IMAGES } from '@/lib/images';
import { COMPANY, INFRA_CATEGORIES, SERVICES, contactHref } from '@/lib/site';
import { cn } from '@/lib/utils';

const WHY_POINTS = [
  'Operations-led approach: focus on visibility, uptime, incident response, and practical service delivery.',
  'Technical consultancy: recommendations shaped around the customer\u2019s environment, business requirements, and budget.',
  'Flexible access to hardware: rental and sourcing options to support projects and changing capacity needs.',
  'Infrastructure-focused portfolio: networking, security, compute, wireless, telephony, storage, and spare parts.',
  'One point of coordination: support across planning, procurement, deployment, and ongoing operational needs.',
].map((text) => {
  const i = text.indexOf(': ');
  return { lead: text.slice(0, i), rest: text.slice(i + 2) };
});

const NOC_POINTS = [
  {
    icon: Radar,
    title: 'Monitoring',
    text: 'Infrastructure monitoring for servers, network devices, firewalls, wireless infrastructure, and selected services.',
  },
  {
    icon: Siren,
    title: 'Incident coordination',
    text: 'Alert triage, prioritisation, incident logging, and escalation coordination.',
  },
  {
    icon: Workflow,
    title: 'Escalation',
    text: 'Coordination with customer IT teams, service providers, and designated support contacts.',
  },
  {
    icon: BarChart3,
    title: 'Reporting',
    text: 'Operational dashboards and periodic service or performance reports.',
  },
];

const HOW_WE_WORK = [
  { title: 'Understand', text: 'Understand the requirement before recommending a solution.' },
  { title: 'Assess', text: 'Review your environment, compatibility, and lifecycle considerations.' },
  { title: 'Recommend', text: 'Fit-for-purpose recommendations shaped around your requirements and budget.' },
  { title: 'Deliver / Coordinate', text: 'Coordination across procurement, deployment, and delivery.' },
  { title: 'Support', text: 'Ongoing operational and technical support under an agreed scope.' },
];

const ease = [0.22, 1, 0.36, 1] as const;

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay: d },
  }),
};

export default function HomePageClient() {
  const noc = SERVICES[0];

  return (
    <>
      {/* ========================= HERO ========================= */}
      <section data-theme="dark" className="relative isolate overflow-hidden bg-black text-white">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover opacity-40"
        />
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-black via-transparent to-black/60" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark bg-grid [mask-image:linear-gradient(to_right,black,transparent_80%)]" />
        <motion.div
          aria-hidden
          className="absolute -left-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand/20 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute right-0 bottom-0 -z-10 h-64 w-64 rounded-full bg-brand/10 blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="container relative py-24 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <motion.p
              className="eyebrow mb-7 text-brand"
              custom={0}
              variants={heroItem}
              initial="hidden"
              animate="visible"
            >
              {COMPANY.tagline}
            </motion.p>

            <motion.h1
              className="text-balance text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
              custom={0.08}
              variants={heroItem}
              initial="hidden"
              animate="visible"
            >
              Your Infrastructure.
              <br />
              <span className="text-brand">Our Expertise.</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300 sm:text-xl"
              custom={0.18}
              variants={heroItem}
              initial="hidden"
              animate="visible"
            >
              Convergence Technology helps organisations keep critical IT infrastructure running
              through NOC operations, technology consultancy, data center solutions, flexible IT
              hardware rentals, and OEM spare parts sourcing.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
              custom={0.28}
              variants={heroItem}
              initial="hidden"
              animate="visible"
            >
              <ButtonLink href={contactHref()} variant="primary">
                Discuss Your Requirements
              </ButtonLink>
              <ButtonLink href="#services" variant="secondary" arrow={false}>
                Explore Our Services
              </ButtonLink>
            </motion.div>
          </div>
        </div>

        {/* supporting line strip */}
        <motion.div
          className="relative border-t border-white/10 bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="container flex flex-col gap-3 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-3 text-slate-300">
              <span aria-hidden className="h-2 w-2 animate-pulse-dot rounded-full bg-brand" />
              {COMPANY.supportingLine}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {SERVICES.map((s) => (
                <li key={s.value}>{s.title}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ===================== INTRO ===================== */}
      <section className="section-y bg-white">
        <div className="container">
          <FadeInUp>
            <div className="mx-auto max-w-4xl border-l-4 border-brand pl-6 sm:pl-10">
              <p className="text-pretty font-display text-xl font-medium leading-relaxed text-slate-900 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.5]">
                Technology infrastructure needs more than equipment. It needs visibility, sound design,
                dependable support, and access to the right hardware when it matters. Convergence
                Technology brings operational support, technical expertise, infrastructure solutions,
                and hardware sourcing together to help businesses plan, deploy, maintain, and scale
                their IT environments.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* =================== CORE SERVICES =================== */}
      <section id="services" className="section-y relative scroll-mt-24 bg-surface">
        <div aria-hidden className="absolute inset-0 bg-grid-light bg-grid [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Core services"
            title="Five service pillars. One infrastructure partner."
          />

          <StaggerContainer as="ul" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {SERVICES.map((s, i) => (
              <StaggerItem
                as="li"
                key={s.value}
                className={cn('lg:col-span-2', i >= 3 && 'lg:col-span-3')}
              >
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-card-hover"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-black text-brand ring-1 ring-black transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <s.icon
                        aria-hidden
                        className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span aria-hidden className="font-display text-sm font-semibold tracking-widest text-slate-300">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{s.blurb}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Learn more
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =================== NOC SPOTLIGHT =================== */}
      <section data-theme="dark" className="section-y relative isolate overflow-hidden bg-slate-dark text-white">
        <Image
          src={IMAGES.noc}
          alt=""
          fill
          sizes="100vw"
          className="-z-30 object-cover opacity-20"
        />
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-dark via-slate-dark/90 to-black/80" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />

        <div className="container relative">
          <div className="grid items-start gap-14 lg:grid-cols-12">
            <FadeInUp className="lg:col-span-5">
              <SectionHeading
                tone="dark"
                eyebrow="NOC spotlight"
                title="NOC Operations That Help You Stay Ahead."
                description="A clear view of infrastructure health helps teams identify issues earlier, coordinate response, and make better operational decisions. Convergence Technology can help design or support monitoring and NOC workflows aligned with your infrastructure, service priorities, and escalation requirements."
              />
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={contactHref(noc.value)} variant="primary">
                  {noc.cta}
                </ButtonLink>
                <ButtonLink href={noc.href} variant="secondary" arrow={false}>
                  View NOC Operations
                </ButtonLink>
              </div>
            </FadeInUp>

            <StaggerContainer as="ul" className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {NOC_POINTS.map((p) => (
                <StaggerItem
                  as="li"
                  key={p.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors hover:border-brand/60 hover:bg-white/[0.07]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-brand ring-1 ring-white/10">
                    <p.icon aria-hidden className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{p.text}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ============= INFRASTRUCTURE & RENTAL CATEGORIES ============= */}
      <section className="section-y bg-white">
        <div className="container">
          <FadeInUp className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Infrastructure & rental categories"
              title="Enterprise IT Hardware When You Need It."
              description="Get access to infrastructure equipment for temporary projects, capacity expansion, migrations, proof-of-concept activities, replacement requirements, or business continuity. Rental availability, specifications, terms, and delivery timelines are confirmed against each enquiry."
            />
            <ButtonLink href="/it-hardware-rentals" variant="outline" className="self-start lg:self-end">
              Explore IT Hardware Rentals
            </ButtonLink>
          </FadeInUp>

          <StaggerContainer as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INFRA_CATEGORIES.map((c) => (
              <StaggerItem as="li" key={c.title}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-card-hover"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-slate-900 ring-1 ring-slate-200 transition-colors duration-300 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                    <c.icon aria-hidden className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{c.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    {c.href.startsWith('/contact') ? 'Request availability' : 'Learn more'}
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Spare parts callout */}
          <FadeInUp>
            <div
              data-theme="dark"
              className="relative isolate mt-12 overflow-hidden rounded-3xl bg-black px-7 py-12 text-white sm:px-12 lg:px-16 lg:py-14"
            >
              <Image
                src={IMAGES.parts}
                alt=""
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="-z-30 object-cover opacity-30"
              />
              <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-black via-black/90 to-black/40" />
              <div aria-hidden className="absolute inset-y-0 left-0 -z-10 w-1.5 bg-brand" />
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="eyebrow mb-4 text-brand">OEM Spare Parts</p>
                  <h3 className="text-balance text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                    The Right Spare Parts for Critical Infrastructure.
                  </h3>
                  <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-slate-300">
                    When enterprise equipment fails or requires maintenance, identifying the correct
                    component is essential. Convergence Technology assists with sourcing OEM and
                    suitable compatible spare parts for supported server, storage, networking, and data
                    center platforms.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <ButtonLink href={contactHref('spare-parts')} variant="primary">
                    Send a Spare Parts Enquiry
                  </ButtonLink>
                  <ButtonLink href="/oem-spare-parts" variant="secondary" arrow={false}>
                    About OEM Spare Parts
                  </ButtonLink>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ============= WHY CONVERGENCE TECHNOLOGY ============= */}
      <section className="section-y bg-surface">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-12">
            <FadeInUp className="lg:col-span-5">
              <SectionHeading eyebrow="Why choose us" title="Why Convergence Technology" />
              <p className="mt-6 max-w-md text-lg font-medium text-slate-900">
                {COMPANY.tagline}
              </p>
            </FadeInUp>

            <StaggerContainer as="ul" className="space-y-4 lg:col-span-7">
              {WHY_POINTS.map((p) => (
                <StaggerItem
                  as="li"
                  key={p.lead}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:border-brand/30 hover:shadow-card-hover"
                >
                  <CheckCircle2 aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand" strokeWidth={2} />
                  <p className="text-[15px] leading-relaxed text-muted sm:text-base">
                    <strong className="font-semibold text-slate-900">{p.lead}:</strong> {p.rest}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ============= HOW WE WORK — animated timeline ============= */}
      <section className="section-y bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="Understand → Assess → Recommend → Deliver → Support"
            align="center"
          />

          <StaggerContainer as="ol" className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
            <div aria-hidden className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-brand/0 via-slate-300 to-brand/0 md:block" />
            {HOW_WE_WORK.map((step, i) => (
              <StaggerItem as="li" key={step.title} className="relative text-center">
                <motion.span
                  className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black font-display text-lg font-bold text-white ring-8 ring-white"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <span className="text-brand">{i + 1}</span>
                </motion.span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============= ENQUIRY CTA ============= */}
      <section data-theme="dark" className="section-y relative isolate overflow-hidden bg-black text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container">
          <FadeInUp className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-6 text-brand">Tell us what you need.</p>
            <h2 className="text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
              Need to improve operations, upgrade infrastructure, or source critical hardware?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300">
              Tell us what you are planning or what needs attention. Our team will review your
              requirements and discuss a practical next step.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href={contactHref()} variant="primary">
                Send an Enquiry
              </ButtonLink>
              <div className="flex flex-col items-center gap-2 text-sm text-slate-300 sm:flex-row sm:gap-6 sm:pl-4">
                <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Phone aria-hidden className="h-4 w-4 text-brand" />
                  {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Mail aria-hidden className="h-4 w-4 text-brand" />
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
