import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      }
    ]
  }
};

export default nextConfig;
