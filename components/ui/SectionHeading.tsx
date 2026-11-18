import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  className,
  as: Tag = 'h2',
}: Props) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow mb-5', dark ? 'text-brand' : 'text-brand-700')}>
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          'text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]',
          dark ? 'text-white' : 'text-slate-900',
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            'mt-5 text-pretty text-base leading-relaxed sm:text-lg',
            dark ? 'text-slate-300' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
