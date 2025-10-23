/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only lint Next.js app, ignore the Vite frontend
    dirs: ['pages', 'components', 'lib'],
  },
  typescript: {
    // Ignore build errors from non-Next code in the repo
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;


