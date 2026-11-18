import type { Metadata } from 'next';
import { BRAND_IMAGES } from '@/lib/images';
import { COMPANY, SITE_URL } from '@/lib/site';

/**
 * Per-page metadata. Titles are used verbatim (title.absolute) so the layout
 * never appends a suffix. Canonicals are absolute URLs ending with "/" to
 * match `trailingSlash: true`.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { title, description, path } = opts;
  const canonical =
    path === '/'
      ? `${SITE_URL}/`
      : `${SITE_URL}${path.replace(/\/$/, '')}/`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: COMPANY.name,
      locale: 'en_LK',
      title,
      description,
      url: canonical,
      images: [{ url: BRAND_IMAGES.logoLight, width: 1672, height: 941, alt: COMPANY.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [BRAND_IMAGES.logoLight],
    },
  };
}
