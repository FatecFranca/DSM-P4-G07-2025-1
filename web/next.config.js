/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dsm-p4-g07-2025-7.onrender.com/:path*'
      },
      {
        source: '/api-estatistica/:path*',
        destination: 'https://api-petdex-estatistica.onrender.com/:path*'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' }
        ]
      },
      {
        source: '/api-estatistica/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' }
        ]
      }
    ]
  }
}

module.exports = nextConfig