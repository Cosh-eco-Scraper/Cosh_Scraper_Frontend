import React from 'react';
import ErrorMessage from './ErrorMessage';
import { Store } from '@/domain/Store';

interface LocationInformationProps {
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  store?: Store;
}

export default function LocationInformation({
  isLoading,
  error,
  isError,
  store,
}: LocationInformationProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!store) return <p>No store found</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Location</h2>
      <ul className="space-y-2 text-black">
        {store.street} {store.number}, {store.postalCode} {store.city}
      </ul>
    </div>
  );
}
