import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_STORAGE_HOST!,
        port: process.env.NEXT_STORAGE_PORT!,
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_STORAGE_HOST!,
        port: process.env.NEXT_STORAGE_PORT!,
        pathname: "/storage/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
