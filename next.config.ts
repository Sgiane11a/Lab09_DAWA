import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones para producción
  output: 'standalone',
  
  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/**',
      },
    ],
  },
  
  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_OMDB_API_KEY: process.env.NEXT_PUBLIC_OMDB_API_KEY,
  },
};

export default nextConfig;
