// next.config.js
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Dit 'env' object maakt omgevingsvariabelen beschikbaar
  // voor de client-side van je Next.js applicatie.
  // Variabelen moeten beginnen met 'NEXT_PUBLIC_' om in de browser beschikbaar te zijn.
  env: {
    // Hier wordt de waarde van de omgevingsvariabele die je in Render instelt, opgehaald.
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL
  },
};


console.log(
  'NEXT_PUBLIC_BACKEND_URL in next.config.js (BUILD LOG):',
  process.env.NEXT_PUBLIC_API_URL
);

console.log(
    'NEXT_PUBLIC_WEBSOCKET_URL in next.config.js (BUILD LOG):',
    process.env.NEXT_PUBLIC_WEBSOCKET_URL
);

export default nextConfig;
