import type { NextConfig } from 'next';

const isPagesExport = process.env.GITHUB_PAGES === 'true';

const basePath = isPagesExport ? '/wc-con-platform' : '';

const nextConfig: NextConfig = {
  output: isPagesExport ? 'export' : undefined,
  basePath,
  transpilePackages: ['@wccon/ui', '@wccon/database'],
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    remotePatterns: [
      { protocol: 'https', hostname: 'wc-con.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

export default nextConfig;
