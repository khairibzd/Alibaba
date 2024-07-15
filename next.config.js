/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "lh3.googleusercontent.com",
      "images.pexels.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "https://www.pexels.com/",
      },
    ],
  },
};

module.exports = nextConfig;
