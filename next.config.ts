import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "sujeitoprogramador.com",
      } //tive que criar como metodo de segurança, pois o Next.js não aceita imagens de outros sites por padrão

    ]
  }
};

export default nextConfig;
