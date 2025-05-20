import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
        ignoreDuringBuilds: true,
    },
};

// Le decimos al plugin dónde está tu default export de getRequestConfig
export default createNextIntlPlugin('./src/i18n/config.ts')(nextConfig)
