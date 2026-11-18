'use client';

/**
 * Reusable framer-motion primitives for the Convergence Technology website.
 * All viewport-triggered animations use `once: true` so they fire once on
 * scroll-in and never re-play, keeping the experience clean and performant.
 * Content is always visible even if JS hasn't hydrated yet (initial opacity
 * is set via CSS fallback through Tailwind, framer overrides on mount).
 */

import {
  motion,
  type Variants,
  type HTMLMotionProps,
  type MotionProps,
} from 'framer-motion';

/* -------------------------------------------------------------------------- */
/*  Shared variants                                                            */
/* -------------------------------------------------------------------------- */

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* -------------------------------------------------------------------------- */
/*  FadeInUp – single element that fades up on scroll                         */
/* -------------------------------------------------------------------------- */

type FadeInUpProps = HTMLMotionProps<'div'> & {
  delay?: number;
  /** Override the default amount of element that must be visible */
  amount?: number;
};

export function FadeInUp({ delay = 0, amount = 0.2, children, ...rest }: FadeInUpProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  StaggerContainer – wraps a list; children animate in sequence             */
/* -------------------------------------------------------------------------- */

type StaggerContainerProps = HTMLMotionProps<'div'> & {
  as?: 'div' | 'ul' | 'ol' | 'section';
  amount?: number;
};

export function StaggerContainer({
  as = 'div',
  amount = 0.1,
  children,
  ...rest
}: StaggerContainerProps) {
  const Tag = motion[as] as React.ElementType;
  return (
    <Tag
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...(rest as MotionProps)}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  StaggerItem – direct child of StaggerContainer                            */
/* -------------------------------------------------------------------------- */

type StaggerItemProps = HTMLMotionProps<'div'> & {
  as?: 'div' | 'li';
};

export function StaggerItem({ as = 'div', children, ...rest }: StaggerItemProps) {
  const Tag = motion[as] as React.ElementType;
  return (
    <Tag variants={staggerItemVariants} {...(rest as MotionProps)}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  HoverCardGlow – wraps a card with a subtle lift + red border glow         */
/* -------------------------------------------------------------------------- */

type HoverCardGlowProps = HTMLMotionProps<'div'>;

export function HoverCardGlow({ children, className, ...rest }: HoverCardGlowProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
