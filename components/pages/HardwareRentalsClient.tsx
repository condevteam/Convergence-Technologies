'use client';

import { motion } from 'framer-motion';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import { IconCards } from '@/components/ui/Lists';
import SectionHeading from '@/components/ui/SectionHeading';
import { StaggerContainer, StaggerItem } from '@/components/MotionPrimitives';
import { IMAGES } from '@/lib/images';
import { INFRA_CATEGORIES, SERVICES, contactHref } from '@/lib/site';

const CATEGORIES = INFRA_CATEGORIES.slice(0, 5).map(({ title, blurb, icon }) => ({
  title,
  text: blurb,
  icon,
}));

const PROCESS = [
  'Share the equipment type, required specifications, quantity, location, and rental period.',
  'Convergence Technology reviews the technical requirements and availability.',
  'Receive a proposed configuration, commercial terms, and delivery or collection plan.',
  'Agree deployment, return, and support responsibilities before confirmation.',
];

export default function HardwareRentalsClient() {
  const service = SERVICES[3];
  const href = contactHref(service.value);

  return (
    <>
      <PageHero
        crumb="IT Hardware Rentals"
        eyebrow="IT Hardware Rentals"
        title="Enterprise IT Hardware When You Need It."
        description="Get access to infrastructure equipment for temporary projects, capacity expansion, migrations, proof-of-concept activities, replacement requirements, or business continuity. Rental availability, specifications, terms, and delivery timelines are confirmed against each enquiry."
        image={IMAGES.rentals}
        cta={{ label: service.cta, href }}
      />

      <section className="section-y bg-white">
        <div className="container">
          <SectionHeading eyebrow="What you can rent" title="Rental categories" />
          <div className="mt-12">
            <IconCards items={CATEGORIES} cols={3} />
          </div>
        </div>
      </section>

      <section data-theme="dark" className="section-y relative overflow-hidden bg-slate-dark text-white">
        <div aria-hidden className="absolute inset-0 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="container relative">
          <SectionHeading tone="dark" eyebrow="Four steps" title="Rental process" />
          <StaggerContainer as="ol" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <StaggerItem
                as="li"
                key={step}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
              >
                <motion.span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black font-display text-lg font-bold text-brand ring-1 ring-white/15"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {i + 1}
                </motion.span>
                <p className="mt-5 text-[15px] leading-relaxed text-slate-200">{step}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaBand label={service.cta} href={href} />
    </>
  );
}
