/**
 * Placeholder photography – enterprise infrastructure only
 * (data centers, server racks, networking). Swap any of these for your own
 * compressed images in /public/images when real photography is available.
 *
 * NOTE: photo IDs are Unsplash placeholders. If one ever 404s, replace the ID
 * with any other server-room / data-center photo from unsplash.com.
 */
const unsplash = (id: string, width = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export const IMAGES = {
  /** Hero – server racks with cold-aisle lighting */
  hero: unsplash('1558494949-ef010cbdcc31'),
  /** NOC spotlight – data center hall */
  noc: unsplash('1597852074816-d933c7d2b988'),
  /** Rentals – structured network cabling / switching */
  rentals: unsplash('1631624215749-b10b3dd7bca2', 1400),
  /** Spare parts callout – hardware board close-up */
  parts: unsplash('1518770660439-4636190af475', 1400),
  /** Data center – rack corridor (used on later pages) */
  racks: unsplash('1544197150-b99a580bb7a8'),
  /** Global network (used on later pages) */
  network: unsplash('1451187580459-43490279c0fa'),
} as const;

export const BRAND_IMAGES = {
  /** Full logo for LIGHT backgrounds */
  logoLight: '/images/logo.png',
  /** Full logo for DARK backgrounds */
  logoDark: '/images/black_bg_logo.png',
  /** Square app icon / favicon */
  icon: '/images/CT-icon.png',
} as const;
