/** @type {import('next').NextConfig} */
const nextConfig = { basePath: "", trailingSlash: true,
  output: "export", 
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig;