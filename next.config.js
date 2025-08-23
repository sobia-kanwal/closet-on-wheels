// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost', 
      'res.cloudinary.com', 
      'images.unsplash.com',
      'plus.unsplash.com',
      'source.unsplash.com'
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/auth/login',
        destination: '/auth',
        permanent: true,
      },
      {
        source: '/auth/register',
        destination: '/auth',
        permanent: true,
      },
    ]
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
}

module.exports = nextConfig