/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'ingenieria.bogota.unal.edu.co', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
