// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Dit 'env' object maakt omgevingsvariabelen beschikbaar
  // voor de client-side van je Next.js applicatie.
  // Variabelen moeten beginnen met 'NEXT_PUBLIC_' om in de browser beschikbaar te zijn.
  env: {
    // Hier wordt de waarde van de omgevingsvariabele die je in Render instelt, opgehaald.
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
};

// Deze console.log wordt uitgevoerd TIJDENS DE BUILD op de Render server.
// Controleer de BUILD LOGS van je Next.js service op Render om te zien welke waarde hier wordt opgepikt.
// Als je 'undefined' ziet, is de variabele niet correct ingesteld in Render of niet zichtbaar tijdens de build.
console.log(
  'NEXT_PUBLIC_BACKEND_URL in next.config.js (BUILD LOG):',
  process.env.NEXT_PUBLIC_BACKEND_URL
);

export default nextConfig;
