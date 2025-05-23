import '@/styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Navbar from '@/components/NavBar';
import { queryClient } from '@/config/queryClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <div className="flex h-screen flex-col">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </main>
    </QueryClientProvider>
  );
}
