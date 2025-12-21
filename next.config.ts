import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/meeting",
        permanent: false, // Changed from true to false
      },
    ];
  },
};

export default nextConfig;
