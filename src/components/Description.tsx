import React, { useState } from 'react';
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

  const [storeName, setStoreName] = useState(store.name);
  const [description, setDescription] = useState(store.description ?? '');


  return (
    <div>
      <input
        type="text"
        placeholder="Store Name"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        className="mb-6 placeholder-gray-600 w-full text-3xl font-bold text-black md:text-4xl border border-gray-300 rounded p-2"
      />

      <h2 className="mb-4 text-xl font-semibold text-black">Description</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded border px-3 py-2 text-sm text-black placeholder-gray-400 shadow"
        placeholder="Enter store description"
      />

    </div>
  );
}
