import React from 'react';
import { StoreType } from '@/domain/StoreType';

interface TypeListProps {
  types?: StoreType[];
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
}

const TypeList: React.FC<TypeListProps> = ({ types, isLoading, isError, error }) => {
  if (isLoading) return <div>Loading types...</div>;
  if (isError)
    return (
      <div className="text-red-500">Error loading types: {error?.message || 'Unknown error'}</div>
    );
  if (!types || types.length === 0) return <div className="text-gray-500">No types found.</div>;

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-black">Store Types</h3>
      <div className="flex flex-wrap gap-2">
        {types.map(type => (
          <span
            key={type.id}
            className="flex items-center gap-1 rounded-full bg-[#583AFF] px-3 py-1.5 text-sm text-white shadow"
          >
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypeList;
