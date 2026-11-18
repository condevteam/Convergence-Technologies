import { pageMetadata } from '@/lib/seo';
import DataCenterClient from '@/components/pages/DataCenterClient';

export const metadata = pageMetadata({
  title: 'Data Center, Server, Storage and HCI Solutions | Convergence Technology',
  description:
    'Data center planning and support across compute, storage, virtualization and HCI, networking, security, backup and disaster recovery, rack planning and lifecycle support.',
  path: '/data-center-solutions',
});

export default function DataCenterSolutionsPage() {
  return <DataCenterClient />;
}
