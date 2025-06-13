import React from 'react';
import { StoreType } from '@/domain/StoreType';
import TypeChip from '@/components/types/TypeChip';

interface TypeListProps {
  types?: StoreType[];
  isLoading: boolean;
}

export default function TypeList({ types, isLoading }: TypeListProps) {
  if (isLoading) {
    return <div>Loading types...</div>;
  }

  const internalTypes = types ?? [];

  if (internalTypes.length === 0) {
    return (
      <div>
        <h3 className="mb-4 text-xl font-semibold text-black">Store Types</h3>
        <p>No types available.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-black">Store Types</h3>
      <div className="flex flex-wrap gap-2">
        {internalTypes.map(type => (
          <TypeChip key={type.id} name={type.name}></TypeChip>
        ))}
      </div>
    </div>
  );
}
