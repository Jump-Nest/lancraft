/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'vercel.app', 'firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;