import React from 'react';
import { Store } from '@/domain/Store';
import ErrorMessage from './ErrorMessage';

interface DescriptionProps {
  isLoading: boolean;
  error: Error | null;
  store?: Store;
  isError: boolean;
}

export default function Description({ isLoading, error, store, isError }: DescriptionProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!store) return <p>No store found</p>;

  return (
    <>
      <div>
        <h1 className="mb-6 text-3xl font-bold text-black md:text-4xl">{store.name}</h1>
        <h2 className="mb-4 text-xl font-semibold text-black">Description</h2>
        <ul className="space-y-2 text-black">
          <p>{store.description}</p>
        </ul>
      </div>
    </>
  );
}
