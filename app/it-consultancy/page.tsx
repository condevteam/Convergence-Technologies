import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import { CheckGrid } from '@/components/ui/Lists';
import SectionHeading from '@/components/ui/SectionHeading';
import { IMAGES } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import { SERVICES, contactHref } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'IT Infrastructure Consultancy in Sri Lanka | Convergence Technology',
  description:
    'Infrastructure assessments, network and data center architecture, security reviews, capacity planning and migration planning grounded in operational requirements and total cost of ownership.',
  path: '/it-consultancy',
});

const SERVICES_LIST = [
  'IT infrastructure assessment and health checks.',
  'Network architecture, segmentation, resilience, and capacity planning.',
  'Firewall and infrastructure security review, aligned with the agreed scope.',
  'Data center and server architecture design.',
  'Virtualisation and hyper-converged infrastructure (HCI) planning.',
  'Backup, recovery, and business continuity planning.',
  'Technology refresh, migration, and upgrade planning.',
  'Bill of materials (BOM) preparation and technical specification review.',
  'Vendor, model, and compatibility evaluation.',
];

export default function ItConsultancyPage() {
  const service = SERVICES[1];
  const href = contactHref(service.value);

  return (
    <>
      <PageHero
        crumb="IT Consultancy"
        eyebrow="IT Consultancy"
        title="Independent Technical Thinking. Practical Infrastructure Outcomes."
        description="We help organisations assess their current environment, plan the right architecture, reduce avoidable complexity, and make technology investments with greater clarity. Our consultancy is grounded in operational requirements, technical compatibility, security, scalability, and total cost of ownership."
        image={IMAGES.network}
        cta={{ label: service.cta, href }}
      />

      <section className="section-y bg-white">
        <div className="container">
          <SectionHeading eyebrow="What we deliver" title="Consultancy services" />
          <div className="mt-12">
            <CheckGrid items={SERVICES_LIST} cols={3} />
          </div>
        </div>
      </section>

      <CtaBand label={service.cta} href={href} />
    </>
  );
}
