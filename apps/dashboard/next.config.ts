import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@wccon/ui', '@wccon/database'],
};

export default nextConfig;
