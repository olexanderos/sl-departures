/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/departures',
        destination: 'https://transport.integration.sl.se/v1/sites/9104/departures',
      },
    ]
  },
}

module.exports = nextConfig 