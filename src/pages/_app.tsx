import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import Navbar from '@/components/NavBar';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

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
