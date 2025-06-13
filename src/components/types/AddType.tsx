import useTypes from '@/hooks/type/useTypes';
import { useState } from 'react';
import { type Type } from '@/domain/StoreType';

interface AddTypeProps {
  onClick: (type: Type) => void;
  selectedTypes: Type[];
}

export default function AddType({ onClick, selectedTypes }: AddTypeProps) {
  const { isLoadingTypes, types } = useTypes();
  const [searchInput, setSearchInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative pb-4">
      <input
        type="text"
        className="w-full rounded-md border p-2 pr-10"
        placeholder="Search Types and add them"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      {isLoadingTypes ? (
        <div className="absolute top-3 right-3">Loading...</div>
      ) : (
        isOpen && (
          <div className="absolute left-0 mt-1 max-h-[250px] w-full overflow-y-auto rounded-md border bg-white shadow-lg">
            {types
              ?.filter(type => !selectedTypes.some(st => st.id === type.id))
              .filter(
                type =>
                  type.name.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === ''
              )
              .map(type => (
                <div
                  key={type.id}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => onClick(type)}
                >
                  {type.name}
                </div>
              ))}
          </div>
        )
      )}
    </div>
  );
}
