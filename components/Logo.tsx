import { BRAND_IMAGES } from '@/lib/images';
import { COMPANY } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * The supplied logo PNGs have generous empty margins. This component crops
 * them (purely with CSS) to the artwork's bounding box, so you can size the
 * logo by width/height classes without trimming the source files.
 */
const CROPS = {
  // black_bg_logo.png – 1672 × 941
  dark: { src: BRAND_IMAGES.logoDark, w: 1672, h: 941, x: 270, y: 135, cw: 1136, ch: 665 },
  // logo.png – 1774 × 887
  light: { src: BRAND_IMAGES.logoLight, w: 1774, h: 887, x: 264, y: 87, cw: 1246, ch: 696 },
} as const;

type LogoProps = {
  /** `dark` = for dark backgrounds (white wordmark); `light` = for light backgrounds */
  variant: keyof typeof CROPS;
  /** Control size with a width class, e.g. "w-48" */
  className?: string;
};

export default function Logo({ variant, className }: LogoProps) {
  const c = CROPS[variant];
  return (
    <span
      className={cn('relative block overflow-hidden', className)}
      style={{ aspectRatio: `${c.cw} / ${c.ch}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.src}
        alt={`${COMPANY.name} logo`}
        width={c.w}
        height={c.h}
        loading="lazy"
        decoding="async"
        className={cn(
          'absolute max-w-none select-none',
          // the light logo has an off-white canvas; blend it into white surfaces
          variant === 'light' && 'mix-blend-multiply',
        )}
        style={{
          width: `${(c.w / c.cw) * 100}%`,
          left: `${(-c.x / c.cw) * 100}%`,
          top: `${(-c.y / c.ch) * 100}%`,
        }}
      />
    </span>
  );
}
