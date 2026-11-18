'use client';

import {
  Cpu,
  DatabaseBackup,
  HardDrive,
  Layers,
  Network,
  RefreshCw,
  Rows3,
  ShieldCheck,
} from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import { IconCards } from '@/components/ui/Lists';
import SectionHeading from '@/components/ui/SectionHeading';
import { IMAGES } from '@/lib/images';
import { SERVICES, contactHref } from '@/lib/site';
import { splitLead } from '@/lib/utils';

const AREAS = [
  { text: 'Compute: rack servers, enterprise server platforms, and capacity planning.', icon: Cpu },
  { text: 'Storage: shared storage, direct-attached storage, expansion planning, and performance considerations.', icon: HardDrive },
  { text: 'Virtualisation and HCI: platform sizing, host design, resource planning, and implementation support.', icon: Layers },
  { text: 'Networking: switching, uplinks, redundancy, segmentation, and connectivity design.', icon: Network },
  { text: 'Security: firewall selection, perimeter design, and secure network architecture.', icon: ShieldCheck },
  { text: 'Backup and disaster recovery: recovery objectives, backup design, and restoration planning.', icon: DatabaseBackup },
  { text: 'Rack and infrastructure planning: equipment layout, power and cooling considerations, cabling, and growth allowance.', icon: Rows3 },
  { text: 'Lifecycle support: hardware refresh planning, spares strategy, and maintenance coordination.', icon: RefreshCw },
].map(({ text, icon }) => {
  const { lead, rest } = splitLead(text);
  return { title: lead, text: rest, icon };
});

export default function DataCenterClient() {
  const service = SERVICES[2];
  const href = contactHref(service.value);

  return (
    <>
      <PageHero
        crumb="Data Center Solutions"
        eyebrow="Data Center Solutions"
        title="Build a Data Center That Fits Your Business."
        description="From infrastructure planning to equipment sourcing and implementation coordination, Convergence Technology supports organisations developing, upgrading, or optimising their data center environments."
        image={IMAGES.racks}
        cta={{ label: service.cta, href }}
      />

      <section className="section-y bg-white">
        <div className="container">
          <SectionHeading eyebrow="What we support" title="Solution areas" />
          <div className="mt-12">
            <IconCards items={AREAS} cols={4} />
          </div>
        </div>
      </section>

      <CtaBand label={service.cta} href={href} />
    </>
  );
}
