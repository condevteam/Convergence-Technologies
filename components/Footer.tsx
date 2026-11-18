import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from '@/components/Logo';
import { COMPANY, NAV_LINKS, PRIVACY_HREF, SERVICES } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-black text-slate-300">
      {/* red hairline */}
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-brand to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${COMPANY.name} – home`} className="inline-block">
              <Logo variant="dark" className="w-56" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              {COMPANY.supportingLine}
            </p>
            <p className="mt-4 font-display text-sm font-semibold tracking-wide text-white">
              {COMPANY.tagline}
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Footer services" className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Services
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company" className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Company
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href={NAV_LINKS.about.href} className="transition-colors hover:text-white">
                  {NAV_LINKS.about.label}
                </Link>
              </li>
              <li>
                <Link href={NAV_LINKS.contact.href} className="transition-colors hover:text-white">
                  {NAV_LINKS.contact.label}
                </Link>
              </li>
              <li>
                <Link href={NAV_LINKS.quote.href} className="transition-colors hover:text-white">
                  {NAV_LINKS.quote.label}
                </Link>
              </li>
              <li>
                <Link href={PRIVACY_HREF} className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="inline-flex items-start gap-3 transition-colors hover:text-white">
                  <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={COMPANY.phoneHref} className="inline-flex items-start gap-3 transition-colors hover:text-white">
                  <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {COMPANY.phone}
                </a>
              </li>
              <li className="inline-flex items-start gap-3">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {COMPANY.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="tracking-wide">
            NOC Operations • Consultancy • Data Center Solutions • IT Hardware Rentals • OEM Spare Parts
          </p>
        </div>
      </div>
    </footer>
  );
}
