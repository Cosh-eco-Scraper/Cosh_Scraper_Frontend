import React from 'react';
import { StoreType, Type } from '@/domain/StoreType';
import AddType from '@/components/types/AddType';
import EditTypeChip from '@/components/types/EditTypeChip';

interface TypeListProps {
  types?: StoreType[];
  isLoading: boolean;
  addType: (type: Type) => void;
  removeType: (id: number) => void;
}

export default function EditTypeList({ types, isLoading, addType, removeType }: TypeListProps) {
  if (isLoading) {
    return <div>Loading types...</div>;
  }

  const internalTypes = types ?? [];

  if (internalTypes.length === 0) {
    return (
      <div>
        <h3 className="mb-4 text-xl font-semibold text-black">Store Types</h3>
        <AddType onClick={addType} selectedTypes={types as Type[]} />;
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-black">Store Types</h3>

      <AddType onClick={addType} selectedTypes={types as Type[]} />
      <div className="flex flex-wrap gap-2">
        {types &&
          types.map(type => (
            <EditTypeChip
              key={type.id}
              id={type.id}
              name={type.name}
              onRemove={removeType}
            ></EditTypeChip>
          ))}
      </div>
    </div>
  );
}
