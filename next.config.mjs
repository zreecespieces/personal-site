/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/instant-perler-pattern/:path*',
        destination: 'https://my-vite-project.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;