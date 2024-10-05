/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // Set to true if this is a permanent redirect
      },
      {
        source: '/vote',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/group',
        destination: '/join',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
