import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const imagePatterns = new URL("https://cdn.dummyjson.com/**");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: imagePatterns.protocol.slice(
          0,
          -1
        ) as RemotePattern["protocol"],
        hostname: imagePatterns.hostname,
        pathname: imagePatterns.pathname,
      },
    ],
  },
};

export default nextConfig;
