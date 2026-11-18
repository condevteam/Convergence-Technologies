/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes deployable HTML/CSS/JS to ./out
  output: 'export',
  // /contact/ -> out/contact/index.html (works on any static host / CDN / nginx)
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Required for static export (no image optimisation server)
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
