'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ButtonLink from '@/components/ui/ButtonLink';
import { cn } from '@/lib/utils';

type Props = {
  crumb: string;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  compact?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay },
  }),
};

export default function PageHero({
  crumb,
  eyebrow,
  title,
  description,
  image,
  cta,
  secondary,
  compact,
}: Props) {
  return (
    <section data-theme="dark" className="relative isolate overflow-hidden bg-black text-white">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover opacity-35"
        />
      )}
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-black via-black/85 to-black/40" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark bg-grid [mask-image:linear-gradient(to_right,black,transparent_80%)]" />
      {/* ambient red glow */}
      <div aria-hidden className="absolute -left-40 top-1/2 -z-10 h-80 w-80 rounded-full bg-brand/20 blur-[120px]" />
      <motion.div
        aria-hidden
        className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-brand/10 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className={cn('container relative', compact ? 'py-16 lg:py-20' : 'py-20 lg:py-28')}>
        {/* breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-400"
          custom={0}
          variants={item}
          initial="hidden"
          animate="visible"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight aria-hidden className="h-3.5 w-3.5" />
          <span aria-current="page" className="text-slate-200">
            {crumb}
          </span>
        </motion.nav>

        <div className="max-w-3xl">
          <motion.p
            className="eyebrow mb-6 text-brand"
            custom={0.05}
            variants={item}
            initial="hidden"
            animate="visible"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            className="text-balance text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
            custom={0.12}
            variants={item}
            initial="hidden"
            animate="visible"
          >
            {title}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300"
            custom={0.2}
            variants={item}
            initial="hidden"
            animate="visible"
          >
            {description}
          </motion.p>

          {(cta || secondary) && (
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              custom={0.28}
              variants={item}
              initial="hidden"
              animate="visible"
            >
              {cta && <ButtonLink href={cta.href}>{cta.label}</ButtonLink>}
              {secondary && (
                <ButtonLink href={secondary.href} variant="secondary" arrow={false}>
                  {secondary.label}
                </ButtonLink>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
