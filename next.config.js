/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.codepen.io',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.co',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.com',
      },
    ],
  },
}

module.exports = nextConfig
