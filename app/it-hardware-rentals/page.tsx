import { pageMetadata } from '@/lib/seo';
import HardwareRentalsClient from '@/components/pages/HardwareRentalsClient';

export const metadata = pageMetadata({
  title: 'IT Hardware Rentals in Sri Lanka | Servers, Switches, Firewalls & PABX',
  description:
    'Rent enterprise servers, network switches, firewalls, wireless access points and PABX systems for projects, migrations, proof-of-concept work and business continuity.',
  path: '/it-hardware-rentals',
});

export default function ItHardwareRentalsPage() {
  return <HardwareRentalsClient />;
}
