import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@wccon/ui', '@wccon/database'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'wc-con.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

export default nextConfig;
