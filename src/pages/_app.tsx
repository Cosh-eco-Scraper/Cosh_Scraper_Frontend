import '@/styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Navbar from '@/components/NavBar';
import { queryClient } from '@/config/queryClient';
import { Inter, Source_Serif_4 } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500'], // Light (300), Normal (400), Medium (500)
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerifPro = Source_Serif_4({
  weight: ['300', '400', '600'], // Light (300), Normal (400), Semi Bold (600)
  style: ['italic'], // Specifically italic for Source Serif Pro
  subsets: ['latin'],
  variable: '--font-source-serif-pro',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${inter.variable} ${sourceSerifPro.variable}`}>
        <div className="flex h-screen flex-col">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </main>
    </QueryClientProvider>
  );
}
