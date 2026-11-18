'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { BRAND_IMAGES } from '@/lib/images';
import { COMPANY, NAV_LINKS, SERVICES } from '@/lib/site';
import { cn } from '@/lib/utils';

const normalise = (p: string | null) =>
  !p || p === '/' ? '/' : p.replace(/\/$/, '');

export default function Navbar() {
  const pathname = normalise(usePathname());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => normalise(href) === pathname;
  const servicesActive = SERVICES.some((s) => isActive(s.href));

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const linkClass = (active: boolean) =>
    cn(
      'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
      active ? 'text-white' : 'text-slate-300 hover:text-white',
    );

  return (
    <header
      data-theme="dark"
      className={cn(
        'sticky top-0 z-50 text-white transition-all duration-300',
        scrolled
          ? 'bg-black/80 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.9)] border-b border-white/[0.06]'
          : 'bg-black border-b border-transparent',
      )}
    >
      {/* Utility bar */}
      <div className="hidden border-b border-white/10 bg-slate-dark md:block">
        <div className="container flex h-9 items-center justify-between text-xs text-slate-300">
          <p className="font-medium tracking-wide">
            <span className="text-brand">●</span>&nbsp; {COMPANY.tagline}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone aria-hidden className="h-3.5 w-3.5 text-brand" />
              {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail aria-hidden className="h-3.5 w-3.5 text-brand" />
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-white/10">
        <div className="container flex h-[68px] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${COMPANY.name} – home`}
            className="flex shrink-0 items-center gap-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND_IMAGES.icon}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg"
            />
            <span className="leading-none">
              <span className="block font-display text-[17px] font-bold tracking-[0.18em] text-white">
                CONVERGENCE
              </span>
              <span className="mt-1.5 block text-[9.5px] font-semibold tracking-[0.62em] text-brand">
                TECHNOLOGY
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            <Link href={NAV_LINKS.home.href} className={linkClass(isActive('/'))}>
              {NAV_LINKS.home.label}
              {isActive('/') && <ActiveBar />}
            </Link>

            <div ref={servicesRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                className={cn(linkClass(servicesActive || servicesOpen), 'inline-flex items-center gap-1')}
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown aria-hidden className="h-4 w-4" />
                </motion.span>
                {servicesActive && <ActiveBar />}
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full z-50 w-[360px] -translate-x-1/2 pt-3"
                  >
                    <ul className="overflow-hidden rounded-xl border border-white/10 bg-slate-dark/95 p-2 shadow-2xl backdrop-blur-md">
                      {SERVICES.map((s, i) => (
                        <motion.li
                          key={s.href}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.2 }}
                        >
                          <Link
                            href={s.href}
                            className={cn(
                              'group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-white/5',
                              isActive(s.href) && 'bg-white/5',
                            )}
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-black text-brand ring-1 ring-white/10 transition-colors group-hover:bg-brand group-hover:text-white">
                              <s.icon aria-hidden className="h-[18px] w-[18px]" />
                            </span>
                            <span className="text-sm font-semibold text-white">{s.title}</span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href={NAV_LINKS.about.href} className={linkClass(isActive(NAV_LINKS.about.href))}>
              {NAV_LINKS.about.label}
              {isActive(NAV_LINKS.about.href) && <ActiveBar />}
            </Link>
            <Link href={NAV_LINKS.contact.href} className={linkClass(isActive(NAV_LINKS.contact.href))}>
              {NAV_LINKS.contact.label}
              {isActive(NAV_LINKS.contact.href) && <ActiveBar />}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={NAV_LINKS.quote.href}
              className="hidden rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:bg-brand-700 hover:shadow-none sm:inline-flex"
            >
              {NAV_LINKS.quote.label}
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:border-white/40 lg:hidden"
            >
              <Menu aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              data-theme="light"
              className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white text-slate-900 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <Logo variant="light" className="w-40" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:border-brand hover:text-brand-700"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                <MobileLink href={NAV_LINKS.home.href} active={isActive('/')}>
                  {NAV_LINKS.home.label}
                </MobileLink>

                <p className="mt-4 px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Services
                </p>
                {SERVICES.map((s) => (
                  <MobileLink key={s.href} href={s.href} active={isActive(s.href)}>
                    <s.icon aria-hidden className="h-[18px] w-[18px] text-brand-700" />
                    {s.title}
                  </MobileLink>
                ))}

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <MobileLink href={NAV_LINKS.about.href} active={isActive(NAV_LINKS.about.href)}>
                    {NAV_LINKS.about.label}
                  </MobileLink>
                  <MobileLink href={NAV_LINKS.contact.href} active={isActive(NAV_LINKS.contact.href)}>
                    {NAV_LINKS.contact.label}
                  </MobileLink>
                </div>
              </nav>

              <div className="space-y-3 border-t border-slate-200 bg-surface px-5 py-5">
                <Link
                  href={NAV_LINKS.quote.href}
                  className="flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-700"
                >
                  {NAV_LINKS.quote.label}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <div className="flex flex-col gap-2 text-sm text-slate-600">
                  <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 hover:text-brand-700">
                    <Phone aria-hidden className="h-4 w-4 text-brand-700" /> {COMPANY.phone}
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 hover:text-brand-700">
                    <Mail aria-hidden className="h-4 w-4 text-brand-700" /> {COMPANY.email}
                  </a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ActiveBar() {
  return (
    <motion.span
      layoutId="nav-active-bar"
      aria-hidden
      className="absolute inset-x-3 -bottom-[13px] h-[2px] rounded-full bg-brand"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    />
  );
}

function MobileLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-semibold transition-colors',
        active ? 'bg-brand-50 text-brand-700' : 'text-slate-800 hover:bg-slate-100',
      )}
    >
      {children}
    </Link>
  );
}
