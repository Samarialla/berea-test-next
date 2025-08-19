import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com", "placehold.co", "cdn.prod.website-files.com","encrypted-tbn0.gstatic.com","placeimg.com"], // agrega todos los dominios de tus imágenes externas
  },
};

export default nextConfig;
