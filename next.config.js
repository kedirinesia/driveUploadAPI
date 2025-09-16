/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false, // Using pages directory
  },
  api: {
    bodyParser: false, // Disable body parser for file uploads
  },
}

module.exports = nextConfig
