import React from 'react';
import {StoreType} from '@/domain/StoreType';

interface TypeListProps {
  types?: StoreType[];
    isLoading: boolean;
}

export default function EditTypeList({types, isLoading}: TypeListProps) {
  if (isLoading) return <div>Loading types...</div>;

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
