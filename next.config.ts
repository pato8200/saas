import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove 'output: export' to enable API routes on Vercel
  // This allows server-side API routes to work properly
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
