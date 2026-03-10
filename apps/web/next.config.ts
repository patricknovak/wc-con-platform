import type { NextConfig } from 'next';

const isPagesExport = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: isPagesExport ? 'export' : undefined,
  basePath: isPagesExport ? '/wc-con-platform' : '',
  transpilePackages: ['@wccon/ui', '@wccon/database'],
  images: {
    unoptimized: isPagesExport,
    remotePatterns: [
      { protocol: 'https', hostname: 'wc-con.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

export default nextConfig;
