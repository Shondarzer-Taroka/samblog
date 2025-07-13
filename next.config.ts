import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      }

    ]
  }
};

export default nextConfig;






// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**', // OK if you're intentionally allowing all domains
//       },
//     ],
//   },

//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://dailytnnewsbd-chi.vercel.app/api/:path*',
//       },
//     ]
//   },
// }

// export default nextConfig
