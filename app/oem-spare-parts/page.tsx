import { pageMetadata } from '@/lib/seo';
import OemSparePartsClient from '@/components/pages/OemSparePartsClient';

export const metadata = pageMetadata({
  title: 'OEM Server, Storage and Network Spare Parts | Convergence Technology',
  description:
    'Sourcing of OEM and suitable compatible spare parts for server, storage, networking and data center platforms, with help identifying models, part numbers and compatibility.',
  path: '/oem-spare-parts',
});

export default function OemSparePartsPage() {
  return <OemSparePartsClient />;
}
