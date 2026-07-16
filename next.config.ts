import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/home-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/new-application-form',
        destination: '/application-form',
        permanent: true,
      },
      {
        source: '/application-form-2',
        destination: '/application-form',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
