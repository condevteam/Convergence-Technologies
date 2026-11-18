import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import { IMAGES } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import { contactHref } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About Us | Enterprise IT Infrastructure Partner | Convergence Technology',
  description:
    'Convergence Technology supports organisations with NOC operations, IT consultancy, data center solutions, hardware rentals and OEM spare parts sourcing.',
  path: '/about-us',
});

const PRINCIPLES = [
  'Understand the requirement before recommending a solution.',
  'Prioritise compatibility, reliability, and lifecycle considerations.',
  'Communicate scope, availability, assumptions, and limitations clearly.',
  'Support practical, scalable decisions rather than unnecessary complexity.',
];

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="About Us"
        title="A Practical Partner for Enterprise IT Infrastructure."
        description="Convergence Technology supports organisations with the expertise, operational coordination, and infrastructure resources needed to keep technology environments dependable and adaptable. Our work spans NOC operations, IT consultancy, data center solutions, IT hardware rentals, and OEM spare parts sourcing."
        image={IMAGES.hero}
        cta={{ label: 'Request a Consultation', href: contactHref() }}
      />

      <section className="section-y bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl border-l-4 border-brand pl-6 sm:pl-10">
            <p className="text-pretty font-display text-xl font-medium leading-relaxed text-slate-900 sm:text-2xl lg:leading-[1.5]">
              We believe technology solutions should be technically sound, commercially practical, and
              aligned with the way each customer operates. Whether the requirement is to improve
              monitoring, plan an infrastructure refresh, source equipment for a project, or identify a
              critical replacement part, we focus on clear communication and fit-for-purpose
              recommendations.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container">
          <SectionHeading eyebrow="How we operate" title="Our working principles" />
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-card"
              >
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-black font-display text-lg font-bold text-brand"
                >
                  0{i + 1}
                </span>
                <p className="self-center text-base font-medium leading-relaxed text-slate-800">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand label="Get a Quote" href={contactHref()} />
    </>
  );
}
