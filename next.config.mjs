/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true
  },
  transpilePackages: ["@radix-ui/react-slot"]
}

export default nextConfig;