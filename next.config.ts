import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: 'export'` — prediction runs in a server route (src/app/api/predict),
  // so the model + datasets stay server-side. Content pages still statically prerender.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
