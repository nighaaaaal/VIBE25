/** @type {import('next').NextConfig} */
const nextConfig = {
// Enable strict mode for better development experience
reactStrictMode: true,

// Enable SWC minification for better performance
swcMinify: true,

// Ensure ESLint runs during builds
eslint: {
  // Don't ignore ESLint errors during builds
  ignoreDuringBuilds: false,
},

// Ensure TypeScript errors fail the build
typescript: {
  // Don't ignore TypeScript errors during builds
  ignoreBuildErrors: false,
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
  domains: ["lh3.googleusercontent.com"],
},
}

export default nextConfig
