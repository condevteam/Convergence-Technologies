'use client';

import { Mail, Phone } from 'lucide-react';
import ButtonLink from '@/components/ui/ButtonLink';
import { FadeInUp } from '@/components/MotionPrimitives';

type Props = {
  label: string;
  href: string;
  phone: string;
  phoneHref: string;
  email: string;
};

export default function CtaBandInner({ label, href, phone, phoneHref, email }: Props) {
  return (
    <FadeInUp className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
      <p className="eyebrow text-brand">Tell us what you need.</p>
      <ButtonLink href={href} className="px-8 py-4 text-base">
        {label}
      </ButtonLink>
      <div className="flex flex-col items-center gap-2 text-sm text-slate-300 sm:flex-row sm:gap-8">
        <a href={phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
          <Phone aria-hidden className="h-4 w-4 text-brand" />
          {phone}
        </a>
        <a href={`mailto:${email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
          <Mail aria-hidden className="h-4 w-4 text-brand" />
          {email}
        </a>
      </div>
    </FadeInUp>
  );
}
