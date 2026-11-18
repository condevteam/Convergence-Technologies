'use client';

import { Building2, Cable, HardDrive, Network, Server } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import { CheckGrid, IconCards } from '@/components/ui/Lists';
import SectionHeading from '@/components/ui/SectionHeading';
import { IMAGES } from '@/lib/images';
import { SERVICES, contactHref } from '@/lib/site';
import { splitLead } from '@/lib/utils';

const CATEGORIES = [
  { text: 'Server components: power supplies, fans, memory, processors, storage drives, risers, and selected system boards.', icon: Server },
  { text: 'Storage components: drives, controllers, power supplies, fans, and supported expansion components.', icon: HardDrive },
  { text: 'Networking components: power supplies, fans, transceivers, and selected modular components.', icon: Network },
  { text: 'Data center components: supported rack-server and infrastructure replacement parts.', icon: Building2 },
  { text: 'Optics and connectivity: compatible transceivers and accessories where specifications can be verified.', icon: Cable },
].map(({ text, icon }) => {
  const { lead, rest } = splitLead(text);
  return { title: lead, text: rest, icon };
});

const ENQUIRY_INCLUDES = [
  'Manufacturer and product family.',
  'Exact model and serial number where appropriate.',
  'Part number or FRU number, if available.',
  'Quantity required and delivery location.',
  'Required condition (new, refurbished, or other), where acceptable.',
];

export default function OemSparePartsClient() {
  const service = SERVICES[4];
  const href = contactHref(service.value);

  return (
    <>
      <PageHero
        crumb="OEM Spare Parts"
        eyebrow="OEM Spare Parts"
        title="The Right Spare Parts for Critical Infrastructure."
        description="When enterprise equipment fails or requires maintenance, identifying the correct component is essential. Convergence Technology assists with sourcing OEM and suitable compatible spare parts for supported server, storage, networking, and data center platforms."
        image={IMAGES.parts}
        cta={{ label: service.cta, href }}
      />

      <section className="section-y bg-white">
        <div className="container">
          <SectionHeading eyebrow="What we source" title="Parts categories" />
          <div className="mt-12">
            <IconCards items={CATEGORIES} cols={3} />
          </div>
        </div>
      </section>

      <section data-theme="dark" className="section-y relative overflow-hidden bg-slate-dark text-white">
        <div aria-hidden className="absolute inset-0 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div className="container relative">
          <SectionHeading tone="dark" eyebrow="Before you send" title="What to include in a parts enquiry" />
          <div className="mt-12">
            <CheckGrid items={ENQUIRY_INCLUDES} tone="dark" />
          </div>
          <p className="mt-8 max-w-3xl border-l-4 border-brand pl-5 text-[15px] leading-relaxed text-slate-300">
            Parts availability, OEM status, condition, warranty, lead time, and compatibility must be
            confirmed in the quotation.
          </p>
        </div>
      </section>

      <CtaBand label={service.cta} href={href} />
    </>
  );
}
