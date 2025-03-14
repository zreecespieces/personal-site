/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/instant-perler-pattern/:path*',
          destination: 'https://perler-pattern-generator.vercel.app/:path*',
        },
      ];
    },
  };
  
  module.exports = nextConfig;