import React, { useState } from 'react';
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
  const [location, setLocation] = useState({
    street: store?.street,
    number: store?.number,
    postalCode: store?.postalCode,
    city: store?.city,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!store) return <p>No store found</p>;


  const handleChange = (field: keyof typeof location, value: string) => {
    setLocation(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Location</h2>
      <div className="grid grid-cols-1 gap-4 text-black md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Street</label>
          <input
            type="text"
            value={store.street}
            onChange={e => handleChange('street', e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Number</label>
          <input
            type="text"
            value={store.number}
            onChange={e => handleChange('number', e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Postal Code</label>
          <input
            type="text"
            value={store.postalCode}
            onChange={e => handleChange('postalCode', e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">City</label>
          <input
            type="text"
            value={store.city}
            onChange={e => handleChange('city', e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
