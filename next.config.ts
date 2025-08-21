import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [new URL("https://cdn.dummyjson.com/**").hostname],
  },
};

export default nextConfig;
