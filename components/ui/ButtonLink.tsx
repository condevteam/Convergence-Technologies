import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'dark';

const VARIANTS: Record<Variant, string> = {
  /** Convergence Red – the main conversion button on any background */
  primary:
    'bg-brand text-white hover:bg-brand-700 shadow-glow focus-visible:ring-offset-0',
  /** Ghost button for DARK backgrounds */
  secondary:
    'border border-white/25 text-white hover:border-white hover:bg-white/10 focus-visible:ring-offset-0',
  /** Outline button for LIGHT backgrounds */
  outline:
    'border border-slate-300 text-slate-900 hover:border-brand hover:text-brand-700',
  /** Solid black button for LIGHT backgrounds */
  dark: 'bg-black text-white hover:bg-slate-800',
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  arrow = true,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[15px] font-semibold transition-all duration-200',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
