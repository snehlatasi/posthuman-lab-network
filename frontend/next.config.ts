import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_INTERNAL_URL || process.env.API_INTERNAL_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["parcel-apache-eclair.ngrok-free.dev", "*.ngrok-free.dev"],
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/labs",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/labs/:path*",
        destination: "/research/:path*",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/support/contact",
        permanent: true,
      },
      {
        source: "/contact/general",
        destination: "/support/contact",
        permanent: true,
      },
      {
        source: "/contact/:path*",
        destination: "/support/:path*",
        permanent: true,
      },
    ];
  },
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
