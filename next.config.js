/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
   async rewrites() {
      return [
         {
            source: "/api/hiring/:path*",
            destination: "https://goldblv.com/api/hiring/:path*",
         },
      ];
   },
};
