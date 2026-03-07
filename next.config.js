/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/who-we-are",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/what-we-do",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
