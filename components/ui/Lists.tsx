'use client';

import { CheckCircle2, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StaggerContainer, StaggerItem } from '@/components/MotionPrimitives';

type Tone = 'light' | 'dark';

/** Bulleted items as a grid of check-marked tiles. */
export function CheckGrid({
  items,
  tone = 'light',
  cols = 2,
}: {
  items: string[];
  tone?: Tone;
  cols?: 1 | 2 | 3;
}) {
  const dark = tone === 'dark';
  return (
    <StaggerContainer
      as="ul"
      className={cn(
        'grid gap-4',
        cols === 2 && 'md:grid-cols-2',
        cols === 3 && 'md:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {items.map((text) => (
        <StaggerItem
          as="li"
          key={text}
          className={cn(
            'flex gap-4 rounded-2xl border p-6',
            dark
              ? 'border-white/10 bg-white/[0.04] backdrop-blur'
              : 'border-slate-200 bg-white shadow-card',
          )}
        >
          <CheckCircle2 aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
          <span
            className={cn(
              'text-[15px] leading-relaxed sm:text-base',
              dark ? 'text-slate-200' : 'text-slate-700',
            )}
          >
            {text}
          </span>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export type IconCardItem = { title: string; text: string; icon: LucideIcon };

/** Cards with an icon tile, a title and a description. */
export function IconCards({
  items,
  tone = 'light',
  cols = 3,
}: {
  items: IconCardItem[];
  tone?: Tone;
  cols?: 2 | 3 | 4;
}) {
  const dark = tone === 'dark';
  return (
    <StaggerContainer
      as="ul"
      className={cn(
        'grid gap-5 sm:grid-cols-2',
        cols === 3 && 'lg:grid-cols-3',
        cols === 4 && 'lg:grid-cols-4',
      )}
    >
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={item.title}
          className={cn(
            'group flex flex-col rounded-2xl border p-7 transition-all duration-300',
            dark
              ? 'border-white/10 bg-white/[0.04] backdrop-blur hover:border-brand/60 hover:bg-white/[0.07]'
              : 'border-slate-200 bg-white shadow-card hover:-translate-y-1 hover:border-brand/50 hover:shadow-card-hover',
          )}
        >
          <span
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300',
              dark
                ? 'bg-black text-brand ring-1 ring-white/10'
                : 'bg-black text-brand group-hover:bg-brand group-hover:text-white',
            )}
          >
            <item.icon aria-hidden className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
          </span>
          <h3 className={cn('mt-6 text-lg font-bold', dark ? 'text-white' : 'text-slate-900')}>
            {item.title}
          </h3>
          <p className={cn('mt-2 text-[15px] leading-relaxed', dark ? 'text-slate-300' : 'text-muted')}>
            {item.text}
          </p>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
