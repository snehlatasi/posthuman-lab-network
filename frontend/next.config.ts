import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_INTERNAL_URL || process.env.API_INTERNAL_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["parcel-apache-eclair.ngrok-free.dev", "*.ngrok-free.dev"],
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
