import { Mail, Phone } from 'lucide-react';
import ButtonLink from '@/components/ui/ButtonLink';
import { COMPANY } from '@/lib/site';
import CtaBandInner from '@/components/CtaBandInner';

/** Closing call-to-action used at the foot of every inner page. */
export default function CtaBand({ label, href }: { label: string; href: string }) {
  return (
    <section data-theme="dark" className="relative isolate overflow-hidden bg-black py-16 text-white lg:py-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-60 w-[36rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[130px]" />
      <div className="container">
        <CtaBandInner label={label} href={href} phone={COMPANY.phone} phoneHref={COMPANY.phoneHref} email={COMPANY.email} />
      </div>
    </section>
  );
}
