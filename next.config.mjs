import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.10.173'],
  reactStrictMode: true,
  // .mdx files become routable pages (used by src/app/blog/*/page.mdx).
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' }
    ]
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
