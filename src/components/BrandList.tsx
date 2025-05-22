import React, { useState } from 'react';
import { Brand } from '@/domain/Brand';
import ErrorMessage from './ErrorMessage';
import BrandChip from './BrandChip';

interface BrandListProps {
  isLoading: boolean;
  error: Error | null;
  brands?: Brand[];
  isError: boolean;
}

export default function BrandList({ isLoading, error, brands, isError }: BrandListProps) {
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [modified, setModified] = useState(false); // Track if local state is modified

  const currentBrands = modified ? brandList : (brands ?? []);

  const handleAddBrand = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !currentBrands.some(b => b.name.toLowerCase() === trimmed.toLowerCase())) {
      const newBrand: Brand = {
        id: 0,
        name: trimmed,
        label: trimmed,
        storeId: 1, // Replace as needed
      };
      setBrandList([...currentBrands, newBrand]);
      setInputValue('');
      setModified(true);
    }
  };

  const handleRemoveBrand = (id: string | number) => {
    setBrandList(currentBrands.filter(b => b.id !== id));
    setModified(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!brands || brands.length === 0) return <p className="text-gray-600">No brands found.</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddBrand()}
          placeholder="Add a brand"
          className="rounded border px-3 py-1 text-sm text-black shadow placeholder:text-gray-500"
        />
        <button
          onClick={handleAddBrand}
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {currentBrands.map(item => (
          <BrandChip key={item.id} name={item.name} onRemove={() => handleRemoveBrand(item.id)} />
        ))}
      </div>
    </div>
  );
}
