import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // Environment variables exposed to client
  env: {
    NEXT_PUBLIC_APP_NAME: "PulseWatch",
    NEXT_PUBLIC_APP_VERSION: "1.0.0",
  },
};

export default nextConfig;