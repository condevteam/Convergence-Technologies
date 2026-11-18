import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Required for `output: 'export'`
export const dynamic = 'force-static';

const ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/noc-operations', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/it-consultancy', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/data-center-solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/it-hardware-rentals', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/oem-spare-parts', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about-us', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === '/' ? '/' : `${path}/`}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
