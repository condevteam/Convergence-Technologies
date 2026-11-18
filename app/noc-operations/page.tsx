import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import { CheckGrid } from '@/components/ui/Lists';
import SectionHeading from '@/components/ui/SectionHeading';
import { IMAGES } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import { SERVICES, contactHref } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'NOC Operations and IT Infrastructure Monitoring | Convergence Technology',
  description:
    'NOC design, monitoring platform setup, alert handling, incident coordination and operational reporting for servers, network devices, firewalls and wireless infrastructure.',
  path: '/noc-operations',
});

const CAPABILITIES = [
  'Infrastructure monitoring for servers, network devices, firewalls, wireless infrastructure, and selected services.',
  'Availability, performance, resource utilisation, and threshold monitoring.',
  'Alert triage, prioritisation, incident logging, and escalation coordination.',
  'Operational dashboards and periodic service or performance reports.',
  'Event and trend analysis to help identify recurring issues and capacity risks.',
  'Monitoring design, onboarding, alert tuning, and runbook development.',
  'Coordination with customer IT teams, service providers, and designated support contacts.',
];

const MODELS = [
  'NOC design and implementation consultancy.',
  'Monitoring platform setup and optimisation.',
  'Remote operational support under an agreed scope.',
  'Defined-hours or extended-hours coverage, subject to agreed staffing and service levels.',
  'Periodic reviews and continuous improvement recommendations.',
];

export default function NocOperationsPage() {
  const service = SERVICES[0];
  const href = contactHref(service.value);

  return (
    <>
      <PageHero
        crumb="NOC Operations"
        eyebrow="NOC Operations"
        title="NOC Operations That Help You Stay Ahead."
        description="A clear view of infrastructure health helps teams identify issues earlier, coordinate response, and make better operational decisions. Convergence Technology can help design or support monitoring and NOC workflows aligned with your infrastructure, service priorities, and escalation requirements."
        image={IMAGES.noc}
        cta={{ label: service.cta, href }}
      />

      <section className="section-y bg-white">
        <div className="container">
          <SectionHeading eyebrow="What we deliver" title="Service capabilities" />
          <div className="mt-12">
            <CheckGrid items={CAPABILITIES} />
          </div>
        </div>
      </section>

      <section data-theme="dark" className="section-y relative overflow-hidden bg-slate-dark text-white">
        <div aria-hidden className="absolute inset-0 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div className="container relative">
          <SectionHeading tone="dark" eyebrow="How we engage" title="Service models" />
          <div className="mt-12">
            <CheckGrid items={MODELS} tone="dark" />
          </div>
        </div>
      </section>

      <CtaBand label={service.cta} href={href} />
    </>
  );
}
