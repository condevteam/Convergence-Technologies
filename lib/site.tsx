import {
  Activity,
  Cable,
  Compass,
  Cpu,
  Network,
  Phone,
  Server,
  ShieldCheck,
  Wifi,
  type LucideIcon,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Company                                                                    */
/* -------------------------------------------------------------------------- */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://convergencetech.lk'
).replace(/\/$/, '');

export const COMPANY = {
  name: 'Convergence Technology',
  // TODO (Brief §14): confirm exact legal company name + registration details
  legalName: 'Convergence Technology',
  tagline: 'You Name It. We Have It.',
  supportingLine:
    'Keeping critical IT infrastructure visible, available, and ready to perform.',
  email: 'info@convergencetech.lk',
  phone: '+94 11 206 3155',
  phoneHref: 'tel:+94112063155',
  country: 'Sri Lanka',
} as const;

/* -------------------------------------------------------------------------- */
/*  Services (five pillars)                                                    */
/* -------------------------------------------------------------------------- */

export type Service = {
  /** Value used in `/contact?service=<value>` and the form's select */
  value: string;
  /** Label shown in the Contact form's "Service required" select (Brief §11) */
  formLabel: string;
  title: string;
  href: string;
  icon: LucideIcon;
  /** Homepage card copy (Brief §4) */
  blurb: string;
  /** Page-level CTA label (Brief §5–9) */
  cta: string;
};

export const SERVICES: Service[] = [
  {
    value: 'noc',
    formLabel: 'NOC Operations',
    title: 'NOC Operations',
    href: '/noc-operations',
    icon: Activity,
    blurb:
      'Improve infrastructure visibility with monitoring, alert handling, incident coordination, escalation workflows, and operational reporting tailored to your environment.',
    cta: 'Discuss Your NOC Requirements',
  },
  {
    value: 'consultancy',
    formLabel: 'Consultancy',
    title: 'IT Consultancy',
    href: '/it-consultancy',
    icon: Compass,
    blurb:
      'Make informed technology decisions with infrastructure assessments, solution architecture, capacity planning, security reviews, and implementation guidance.',
    cta: 'Request a Technical Consultation',
  },
  {
    value: 'data-center',
    formLabel: 'Data Center Solutions',
    title: 'Data Center Solutions',
    href: '/data-center-solutions',
    icon: Server,
    blurb:
      'Plan and support resilient infrastructure across compute, storage, virtualization, networking, backup, and disaster recovery.',
    cta: 'Plan Your Data Center Project',
  },
  {
    value: 'rentals',
    formLabel: 'Hardware Rentals',
    title: 'IT Hardware Rentals',
    href: '/it-hardware-rentals',
    icon: Cable,
    blurb:
      'Access enterprise equipment for projects, temporary capacity, refresh cycles, testing, or business continuity—subject to configuration and availability.',
    cta: 'Request Rental Availability',
  },
  {
    value: 'spare-parts',
    formLabel: 'OEM Spare Parts',
    title: 'OEM Spare Parts',
    href: '/oem-spare-parts',
    icon: Cpu,
    blurb:
      'Source the parts needed to maintain enterprise infrastructure, with assistance identifying models, part numbers, and compatibility requirements.',
    cta: 'Send a Spare Parts Enquiry',
  },
];

/** Contact form select options, in the exact order given in Brief §11 */
export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.value, label: s.formLabel })),
  { value: 'other', label: 'Other' },
];

export const serviceByValue = (value: string) =>
  SERVICES.find((s) => s.value === value);

/** Build a pre-selected contact URL, e.g. contactHref('rentals') -> /contact?service=rentals */
export const contactHref = (service?: string) =>
  service ? `/contact?service=${service}` : '/contact';

/* -------------------------------------------------------------------------- */
/*  Rental / infrastructure categories (Brief §8, §9)                          */
/* -------------------------------------------------------------------------- */

export type Category = {
  title: string;
  blurb: string;
  icon: LucideIcon;
  href: string;
};

export const INFRA_CATEGORIES: Category[] = [
  {
    title: 'Network switches',
    blurb:
      'Access, distribution, and selected enterprise switching options based on port count, speed, PoE needs, uplinks, and feature requirements.',
    icon: Network,
    href: contactHref('rentals'),
  },
  {
    title: 'Firewalls',
    blurb:
      'Security appliances sized to the required throughput, interfaces, VPN needs, subscriptions, and security features.',
    icon: ShieldCheck,
    href: contactHref('rentals'),
  },
  {
    title: 'Servers',
    blurb:
      'Rack and enterprise server options based on CPU, memory, storage, network interfaces, and workload.',
    icon: Server,
    href: contactHref('rentals'),
  },
  {
    title: 'Wireless access points',
    blurb:
      'Indoor or other supported wireless options based on coverage, client density, management, and deployment requirements.',
    icon: Wifi,
    href: contactHref('rentals'),
  },
  {
    title: 'PABX / telephony systems',
    blurb:
      'Business telephony and IP-PABX equipment for temporary deployments, project needs, or replacement scenarios.',
    icon: Phone,
    href: contactHref('rentals'),
  },
  {
    title: 'OEM spare parts',
    blurb:
      'Source the parts needed to maintain enterprise infrastructure, with assistance identifying models, part numbers, and compatibility requirements.',
    icon: Cpu,
    href: '/oem-spare-parts',
  },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = {
  home: { label: 'Home', href: '/' },
  about: { label: 'About Us', href: '/about-us' },
  contact: { label: 'Contact', href: '/contact' },
  quote: { label: 'Request a Quote', href: '/contact' },
} as const;

/** Footer "privacy policy" target – the brief has no separate privacy page,
 *  so this points at the privacy notice shown on the enquiry form. */
export const PRIVACY_HREF = '/contact#privacy-notice';

/** Map a `?service=` query value (including a few friendly aliases) to a form option value. */
const SERVICE_ALIASES: Record<string, string> = {
  'noc-operations': 'noc',
  consulting: 'consultancy',
  'it-consultancy': 'consultancy',
  datacenter: 'data-center',
  'data-center-solutions': 'data-center',
  rental: 'rentals',
  'hardware-rentals': 'rentals',
  'it-hardware-rentals': 'rentals',
  parts: 'spare-parts',
  spares: 'spare-parts',
  oem: 'spare-parts',
  'oem-spare-parts': 'spare-parts',
};

export function resolveServiceParam(param: string | null | undefined): string {
  if (!param) return '';
  const key = param.toLowerCase().trim();
  const value = SERVICE_ALIASES[key] ?? key;
  return SERVICE_OPTIONS.some((o) => o.value === value) ? value : '';
}
