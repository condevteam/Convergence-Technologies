import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Convergence Technology | NOC, Data Center & IT Infrastructure Solutions',
  description:
    'NOC operations, IT infrastructure consultancy, data center solutions, enterprise hardware rentals and OEM spare parts sourcing for organisations in Sri Lanka.',
  path: '/',
});

export default function HomePage() {
  return <HomePageClient />;
}
