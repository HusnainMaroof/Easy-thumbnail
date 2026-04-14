import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
