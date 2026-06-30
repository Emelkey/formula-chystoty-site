import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/uk",
        destination: "/",
        permanent: false
      },
      {
        source: "/services",
        destination: "/poslugy",
        permanent: false
      },
      {
        source: "/prices",
        destination: "/tsiny",
        permanent: false
      },
      {
        source: "/works",
        destination: "/nashi-roboty",
        permanent: false
      },
      {
        source: "/reviews",
        destination: "/vidguky",
        permanent: false
      },
      {
        source: "/about",
        destination: "/pro-nas",
        permanent: false
      },
      {
        source: "/contacts",
        destination: "/kontakty",
        permanent: false
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  }
};

export default nextConfig;
