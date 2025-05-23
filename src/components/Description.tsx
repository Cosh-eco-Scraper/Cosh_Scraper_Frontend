import { Store } from '@/domain/Store';
import ErrorMessage from './ErrorMessage';
import { useState } from 'react';

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

   const [name, setName] = useState(() => store?.name);
  const [description, setDescription] = useState(() => store?.description);;

  return (
    <div>
      <input
        type="text"
        placeholder="Store Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-6 w-full rounded border border-gray-300 p-2 text-3xl font-bold text-black placeholder-gray-600 md:text-4xl"
      />

      <h2 className="mb-4 text-xl font-semibold text-black">Description</h2>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="mb-1.5 h-36 w-full resize-none rounded border px-3 py-2 text-sm text-black placeholder-gray-400 shadow"
        placeholder="Enter store description"
      />
    </div>
  );
}
