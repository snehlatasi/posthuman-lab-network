import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["parcel-apache-eclair.ngrok-free.dev", "*.ngrok-free.dev"],
  devIndicators: false,
};

export default nextConfig;
