/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Ensure ESLint runs during builds
  eslint: {
    // Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  
  // Ensure TypeScript errors fail the build
  typescript: {
    // Ignore TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Images configuration
  images: {
    unoptimized: true,
  },
}

export default nextConfig
