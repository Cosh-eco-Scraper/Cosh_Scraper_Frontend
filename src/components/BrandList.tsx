import React, { useState } from 'react';
import { Brand } from '@/domain/Brand';
import ErrorMessage from './ErrorMessage';
import BrandChip from './BrandChip';

interface BrandListProps {
  isLoading: boolean;
  error: Error | null;
  brands: Brand[];            // selected server brands passed from parent
  isError: boolean;
  customBrands?: string[];    // custom brand names
  onCustomBrandsChange?: (newList: string[]) => void;  // update custom brands
  onRemoveBrand?: (brandId: number) => void;         // remove any server brand
  readOnly?: boolean;
}

export default function BrandList({
  isLoading,
  error,
  brands,
  isError,
  customBrands = [],
  onCustomBrandsChange,
  onRemoveBrand,
  readOnly = false,
}: BrandListProps) {
  const [name, setName] = useState('');

  const addBrand = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const next = [...customBrands, trimmed];
    onCustomBrandsChange?.(next);
    setName('');
  };

  const handleRemove = (chipIndex: number) => {
    // Calculate the boundary between server brands and custom brands
    const serverBrandsCount = brands.length;
    
    if (chipIndex < serverBrandsCount) {
      // Removing a server brand
      const brandToRemove = brands[chipIndex];
      onRemoveBrand?.(brandToRemove.id);
    } else {
      // Removing a custom brand
      const customBrandIndex = chipIndex - serverBrandsCount;
      const updatedCustomBrands = customBrands.filter((_, index) => index !== customBrandIndex);
      onCustomBrandsChange?.(updatedCustomBrands);
  }
};

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;

  const allBrandNames = [
    ...brands.map(b => b.name),
    ...customBrands,
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>

      {!readOnly && (
        <div className="mb-4 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Brand name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="rounded border px-2 py-1 text-sm text-black"
          />
          <button
            onClick={addBrand}
            className="bg-[#583AFF] text-white px-3 py-1.5 rounded"
          >
            Add
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {allBrandNames.length === 0 ? (
          <p className="text-sm text-gray-500">No brands added yet.</p>
        ) : (
          allBrandNames.map((n, idx) => (
            <BrandChip
              key={idx}
              name={n}
              label=""
              onRemove={() => handleRemove(idx)}
              readOnly={readOnly}
            />
          ))
        )}
      </div>
    </div>
  );
}
