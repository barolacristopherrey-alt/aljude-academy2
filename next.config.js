/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Do NOT add output: 'export' when deploying to Vercel.
  // That mode is only for fully-static hosts (Netlify drag-drop, GitHub Pages).
  // Vercel runs a Node.js server natively and handles dynamic routes automatically.
}

module.exports = nextConfig
