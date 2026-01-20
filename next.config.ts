import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "admin.nhx.finance" }],
        destination: "/kesy/admin/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nhxstorage.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nhxblob.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
