/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rayn.ie",
      },
    ],
  },
}

module.exports = nextConfig
