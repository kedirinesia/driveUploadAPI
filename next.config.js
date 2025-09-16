/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false, // Using pages directory
  },
  api: {
    bodyParser: false, // Disable body parser for file uploads
  },
  // Ensure API routes work properly
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
