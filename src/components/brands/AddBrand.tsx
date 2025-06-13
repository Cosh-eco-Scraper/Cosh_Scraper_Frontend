import useBrands from '@/hooks/brands/useBrands';
import { useState } from 'react';
import { type Brand } from '@/domain/Brand';

interface AddBrandProps {
  onClick: (brand: Brand) => void;
  selectedBrands: Brand[];
}

export default function AddBrand({ onClick, selectedBrands }: AddBrandProps) {
  const { isLoadingBrands, brands } = useBrands();
  const [searchInput, setSearchInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddNewBrand = () => {
    const newBrand: Brand = {
      id: Math.floor(Math.random() * -1000000),
      name: searchInput,
    };
    onClick(newBrand);
    setSearchInput('');
  };

  return (
    <div className="relative pb-4">
      <div className="flex w-full">
        <input
          type="text"
          className="w-full rounded-l-md border p-2 pr-10"
          placeholder="Search Brands and add them"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        <button
          onClick={handleAddNewBrand}
          className="rounded-r-md border border-l-0 bg-blue-500 px-4 text-white hover:bg-blue-600"
          disabled={!searchInput}
        >
          Add
        </button>
      </div>
      {isLoadingBrands ? (
        <div className="absolute top-3 right-3">Loading...</div>
      ) : (
        isOpen && (
          <div className="absolute left-0 mt-1 max-h-[250px] w-full overflow-y-auto rounded-md border bg-white shadow-lg">
            {brands
              ?.filter(brand => !selectedBrands.some(sb => sb.id === brand.id))
              .filter(
                brand =>
                  brand.name.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === ''
              )
              .map(brand => (
                <div
                  key={brand.id}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => onClick(brand)}
                >
                  {brand.name}
                </div>
              ))}
          </div>
        )
      )}
    </div>
  );
}
